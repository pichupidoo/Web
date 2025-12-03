package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log/slog"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

type Config struct {
	Error500Prob    float64
	Error400Prob    float64
	MinResponseTime int
	MaxResponseTime int
}

var config Config

var (
	httpRequestsTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "http_requests_total",
			Help: "Total number of HTTP requests",
		},
		[]string{"status"},
	)

	httpRequestDuration = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "http_request_duration_seconds",
			Help:    "HTTP request duration distribution",
			Buckets: []float64{0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 1},
		},
		[]string{"endpoint"},
	)
)

func loadConfig() {
	config = Config{
		Error500Prob:    0.01,
		Error400Prob:    0.02,
		MinResponseTime: 10,
		MaxResponseTime: 500,
	}

	if v := os.Getenv("ERROR_500_PROB"); v != "" {
		if f, err := strconv.ParseFloat(v, 64); err == nil {
			config.Error500Prob = f
		}
	}
	if v := os.Getenv("ERROR_400_PROB"); v != "" {
		if f, err := strconv.ParseFloat(v, 64); err == nil {
			config.Error400Prob = f
		}
	}
	if v := os.Getenv("MIN_RESPONSE_TIME"); v != "" {
		if i, err := strconv.Atoi(v); err == nil {
			config.MinResponseTime = i
		}
	}
	if v := os.Getenv("MAX_RESPONSE_TIME"); v != "" {
		if i, err := strconv.Atoi(v); err == nil {
			config.MaxResponseTime = i
		}
	}
}

func main() {
	loadConfig()

	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	http.HandleFunc("/api/unstable", unstableHandler)
	http.Handle("/metrics", promhttp.Handler())

	slog.Info("Server starting", "port", 8080)
	http.ListenAndServe(":8080", nil)
}

func unstableHandler(w http.ResponseWriter, r *http.Request) {
	start := time.Now()

	delay := config.MinResponseTime + rand.Intn(config.MaxResponseTime-config.MinResponseTime+1)
	time.Sleep(time.Duration(delay) * time.Millisecond)

	statusCode := 200
	rnd := rand.Float64()
	if rnd < config.Error500Prob {
		statusCode = 500
	} else if rnd < config.Error500Prob+config.Error400Prob {
		statusCode = 400
	}

	duration := time.Since(start)

	slog.Info("request processed",
		"status", statusCode,
		"duration_ms", duration.Milliseconds(),
		"method", r.Method,
		"url", r.URL.Path,
	)

	logEntry := map[string]interface{}{
		"@timestamp":  time.Now().Format(time.RFC3339),
		"status":      statusCode,
		"duration_ms": duration.Milliseconds(),
		"method":      r.Method,
		"url":         r.URL.Path,
		"message":     "request processed",
	}
	sendToElasticsearch(logEntry)

	httpRequestsTotal.WithLabelValues(strconv.Itoa(statusCode)).Inc()
	httpRequestDuration.WithLabelValues("/api/unstable").Observe(duration.Seconds())

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":      statusCode,
		"duration_ms": duration.Milliseconds(),
	})
}

func sendToElasticsearch(logEntry map[string]interface{}) {
	data, _ := json.Marshal(logEntry)
	indexName := "service-logs-" + time.Now().Format("2006.01.02")
	url := "http://localhost:9200/" + indexName + "/_doc"

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		return
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 1 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		slog.Error("Failed to send to Elasticsearch", "error", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		slog.Error("Elasticsearch error", "status", resp.StatusCode, "body", string(body))
	}
}
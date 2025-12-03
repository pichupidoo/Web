FROM golang:1.21-alpine
WORKDIR /app
ENV GOPROXY=direct
ENV GOSUMDB=off
COPY go.mod go.sum ./
RUN go mod download
COPY main.go .
RUN go build -o server main.go
EXPOSE 8080
CMD ["./server"]
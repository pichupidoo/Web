#!/bin/bash
# Генерация нагрузки на сервис
# Запускает 10 запросов в секунду в течение 5 минут

echo "Generating load..."
for i in $(seq 1 3000); do
    curl -s http://localhost:8080/api/unstable > /dev/null &
    sleep 0.1
done
echo "Done"
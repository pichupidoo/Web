#!/bin/bash
set -e

echo "1. Переходим в корень проекта"
cd ~/ASP.NET/ASPNetCoreWebAPI

echo "2. Удаляем старые сборки и кэш"
rm -rf bin obj
cd ASPNetCoreWebAPI.Tests
rm -rf bin obj

echo "3. Очищаем NuGet кэш"
dotnet nuget locals all --clear

echo "4. Восстанавливаем пакеты для тестов"
dotnet restore

echo "5. Проверяем csproj тестового проекта"
echo "==== ASPNetCoreWebAPI.Tests.csproj ===="
cat ASPNetCoreWebAPI.Tests.csproj
echo "======================================"

echo "6. Собираем тестовый проект"
dotnet build

echo "7. Запускаем тесты"
dotnet test

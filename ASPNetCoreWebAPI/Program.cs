using Microsoft.EntityFrameworkCore;
using ASPNetCoreWebAPI.Data;
using ASPNetCoreWebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Разрешаем использование MVC-контроллеров
builder.Services.AddControllers();

// CORS: разрешаем React фронтенду обращаться к API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://127.0.0.1:5173", "http://localhost:5173") // фронтенд
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// База данных
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))); 

// Сервис Валеры
builder.Services.AddScoped<IValeraService, ValeraService>();

var app = builder.Build();

// Swagger в режиме разработки
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Включаем CORS до маршрутизации
app.UseCors("AllowReactApp");

// Перенаправление на HTTPS
app.UseHttpsRedirection();

// Маршруты контроллеров
app.MapControllers();

app.Run();

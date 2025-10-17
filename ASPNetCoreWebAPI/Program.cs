using Microsoft.EntityFrameworkCore;
using ASPNetCoreWebAPI.Data;
using ASPNetCoreWebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();  
builder.Services.AddControllers(); //разрешает использование MVC-контроллеров для обработки HTTP-запросов.

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))); 

builder.Services.AddScoped<IValeraService, ValeraService>();  //"Когда кто-то просит повара для Валеры, давай ему одного и того же повара на весь заказ, но для нового заказа давай нового повара один экземпляр ValeraService на один HTTP запрос!

var app = builder.Build();  //Собирает все сервисы и middleware в готовое веб-приложение.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();


app.Run();


/*
Приходит запрос на /api/valera/1/work

Создаётся официант (ValeraController)

Буфет автоматически даёт ему повара (ValeraService)

Повару буфет даёт холодильник (ApplicationDbContext)

Повар достаёт Валеру из холодильника, меняет его состояние

Повар сохраняет Валеру обратно в холодильник

Официант возвращает результат клиенту
*/
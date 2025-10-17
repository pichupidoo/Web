using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ASPNetCoreWebAPI.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext> 
    {
        public ApplicationDbContext CreateDbContext(string[] args) //Создаёт DbContext с жёстко заданной строкой подключения.
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlite("Data Source=valera.db");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}

/*
Без ApplicationDbContextFactory иногда EF Core не сможет найти твой DbContext при миграциях, если конструктор зависит от DI (например, ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) в твоём проекте).

Файл гарантирует, что миграции будут работать вне приложения.*/
//Благодаря нему dotnet ef migrations add InitialCreate понимает, к какой базе подключаться и как создавать таблицы.
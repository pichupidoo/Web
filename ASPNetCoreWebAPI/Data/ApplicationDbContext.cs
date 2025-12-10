using Microsoft.EntityFrameworkCore; 
using ASPNetCoreWebAPI.Models;

namespace ASPNetCoreWebAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)  
            : base(options)
        {
        }

        public DbSet<Valera> Valeras { get; set; } //DbSet<T> — это таблица в базе данных, где EF Core хранит объекты Valera.
        public DbSet<User> Users { get; set; } // ← ДОБАВЬ ЭТО

        protected override void OnModelCreating(ModelBuilder modelBuilder) //OnModelCreating вызывается один раз при создании модели базы данных
        {
            base.OnModelCreating(modelBuilder);

            // Настройка модели Valera
            modelBuilder.Entity<Valera>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Health)
                    .IsRequired();
                
                entity.Property(e => e.Alcohol)
                    .IsRequired();
                
                entity.Property(e => e.Joy)
                    .IsRequired();
                
                entity.Property(e => e.Fatigue)
                    .IsRequired();
                
                entity.Property(e => e.Money)
                    .IsRequired();
            });
        }
    }
}
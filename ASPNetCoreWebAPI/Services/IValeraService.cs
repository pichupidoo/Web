using ASPNetCoreWebAPI.Models;

namespace ASPNetCoreWebAPI.Services
{
    public interface IValeraService
    {
        // Базовые CRUD операции
        Task<Valera?> GetValeraByIdAsync(int id);
        Task<IEnumerable<Valera>> GetAllValerasAsync();
        Task<IEnumerable<Valera>> GetValerasByUserIdAsync(int userId);
        Task<Valera> CreateValeraAsync(int userId); 
        Task<bool> DeleteValeraAsync(int id);
        
        // Действия Валеры
        Task<Valera?> WorkAsync(int id);
        Task<Valera?> EnjoyNatureAsync(int id);
        Task<Valera?> DrinkWineAndWatchSeriesAsync(int id);
        Task<Valera?> GoToBarAsync(int id);
        Task<Valera?> DrinkWithMarginalsAsync(int id);
        Task<Valera?> SingInMetroAsync(int id);
        Task<Valera?> SleepAsync(int id);
    }
}

/*
Это интерфейс для сервиса Валеры.

Интерфейс — это контракт, который говорит: «любая реализация этого интерфейса должна иметь такие методы».

Он не содержит логику, только объявления методов.

IValeraService — это контракт для сервиса, который работает с Валерой.

Контроллер (ValeraController) использует этот интерфейс, не зная, как конкретно реализованы методы.

Реализация (ValeraService.cs) уже содержит логику изменения состояния Валеры и работу с БД.
*/
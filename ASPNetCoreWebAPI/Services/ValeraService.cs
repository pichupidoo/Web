using ASPNetCoreWebAPI.Data;
using ASPNetCoreWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPNetCoreWebAPI.Services
{
    public class ValeraService : IValeraService  //Это конкретная реализация интерфейса IValeraService
    {
        private readonly ApplicationDbContext _context;

        public ValeraService(ApplicationDbContext context)
        {
            _context = context; //_context — это ссылка на DbContext, через который происходит работа с базой.Благодаря этому класс может читать и писать в таблицу Valeras.
        }

        public async Task<Valera?> GetValeraByIdAsync(int id)
        {
            return await _context.Valeras.FindAsync(id);
        }

        public async Task<IEnumerable<Valera>> GetAllValerasAsync()
        {
            return await _context.Valeras.ToListAsync();
        }

        public async Task<Valera> CreateValeraAsync()
        {
            var valera = new Valera();
            _context.Valeras.Add(valera);
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<bool> DeleteValeraAsync(int id)
        {
            var valera = await _context.Valeras.FindAsync(id);
            if (valera == null)
                return false;

            _context.Valeras.Remove(valera);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Valera?> WorkAsync(int id)
        {
            var valera = await _context.Valeras.FindAsync(id);
            if (valera == null)
                return null;

            valera.Work();
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera?> EnjoyNatureAsync(int id)
        {
            var valera = await _context.Valeras.FindAsync(id);
            if (valera == null)
                return null;

            valera.EnjoyNature();
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera?> DrinkWineAndWatchSeriesAsync(int id)
        {
            var valera = await _context.Valeras.FindAsync(id);
            if (valera == null)
                return null;

            valera.DrinkWineAndWatchSeries();
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera?> GoToBarAsync(int id)
        {
            var valera = await _context.Valeras.FindAsync(id);
            if (valera == null)
                return null;

            valera.GoToBar();
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera?> DrinkWithMarginalsAsync(int id)
        {
            var valera = await _context.Valeras.FindAsync(id);
            if (valera == null)
                return null;

            valera.DrinkWithMarginals();
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera?> SingInMetroAsync(int id)
        {
            var valera = await _context.Valeras.FindAsync(id);
            if (valera == null)
                return null;

            valera.SingInMetro();
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera?> SleepAsync(int id)
        {
            var valera = await _context.Valeras.FindAsync(id);
            if (valera == null)
                return null;

            valera.Sleep();
            await _context.SaveChangesAsync();
            return valera;
        }
    }
}
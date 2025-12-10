using ASPNetCoreWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ASPNetCoreWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Закрываем весь контроллер
    public class ValeraController : ControllerBase
    {
        private readonly IValeraService _valeraService;

        public ValeraController(IValeraService valeraService)
        {
            _valeraService = valeraService;
        }

        // Получить ТОЛЬКО СВОИ Валеры
        [HttpGet("my")]
        public async Task<IActionResult> GetMyValeras()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            /*User — объект, созданный UseAuthentication() из JWT токена
            ClaimTypes.NameIdentifier хранит Id пользователя, который мы положили в токен при логине: Таким образом, сервер знает, кто делает запрос, без дополнительного запроса к базе для авторизации*/
            var valeras = await _valeraService.GetValerasByUserIdAsync(userId);
            return Ok(valeras);
        }

        // Получить ВСЕ Валеры (только Admin)
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var valeras = await _valeraService.GetAllValerasAsync();
            return Ok(valeras);
        }

        // Получить Валеру по ID (только свою или Admin)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraByIdAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            // Проверка прав доступа
            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            return Ok(valera);
        }

        // Создать Валеру (привязывается к текущему пользователю)
        [HttpPost]
        public async Task<IActionResult> Create()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var valera = await _valeraService.CreateValeraAsync(userId);
            return CreatedAtAction(nameof(GetById), new { id = valera.Id }, valera);
        }

        // Удалить Валеру (только свою или Admin)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraByIdAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            // Проверка прав доступа
            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            await _valeraService.DeleteValeraAsync(id);
            return NoContent();
        }

        // Действия с Валерой (только свою или Admin)
        [HttpPost("{id}/work")]
        public async Task<IActionResult> Work(int id)
        {
            return await PerformAction(id, _valeraService.WorkAsync);
        }

        [HttpPost("{id}/enjoy-nature")]
        public async Task<IActionResult> EnjoyNature(int id)
        {
            return await PerformAction(id, _valeraService.EnjoyNatureAsync);
        }

        [HttpPost("{id}/drink-wine")]
        public async Task<IActionResult> DrinkWineAndWatchSeries(int id)
        {
            return await PerformAction(id, _valeraService.DrinkWineAndWatchSeriesAsync);
        }

        [HttpPost("{id}/go-to-bar")]
        public async Task<IActionResult> GoToBar(int id)
        {
            return await PerformAction(id, _valeraService.GoToBarAsync);
        }

        [HttpPost("{id}/drink-with-marginals")]
        public async Task<IActionResult> DrinkWithMarginals(int id)
        {
            return await PerformAction(id, _valeraService.DrinkWithMarginalsAsync);
        }

        [HttpPost("{id}/sing-in-metro")]
        public async Task<IActionResult> SingInMetro(int id)
        {
            return await PerformAction(id, _valeraService.SingInMetroAsync);
        }

        [HttpPost("{id}/sleep")]
        public async Task<IActionResult> Sleep(int id)
        {
            return await PerformAction(id, _valeraService.SleepAsync);
        }

        // Вспомогательный метод для проверки прав
        private async Task<IActionResult> PerformAction(int id, Func<int, Task<Models.Valera?>> action)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var isAdmin = User.IsInRole("Admin");

            var valera = await _valeraService.GetValeraByIdAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            // Проверка прав доступа
            if (!isAdmin && valera.UserId != userId)
                return Forbid();

            var result = await action(id);
            return Ok(result);
        }
    }
}
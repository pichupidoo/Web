using ASPNetCoreWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ASPNetCoreWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValeraController : ControllerBase
    {
        private readonly IValeraService _valeraService;

        public ValeraController(IValeraService valeraService)
        {
            _valeraService = valeraService; //}Контроллер не знает про конкретную реализацию сервиса, он работает через интерфейс IValeraService.DI (Dependency Injection) автоматически передаёт ValeraService при старте приложения.
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var valeras = await _valeraService.GetAllValerasAsync();
            return Ok(valeras);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var valera = await _valeraService.GetValeraByIdAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            return Ok(valera);
        }

        [HttpPost]
        public async Task<IActionResult> Create()
        {
            var valera = await _valeraService.CreateValeraAsync();
            return CreatedAtAction(nameof(GetById), new { id = valera.Id }, valera);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _valeraService.DeleteValeraAsync(id);
            if (!result)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            return NoContent();
        }

        [HttpPost("{id}/work")]
        public async Task<IActionResult> Work(int id)
        {
            var valera = await _valeraService.WorkAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            return Ok(valera);
        }

        [HttpPost("{id}/enjoy-nature")]
        public async Task<IActionResult> EnjoyNature(int id)
        {
            var valera = await _valeraService.EnjoyNatureAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            return Ok(valera);
        }

        [HttpPost("{id}/drink-wine")]
        public async Task<IActionResult> DrinkWineAndWatchSeries(int id)
        {
            var valera = await _valeraService.DrinkWineAndWatchSeriesAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            return Ok(valera);
        }

        [HttpPost("{id}/go-to-bar")]
        public async Task<IActionResult> GoToBar(int id)
        {
            var valera = await _valeraService.GoToBarAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            return Ok(valera);
        }

        [HttpPost("{id}/drink-with-marginals")]
        public async Task<IActionResult> DrinkWithMarginals(int id)
        {
            var valera = await _valeraService.DrinkWithMarginalsAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            return Ok(valera);
        }

        [HttpPost("{id}/sing-in-metro")]
        public async Task<IActionResult> SingInMetro(int id)
        {
            var valera = await _valeraService.SingInMetroAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            return Ok(valera);
        }

        [HttpPost("{id}/sleep")]
        public async Task<IActionResult> Sleep(int id)
        {
            var valera = await _valeraService.SleepAsync(id);
            if (valera == null)
                return NotFound(new { message = $"Валера с ID {id} не найден" });

            return Ok(valera);
        }
    }
}

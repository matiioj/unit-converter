using Microsoft.AspNetCore.Mvc;
using UnitConverter.Services;
using UnitConverter.Models;
using UnitConverter.Contracts;
using UnitConverter.Shared.Enums;

namespace UnitConverter.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UnitConverterController : ControllerBase
    {
        private readonly IUnitConverterService _unitConverterService;

        public UnitConverterController(IUnitConverterService unitConverterService)
        {
            _unitConverterService = unitConverterService;
        }
        [HttpPost()]

        public IActionResult GenerateNewValue(ConversionRequest request)
        {
            try
            {
                double value = request.Value;
                var fromUnit = new Unit(request.FromUnitType, request.FromUnitName);
                var toUnit = new Unit(request.ToUnitType, request.ToUnitName);

                return Ok(_unitConverterService.Convert(value, fromUnit, toUnit));
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }
    }
}
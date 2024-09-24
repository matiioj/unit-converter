using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UnitConverter.Services;
using UnitConverter.Models;
using UnitConverter.Contracts;
using UnitConverter.Shared.Enums;

namespace UnitConverter.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class UnitConverterController : ControllerBase
    {
        private readonly IUnitConverterService _unitConverterService;

        [HttpPost()]

        public double GenerateNewValue(ConversionRequest request)
        {
            double value = request.Value;
            var fromUnit =  new Unit(request.FromUnitType, request.FromUnitName);
            var toUnit = new Unit(request.ToUnitType, request.ToUnitName); 

            switch (fromUnit.unitType) 
            {
                default:
                    return _unitConverterService.ConvertLength(value, fromUnit, toUnit);
                case UnitType.Weight:
                    return _unitConverterService.ConvertWeight(value, fromUnit, toUnit);
                case UnitType.Temperature:
                    return _unitConverterService.ConvertTemperature(value, fromUnit, toUnit);
            }
        }
    }
}
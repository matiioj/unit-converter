using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitConverter.Shared.Enums;
using UnitConverter.Models;

namespace UnitConverter.Services
{
    public interface IUnitConverterService
    {
        public double ConvertLength(double number, Unit from, Unit to);
        public double ConvertWeight(double number, Unit from, Unit to);
        public double ConvertTemperature(double number, Unit from, Unit to);
    }
}
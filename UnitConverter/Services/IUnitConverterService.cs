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
        public double Convert(double number, Unit from, Unit to);   
    }
}
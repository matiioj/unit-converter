using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitConverter.Models;
using UnitConverter.Shared.Enums;

namespace UnitConverter.Services
{
    public class UnitConverterService : IUnitConverterService
    {

        public double ConvertLength(double value, Unit from, Unit to)
        {
            if (from == to)
                return value;

            // Define length conversion factors in millimeters
            var lengthFactors = new Dictionary<UnitName, double>
            {
                { UnitName.Milimeter, 1 },
                { UnitName.Centimeter, 10 },
                { UnitName.Meter, 1000 },
                { UnitName.Kilometer, 1000000 },
                { UnitName.Inch, 25.4 },
                { UnitName.Foot, 304.8 },
                { UnitName.Yard, 914.4 },
                { UnitName.Mile, 1609344 }
            };

            // Convert 'from' unit to millimeters, then convert from millimeters to 'to' unit
            double fromFactor = lengthFactors[from.unitName];
            double toFactor = lengthFactors[to.unitName];

            // Perform conversion
            return value * fromFactor / toFactor;
        }

        public double ConvertTemperature(double value, Unit from, Unit to)
        {
            if (from == to)
                return value;

            switch (from.unitName)
            {
                case UnitName.Celsius when to.unitName == UnitName.Fahrenheit:
                    return (value * 9 / 5) + 32;
                case UnitName.Celsius when to.unitName == UnitName.Kelvin:
                    return value + 273.15;
                case UnitName.Fahrenheit when to.unitName == UnitName.Celsius:
                    return (value - 32) * 5 / 9;
                case UnitName.Fahrenheit when to.unitName == UnitName.Kelvin:
                    return ((value - 32) * 5 / 9) + 273.15;
                case UnitName.Kelvin when to.unitName == UnitName.Celsius:
                    return value - 273.15;
                case UnitName.Kelvin when to.unitName == UnitName.Fahrenheit:
                    return ((value - 273.15) * 9 / 5) + 32;
                default:
                    throw new ArgumentException("Invalid temperature conversion");
            }
        }

        public double ConvertWeight(double value, Unit from, Unit to)
        {
            if (from == to)
                return value;

            // Define weight conversion factors in milligrams
            var weightFactors = new Dictionary<UnitName, double>
            {
                { UnitName.Miligram, 1 },
                { UnitName.Gram, 1000 },
                { UnitName.Kilogram, 1000000 },
                { UnitName.Ounce, 28349.5 },
                { UnitName.Pound, 453592 }
            };

            // Convert 'from' unit to milligrams, then convert from milligrams to 'to' unit
            double fromFactor = weightFactors[from.unitName];
            double toFactor = weightFactors[to.unitName];

            // Perform conversion
            return (value * fromFactor) / toFactor;
        }
    }
}
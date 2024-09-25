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
        public double Convert(double value, Unit from, Unit to)
        {
            if (from == to)
            {
                return value;
            }

            switch (from.unitType)
            {
                case UnitType.Weight:
                    return ConvertLengthOrWeight(value, from, to);
                case UnitType.Length:
                    return ConvertLengthOrWeight(value, from, to);
                case UnitType.Temperature:
                    return ConvertTemperature(value, from, to);
                default:
                    throw new ArgumentException("Conversion not supported");
            }
        }

        private double ConvertLengthOrWeight(double value, Unit from, Unit to)
        {
            var factors = GetUnitFactors(from.unitType);
            double fromFactor = factors[from.unitName];
            double toFactor = factors[to.unitName];

            return value * fromFactor / toFactor;
        }

        private double ConvertTemperature(double value, Unit from, Unit to)
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

        private Dictionary<UnitName, double> GetUnitFactors(UnitType unitType)
        {
            Dictionary<UnitName, double> factors = new Dictionary<UnitName, double>();

            switch (unitType)
            {
                case UnitType.Weight:

                    factors = new Dictionary<UnitName, double>
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
                    break;

                case UnitType.Length:

                    factors = new Dictionary<UnitName, double>
                    {
                        { UnitName.Miligram, 1 },
                        { UnitName.Gram, 1000 },
                        { UnitName.Kilogram, 1000000 },
                        { UnitName.Ounce, 28349.5 },
                        { UnitName.Pound, 453592 }
                    };
                    break;

            }
            return factors;
        }
    }
}
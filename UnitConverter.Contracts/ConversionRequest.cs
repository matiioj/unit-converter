using UnitConverter.Shared.Enums;

namespace UnitConverter.Contracts
{
    public record ConversionRequest(
        double Value,
        UnitType FromUnitType,
        UnitName FromUnitName,
        UnitType ToUnitType,
        UnitName ToUnitName
    );
}
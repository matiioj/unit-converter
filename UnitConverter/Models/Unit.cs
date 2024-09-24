using UnitConverter.Shared.Enums;

namespace UnitConverter.Models
{
    public class Unit
    {
        public UnitType unitType { get; set; }
        public UnitName unitName { get; set; }

        public Unit(UnitType unitType, UnitName unitName) 
        {
            this.unitType = unitType;
            this.unitName = unitName;
        }
    }
}
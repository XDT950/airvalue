import { useState } from "react";

// Base health cost per month depending on AQI level (in ₹)
const AQI_HEALTH_COST_PER_MONTH = {
  good: 50,
  moderate: 250,
  unhealthy_sensitive: 1000,
  unhealthy: 2500,
  very_unhealthy: 5000,
  hazardous: 10000,
};

// Health conditions risk multipliers
const HEALTH_CONDITION_MULTIPLIERS: Record<string, number> = {
  "None": 1,
  "Asthma": 1.5,
  "Heart Disease": 2,
  "Lung Disease": 2.5,
  "Diabetes": 1.3,
  "Elderly (60+)": 1.8,
  "Children (below 10)": 1.6,
};

// Function to categorize AQI & determine health cost
const getHealthCategory = (aqi: number): { category: string; baseCost: number } => {
  if (aqi <= 50) return { category: "Good", baseCost: AQI_HEALTH_COST_PER_MONTH.good };
  if (aqi <= 100) return { category: "Moderate", baseCost: AQI_HEALTH_COST_PER_MONTH.moderate };
  if (aqi <= 150) return { category: "Unhealthy for Sensitive Groups", baseCost: AQI_HEALTH_COST_PER_MONTH.unhealthy_sensitive };
  if (aqi <= 200) return { category: "Unhealthy", baseCost: AQI_HEALTH_COST_PER_MONTH.unhealthy };
  if (aqi <= 300) return { category: "Very Unhealthy", baseCost: AQI_HEALTH_COST_PER_MONTH.very_unhealthy };
  return { category: "Hazardous", baseCost: AQI_HEALTH_COST_PER_MONTH.hazardous };
};

export default function HealthRiskCalculator({ aqi }: { aqi: number }) {
  const [age, setAge] = useState<number>(25);
  const [hoursOutside, setHoursOutside] = useState<number>(2);
  const [healthCondition, setHealthCondition] = useState<string>("None");
  const [healthCost, setHealthCost] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const calculateHealthCost = () => {
    const { category, baseCost } = getHealthCategory(aqi);

    // Adjust health cost based on exposure time (per month)
    const exposureFactor = hoursOutside / 4; // 4 hours/day is the baseline
    const ageFactor = age > 50 ? 1.5 : 1; // Higher cost for older individuals
    const conditionFactor = HEALTH_CONDITION_MULTIPLIERS[healthCondition] || 1;

    const adjustedCostPerMonth = baseCost * exposureFactor * ageFactor * conditionFactor;
    const yearlyCost = adjustedCostPerMonth * 12; // Multiply by 12 months

    setHealthCost(yearlyCost);
    setCategory(category);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">🏥 Health Risk Calculator</h2>

      {/* Age Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">🎂 Enter Your Age:</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>

      {/* Hours Outside Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">⏳ How Many Hours Are You Outside Daily?</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          placeholder="Hours Outside"
          value={hoursOutside}
          onChange={(e) => setHoursOutside(Number(e.target.value))}
        />
      </div>

      {/* Health Condition Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">💉 Do You Have Any Health Conditions?</label>
        <select
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          value={healthCondition}
          onChange={(e) => setHealthCondition(e.target.value)}
        >
          {Object.keys(HEALTH_CONDITION_MULTIPLIERS).map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateHealthCost}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
      >
        Calculate Health Cost
      </button>

      {/* Results */}
      {healthCost > 0 && (
        <div className="mt-6 p-4 rounded-lg shadow-lg bg-gray-100">
          <h3 className="text-xl font-bold">🌡️ AQI Level: {category}</h3>
          <p className="text-lg text-gray-800">💸 Estimated Yearly Health Cost: <strong>₹{healthCost.toLocaleString()}</strong></p>
        </div>
      )}
    </div>
  );
}

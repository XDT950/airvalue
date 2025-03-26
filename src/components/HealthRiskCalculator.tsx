import { useState, useEffect } from "react";

const API_KEY = "9bd1c327b0c64ebb1e7e8a3f3bc8e9f13c315c09"; // Replace with your API key

const AQI_HEALTH_COST_PER_MONTH = {
  good: 50,
  moderate: 250,
  unhealthy_sensitive: 1000,
  unhealthy: 2500,
  very_unhealthy: 5000,
  hazardous: 10000,
};

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

// Function to fetch AQI for a given area
const fetchAQIByArea = async (area: string): Promise<number | null> => {
  const url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${area}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "ok" && data.data.length > 0) {
    return parseInt(data.data[0].aqi) || null;
  }
  return null;
};

export default function HealthRiskCalculator({ area, age, hoursOutside, healthCondition }: { area: string; age: number; hoursOutside: number; healthCondition: string }) {
  const [aqi, setAqi] = useState<number | null>(null);
  const [healthCost, setHealthCost] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const calculateHealthCost = async () => {
      setLoading(true);

      // Fetch AQI for the entered area
      const fetchedAqi = await fetchAQIByArea(area);

      if (fetchedAqi === null) {
        alert("AQI data not found for this area. Please try another.");
        setLoading(false);
        return;
      }

      setAqi(fetchedAqi);

      // Calculate cost based on AQI
      const { category, baseCost } = getHealthCategory(fetchedAqi);
      const exposureFactor = hoursOutside / 4; // 4 hours/day is baseline
      const ageFactor = age > 50 ? 1.5 : 1;
      const conditionFactor = HEALTH_CONDITION_MULTIPLIERS[healthCondition] || 1;

      const adjustedCostPerMonth = baseCost * exposureFactor * ageFactor * conditionFactor;
      const yearlyCost = adjustedCostPerMonth * 12; // Multiply by 12 months

      setHealthCost(yearlyCost);
      setCategory(category);
      setLoading(false);
    };

    calculateHealthCost();
  }, [area, age, hoursOutside, healthCondition]);

  return (
    <div className="mt-6 p-4 rounded-lg shadow-lg bg-gray-100">
      {loading ? (
        <p className="text-lg font-bold text-gray-700">Fetching AQI & Calculating Cost...</p>
      ) : healthCost !== null ? (
        <>
          <h3 className="text-xl font-bold">🌡️ AQI for {area}: {aqi}</h3>
          <h3 className="text-xl font-bold">🌡️ AQI Level: {category}</h3>
          <p className="text-lg text-gray-800">💸 Estimated Yearly Health Cost: <strong>₹{healthCost.toLocaleString()}</strong></p>
        </>
      ) : (
        <p className="text-lg font-bold text-red-600">⚠️ Unable to fetch AQI data. Please try again.</p>
      )}
    </div>
  );
}

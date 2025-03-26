import { useState } from "react";

const getAQICategory = (aqi: number): string => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

const getRiskMultiplier = (aqi: number): number => {
  if (aqi <= 50) return 1.0;
  if (aqi <= 100) return 1.2;
  if (aqi <= 150) return 1.5;
  if (aqi <= 200) return 2.0;
  if (aqi <= 300) return 3.0;
  return 4.5;
};

const getHealthRecommendation = (aqi: number): string => {
  if (aqi <= 50) return "Air quality is good. No health precautions needed.";
  if (aqi <= 100) return "Consider wearing a mask if you have respiratory issues.";
  if (aqi <= 150) return "Limit outdoor activities if you have asthma or lung conditions.";
  if (aqi <= 200) return "Avoid outdoor exercise and wear a pollution mask.";
  if (aqi <= 300) return "Reduce outdoor exposure. Use an air purifier indoors.";
  return "Stay indoors as much as possible. Seek medical advice if feeling unwell.";
};

export default function HealthRiskCalculator() {
  const [aqi, setAqi] = useState("");
  const [age, setAge] = useState("");
  const [hoursOutside, setHoursOutside] = useState("");

  const calculateHealthCost = () => {
    const parsedAQI = parseInt(aqi);
    const parsedAge = parseInt(age);
    const parsedHours = parseInt(hoursOutside);

    if (isNaN(parsedAQI) || isNaN(parsedAge) || isNaN(parsedHours)) {
      return "Please enter valid numeric values.";
    }

    const baseCost = 100; // Base health cost per year in dollars
    const ageFactor = parsedAge * 10; // Health risk increases with age
    const riskMultiplier = getRiskMultiplier(parsedAQI);

    const yearlyCost = (baseCost + ageFactor) * riskMultiplier * parsedHours * 365;
    return yearlyCost.toFixed(2);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Health Risk & Cost Calculator</h2>

      {/* AQI Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Enter AQI Value:</label>
        <input
          type="number"
          className="border rounded-lg p-2 w-full"
          value={aqi}
          onChange={(e) => setAqi(e.target.value)}
          placeholder="Enter AQI (e.g., 150)"
        />
      </div>

      {/* Age Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Enter Your Age:</label>
        <input
          type="number"
          className="border rounded-lg p-2 w-full"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
        />
      </div>

      {/* Daily Exposure Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Daily Hours Spent Outside:</label>
        <input
          type="number"
          className="border rounded-lg p-2 w-full"
          value={hoursOutside}
          onChange={(e) => setHoursOutside(e.target.value)}
          placeholder="Enter Hours (e.g., 5)"
        />
      </div>

      {/* Result Section */}
      {aqi && age && hoursOutside && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="font-semibold">AQI Category: <span className="text-blue-600">{getAQICategory(parseInt(aqi))}</span></p>
          <p className="font-semibold text-red-600">Estimated Health Cost per Year: ${calculateHealthCost()}</p>
          <p className="mt-2 text-gray-700">{getHealthRecommendation(parseInt(aqi))}</p>
        </div>
      )}
    </div>
  );
}

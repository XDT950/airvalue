import { useState } from "react";
import HealthRiskCalculator from "../components/HealthRiskCalculator";

export default function HealthAssessment() {
  const [aqi, setAqi] = useState<number>(100);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">🌍 Air Quality & Health Assessment</h2>

      {/* AQI Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">🌫️ Enter AQI of Your Area:</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          placeholder="AQI Value"
          value={aqi}
          onChange={(e) => setAqi(Number(e.target.value))}
        />
      </div>

      {/* Health Risk Calculator */}
      <HealthRiskCalculator aqi={aqi} />
    </div>
  );
}

import { useState } from "react";
import HealthRiskCalculator from "../components/HealthRiskCalculator";

const API_KEY = "9bd1c327b0c64ebb1e7e8a3f3bc8e9f13c315c09"; // Replace with your AQICN API key

// Function to fetch area suggestions from API
const fetchAreaSuggestions = async (query: string): Promise<string[]> => {
  if (!query) return [];

  const url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${query}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "ok" && data.data.length > 0) {
    return data.data.map((item: any) => item.station.name);
  }
  
  return [];
};

export default function HealthAssessment() {
  const [area, setArea] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [age, setAge] = useState<number>(25);
  const [hoursOutside, setHoursOutside] = useState<number>(2);
  const [healthCondition, setHealthCondition] = useState<string>("None");
  const [calculate, setCalculate] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleAreaChange = async (input: string) => {
    setArea(input);
    setError(""); // ✅ Clear error when user types a new area
    setCalculate(false); // ✅ Reset calculation state when typing

    if (input.length > 2) {
      const results = await fetchAreaSuggestions(input);
      setSuggestions(results);

      if (results.length === 0) {
        setError("⚠️ No data available for this area.");
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">🌍 Air Quality & Health Assessment</h2>

      {/* Area Input with Suggestions */}
      <div className="mb-6 relative">
        <label className="block text-gray-700 font-semibold text-lg mb-2">📍 Enter Your Area:</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          placeholder="Start typing your area name..."
          value={area}
          onChange={(e) => handleAreaChange(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-10">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setArea(suggestion);
                  setSuggestions([]);
                  setError(""); // ✅ Clear error when valid area is selected
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      {/* Age Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">🎂 Enter Your Age:</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>

      {/* Hours Outside Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">⏳ Daily Hours Spent Outside:</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          value={hoursOutside}
          onChange={(e) => setHoursOutside(Number(e.target.value))}
        />
      </div>

      {/* Health Condition Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">💉 Existing Health Conditions:</label>
        <select
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          value={healthCondition}
          onChange={(e) => setHealthCondition(e.target.value)}
        >
          {["None", "Asthma", "Heart Disease", "Lung Disease", "Diabetes", "Elderly (60+)", "Children (below 10)"].map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={() => {
          if (!area || error) {
            alert("Please select a valid area before proceeding.");
          } else {
            setCalculate(true);
          }
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
      >
        Calculate Health Cost
      </button>

      {/* Display Health Risk Calculator */}
      {calculate && <HealthRiskCalculator area={area} age={age} hoursOutside={hoursOutside} healthCondition={healthCondition} />}
    </div>
  );
}

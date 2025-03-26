import { useState } from "react";
import HealthRiskCalculator from "../components/HealthRiskCalculator";

const API_KEY = "YOUR_AQICN_API_KEY"; // Replace with your AQICN API key

// Function to fetch area suggestions
const fetchAreaSuggestions = async (query: string): Promise<string[]> => {
  if (!query) return [];

  try {
    const url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${query}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "ok" && data.data.length > 0) {
      return data.data.map((item: any) => item.station.name);
    }
  } catch (error) {
    console.error("Error fetching area suggestions:", error);
  }
  return [];
};

export default function HealthAssessment() {
  const [area, setArea] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [familyMembers, setFamilyMembers] = useState(1);
  const [ages, setAges] = useState<number[]>([25]); // Default one member
  const [hoursOutside, setHoursOutside] = useState(2);
  const [healthCondition, setHealthCondition] = useState("None");
  const [calculate, setCalculate] = useState<boolean>(false);

  // Handle area input change and fetch suggestions
  const handleAreaChange = async (input: string) => {
    setArea(input);
    setError(null);
    setCalculate(false);

    if (input.length > 2) {
      const results = await fetchAreaSuggestions(input);
      setSuggestions(results);

      if (results.length === 0) {
        setError("⚠️ No data available for this area.");
      }
    } else {
      setSuggestions([]);
      setError(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-black mb-6">
        🏥 Health Risk Calculator
      </h2>

      {/* Area Input with Auto-suggestions */}
      <div className="mb-6 relative">
        <label className="block text-black font-semibold text-lg mb-2">📍 Enter Your Area:</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg bg-gray-100 text-black font-semibold"
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
                  setError(null);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      {/* Family Members */}
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">👨‍👩‍👧‍👦 Number of Family Members:</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-100 text-black font-semibold"
          min="1"
          value={familyMembers}
          onChange={(e) => {
            const count = Number(e.target.value);
            setFamilyMembers(count);
            setAges(Array(count).fill(25)); // Default age 25 for all
          }}
        />
      </div>

      {/* Ages for Each Family Member */}
      {ages.map((age, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-black font-semibold mb-2">
            🎂 Age of Family Member {index + 1}:
          </label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg bg-gray-100 text-black font-semibold"
            value={age}
            onChange={(e) => {
              const newAges = [...ages];
              newAges[index] = Number(e.target.value);
              setAges(newAges);
            }}
          />
        </div>
      ))}

      {/* Hours Outside */}
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">⏳ Average Daily Hours Spent Outside by a  Family Member:</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-100 text-black font-semibold"
          value={hoursOutside}
          onChange={(e) => setHoursOutside(Number(e.target.value))}
        />
      </div>

      {/* Health Condition */}
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">⚕️ Select Health Condition:</label>
        <select
          className="w-full p-3 border rounded-lg bg-gray-100 text-black font-semibold"
          value={healthCondition}
          onChange={(e) => setHealthCondition(e.target.value)}
        >
          <option value="None">None</option>
          <option value="Asthma">Asthma</option>
          <option value="Heart Disease">Heart Disease</option>
          <option value="Lung Disease">Lung Disease</option>
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
      {calculate && (
        <HealthRiskCalculator
          area={area}
          familyMembers={familyMembers}
          ages={ages}
          hoursOutside={hoursOutside}
          healthCondition={healthCondition}
        />
      )}
    </div>
  );
}

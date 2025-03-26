import { useState } from "react";

export default function HealthRiskCalculator() {
  const [area, setArea] = useState("");
  const [familyMembers, setFamilyMembers] = useState(1);
  const [ages, setAges] = useState<number[]>([25]); // Default one member
  const [hoursOutside, setHoursOutside] = useState(2);
  const [healthCondition, setHealthCondition] = useState("None");
  const [result, setResult] = useState<number | null>(null);

  const handleMemberChange = (count: number) => {
    setFamilyMembers(count);
    setAges(Array(count).fill(25)); // Default age 25 for all
  };

  const handleAgeChange = (index: number, value: number) => {
    const newAges = [...ages];
    newAges[index] = value;
    setAges(newAges);
  };

  const calculateHealthRisk = () => {
    if (!area || ages.some((age) => !age) || !hoursOutside) {
      alert("Please fill in all fields!");
      return;
    }

    const perPersonCost = hoursOutside * 500 * 12; // Sample formula
    const totalHealthCost = perPersonCost * familyMembers;

    setResult(totalHealthCost);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-black mb-6">
        🏥 Health Risk Calculator
      </h2>

      {/* Area Input */}
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">📍 Enter Your Area:</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg bg-gray-100 text-black font-semibold"
          placeholder="Enter area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>

      {/* Family Members */}
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">👨‍👩‍👧‍👦 Number of Family Members:</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-100 text-black font-semibold"
          placeholder="Enter number"
          min="1"
          value={familyMembers}
          onChange={(e) => handleMemberChange(Number(e.target.value))}
        />
      </div>

      {/* Ages for Each Member */}
      {ages.map((age, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-black font-semibold mb-2">
            🎂 Age of Family Member {index + 1}:
          </label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg bg-gray-100 text-black font-semibold"
            placeholder="Enter age"
            value={age}
            onChange={(e) => handleAgeChange(index, Number(e.target.value))}
          />
        </div>
      ))}

      {/* Hours Outside */}
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">⏳ Hours Outside Per Day:</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-100 text-black font-semibold"
          placeholder="Enter hours"
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

      {/* Calculate Button */}
      <button
        onClick={calculateHealthRisk}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
      >
        Calculate Health Cost
      </button>

      {/* Result Display */}
      {result !== null && (
        <div className="mt-6 p-4 rounded-lg shadow-lg bg-gray-200">
          <h3 className="text-xl font-bold text-black">🌡️ Health Risk Estimated Cost:</h3>
          <p className="text-lg text-black">💸 Estimated Yearly Cost for Family: <strong>₹{result.toLocaleString()}</strong></p>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import AQIMap from "../components/AQIMap"; // Import the AQI map component

const API_KEY = "9bd1c327b0c64ebb1e7e8a3f3bc8e9f13c315c09"; // Replace with your WAQI API Key

// Define the type for AQI stations
interface AQIStation {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  aqi: number;
}

// List of cities available for selection
const CITIES = [
  { name: "Delhi", lat: 28.7041, lon: 77.1025 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
];

export default function AQIHeatmap() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]); // Default city: Delhi
  const [stations, setStations] = useState<AQIStation[]>([]); // Store AQI stations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch AQI stations for the selected city
  useEffect(() => {
    const fetchCityAQI = async () => {
      setLoading(true);
      setError("");

      try {
        const url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${selectedCity.name}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok" || !data.data.length) {
          setError(`❌ No AQI data available for ${selectedCity.name}.`);
          setLoading(false);
          return;
        }

        // Explicitly define `station` type
        const cityStations: AQIStation[] = data.data.map((station: any) => ({
          id: station.uid.toString(),
          address: station.station.name,
          latitude: station.station.geo[0],
          longitude: station.station.geo[1],
          aqi: parseInt(station.aqi),
        }));

        setStations(cityStations);
      } catch (err) {
        setError("❌ Failed to fetch AQI data. Try again.");
      }

      setLoading(false);
    };

    fetchCityAQI();
  }, [selectedCity]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        🌍 City AQI Heatmap
      </h2>

      {/* City Selector */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">
          🏙️ Select a City:
        </label>
        <select
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          value={selectedCity.name}
          onChange={(e) =>
            setSelectedCity(CITIES.find((city) => city.name === e.target.value)!)
          }
        >
          {CITIES.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Show Map */}
      {loading && <p className="text-blue-500 text-center">🔄 Loading AQI data...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && <AQIMap properties={stations} />}
    </div>
  );
}


import { useState, useEffect } from "react";
import AQIMap from "../components/AQIMap"; // Import AQIMap component

const API_KEY = "9bd1c327b0c64ebb1e7e8a3f3bc8e9f13c315c09"; // Replace with your AQICN API key

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
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
];

export default function AQIHeatmap() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]); // Default: Delhi
  const [stations, setStations] = useState<AQIStation[]>([]); // Store AQI stations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch AQI stations for the selected city
  useEffect(() => {
    const fetchCityAQI = async () => {
      setLoading(true);
      setError("");

      try {
        const url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${selectedCity}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok" || !data.data.length) {
          setError(`❌ No AQI data available for ${selectedCity}.`);
          setLoading(false);
          return;
        }

        // Convert API response into AQIStation format
        const cityStations: AQIStation[] = data.data.map((station: any) => ({
          id: station.uid.toString(),
          address: station.station.name,
          latitude: station.station.geo[0],
          longitude: station.station.geo[1],
          aqi: parseInt(station.aqi) || 0, // Default AQI to 0 if missing
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
        🌍 City AQI Heatmap (Stations)
      </h2>

      {/* City Selector */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">
          🏙️ Select a City:
        </label>
        <select
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      
      {/* AQI Legend and Map */}
      <div className="flex gap-6">
         <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md text-gray-900">
           <h3 className="text-lg font-bold mb-2">AQI Legend</h3>
           <ul className="text-sm">
             <li className="flex items-center mb-2"><span className="w-4 h-4 bg-green-500 inline-block mr-2"></span> <span className="text-gray-800">Good (0-50)</span></li>
             <li className="flex items-center mb-2"><span className="w-4 h-4 bg-yellow-500 inline-block mr-2"></span> <span className="text-gray-800">Moderate (51-100)</span></li>
             <li className="flex items-center mb-2"><span className="w-4 h-4 bg-orange-500 inline-block mr-2"></span> <span className="text-gray-800">Unhealthy for Sensitive Groups (101-150)</span></li>
             <li className="flex items-center mb-2"><span className="w-4 h-4 bg-red-500 inline-block mr-2"></span> <span className="text-gray-800">Unhealthy (151-200)</span></li>
             <li className="flex items-center mb-2"><span className="w-4 h-4 bg-purple-500 inline-block mr-2"></span> <span className="text-gray-800">Very Unhealthy (201-300)</span></li>
             <li className="flex items-center mb-2"><span className="w-4 h-4 bg-maroon-500 inline-block mr-2"></span> <span className="text-gray-800">Hazardous (301+)</span></li>
           </ul>
         </div>
         <div className="w-3/4">
           {loading && <p className="text-blue-600 text-center">🔄 Loading AQI data...</p>}
           {error && <p className="text-red-600 text-center">{error}</p>}
           {!loading && !error && <AQIMap properties={stations} />}
         </div>
       </div>
     </div>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";


const API_KEY = "9bd1c327b0c64ebb1e7e8a3f3bc8e9f13c315c09"; // 🔹 Replace with your actual AQICN API key

const DEFAULT_CITIES = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"];

// Function to fetch AQI stations for a city
const fetchAQIStations = async (city: string) => {
  const url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${city}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "ok") {
    console.error("❌ Failed to fetch AQI stations:", data);
    return [];
  }

  return data.data.map((station: any) => ({
    id: station.uid.toString(),
    name: station.station.name,
    latitude: station.station.geo[0],
    longitude: station.station.geo[1],
  }));
};

// Helper functions for AQI categories & colors
const getAQICategory = (aqi: number): string => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "#00E400";
  if (aqi <= 100) return "#FFFF00";
  if (aqi <= 150) return "#FF7E00";
  if (aqi <= 200) return "#FF0000";
  if (aqi <= 300) return "#8F3F97";
  return "#7E0023";
};

const getHealthImplications = (aqi: number): string => {
  if (aqi <= 50) return "Air quality is satisfactory.";
  if (aqi <= 100) return "Air quality is acceptable.";
  if (aqi <= 150) return "Sensitive groups may experience health effects.";
  if (aqi <= 200) return "Everyone may experience health effects.";
  if (aqi <= 300) return "Health alert: serious risk.";
  return "Health warning: emergency conditions.";
};

// Function to fetch AQI for a selected station
const fetchAQIData = async (latitude: number, longitude: number) => {
  const url = `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "ok") {
    console.error("Failed to fetch AQI data:", data);
    return null;
  }
  const aqiValues:any = data.data.forecast?.daily?.pm25?.slice(0, 7).map((day: any) => day.avg) || [];
  if (aqiValues.length === 0) return null;
  
  const avgAQI = Math.round(aqiValues.reduce((sum: any, val: any)=>sum+val, 0)/aqiValues.length);
  return {
      value: avgAQI || 0,
      category: getAQICategory(avgAQI || 0),
      color: getAQIColor(avgAQI || 0),
      healthImplications: getHealthImplications(avgAQI || 0),
  }
};



export default function PropertyList() {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [selectedStation, setSelectedStation] = useState<any>(null);
  
  const [propertyPrice, setPropertyPrice] = useState<number>(5000000);
  const [aqiData, setAqiData] = useState<any>(null);

  // Fetch AQI stations
  const { data: stations = [] } = useQuery({
    queryKey: ["stations", selectedCity],
    queryFn: () => fetchAQIStations(selectedCity),
  });

  // Fetch AQI when a station is selected
  const handleStationSelect = async (station: any) => {
    setSelectedStation(station);
    const aqi = await fetchAQIData(station.latitude, station.longitude);
    setAqiData(aqi);
  };

  // Calculate adjusted price based on AQI
  const calculateAdjustedPrice = () => {
    if (!aqiData) return propertyPrice;
  
    const aqiImpactLevels = [
      { threshold: 50, priceReduction: 0 },
      { threshold: 100, priceReduction: 0.05 },
      { threshold: 150, priceReduction: 0.10 },
      { threshold: 200, priceReduction: 0.15 },
      { threshold: 300, priceReduction: 0.25 },
      { threshold: Infinity, priceReduction: 0.35 }
    ];
  
    const impactLevel = aqiImpactLevels.find(level => 
      aqiData.value <= level.threshold
    ) || { priceReduction: 0 }; // ✅ Prevents undefined error
  
    const baseReduction = impactLevel.priceReduction;
    const nonLinearFactor = Math.sqrt(aqiData.value / 50);
    const adjustedReduction = baseReduction * nonLinearFactor;
  
    const adjustedPrice = propertyPrice * (1 - adjustedReduction);
    const minPriceThreshold = propertyPrice * 0.6;
    
    return Math.round(Math.max(adjustedPrice, minPriceThreshold));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">🏠 Property Value Adjuster</h2>

      {/* Select City */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">🏙️ Select a City:</label>
        <select
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedStation(null);
            setAqiData(null);
          }}
        >
          {DEFAULT_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Select Station */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">📍 Select an AQI Station:</label>
        <select
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          value={selectedStation?.id || ""}
          onChange={(e) => {
            const station = stations.find((s: any) => s.id === e.target.value);
            handleStationSelect(station);
          }}
          disabled={stations.length === 0}
        >
          <option value="" disabled>Select a station</option>
          {stations.map((station: any) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {/* Property Inputs */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold text-lg mb-2">🏡 Enter Property Price:</label>
        <label className="block text-gray-700 font-semibold text-lg mb-2">🏡 Enter Property Price:</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-50 text-lg font-semibold shadow-sm"
          placeholder="Property Price (₹)"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(Number(e.target.value))}
        />
      </div>

      {/* AQI Info & Adjusted Price */}
      {aqiData && (
        <div className="p-4 rounded-lg shadow-lg bg-gray-100">
          <h3 className="text-xl font-bold">🌫️ AQI at {selectedStation.name}: {aqiData.value}</h3>
          <p className="text-md text-gray-700" style={{ color: aqiData.color }}>{aqiData.category}</p>
          <p className="text-sm text-gray-600">{aqiData.healthImplications}</p>
        </div>
      )}

      <h3 className="mt-6 text-xl font-bold text-gray-900">💰 Adjusted Property Price: ₹{calculateAdjustedPrice().toLocaleString()}</h3>
    </div>
  );
}


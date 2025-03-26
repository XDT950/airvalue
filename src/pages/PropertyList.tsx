import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import PropertyCard from "../components/PropertyCard";
import { Property, AQIData } from "../types";

const API_KEY = "9bd1c327b0c64ebb1e7e8a3f3bc8e9f13c315c09"; // Replace with your WAQI API Key

const DEFAULT_CITIES = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"];

// Function to fetch AQI data dynamically based on city
const fetchAQIData = async (city: string): Promise<Record<string, AQIData>> => {
  const url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${city}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "ok") {
    console.error("Failed to fetch AQI data:", data);
    return {};
  }

  const aqiData: Record<string, AQIData> = {};
  
  // Store AQI data for each station in the city
  data.data.slice(0, 6).forEach((station: any, index: number) => {
    aqiData[index.toString()] = {
      value: station.aqi,
      category: getAQICategory(station.aqi),
      color: getAQIColor(station.aqi),
      healthImplications: getHealthImplications(station.aqi),
    };
  });

  return aqiData;
};

// Function to fetch properties dynamically
const fetchProperties = async (city: string): Promise<Property[]> => {
  const url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${city}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "ok") {
    console.error("Failed to fetch AQI stations:", data);
    return [];
  }

  return data.data.slice(0, 6).map((station: any, index: number) => ({
    id: index.toString(),
    address: station.station.name,
    price: 15000000 - index * 500000, // Vary price per area
    sqft: 1000 + index * 100, // Different sizes
    type: "apartment",
    latitude: station.lat,
    longitude: station.lon,
  }));
};

// Helper functions for AQI category, color, and health effects
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

export default function PropertyList() {
  const [selectedCity, setSelectedCity] = useState("Delhi");

  const { data: properties = [] } = useQuery({
    queryKey: ["properties", selectedCity],
    queryFn: () => fetchProperties(selectedCity),
  });

  const { data: aqiData = {} } = useQuery({
    queryKey: ["aqi", selectedCity],
    queryFn: () => fetchAQIData(selectedCity),
  });

  const calculateAdjustedPrice = (property: Property, aqi: AQIData) => {
    const aqiImpact = Math.max(0, (aqi.value - 50) / 200);
    return property.price * (1 - aqiImpact);
  };

  return (
    <div>
      {/* City selection dropdown */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Property Listings</h1>
        <select
          className="border rounded-lg p-2"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {DEFAULT_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Last Updated */}
      <p className="text-sm text-gray-600 mt-2">
        Last updated: {format(new Date(), "PPP")}
      </p>

      {/* Property List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <PropertyCard
            key={property.id}
            property={property}
            aqiData={aqiData[index.toString()]}
            adjustedPrice={calculateAdjustedPrice(property, aqiData[index.toString()] || { value: 50 })}
          />
        ))}
      </div>
    </div>
  );
}


// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { format } from "date-fns";
// import PropertyCard from "../components/PropertyCard";
// import { Property, AQIData } from "../types";

// const API_KEY = "9bd1c327b0c64ebb1e7e8a3f3bc8e9f13c315c09"; // Replace with your WAQI API Key

// const CITIES = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad"];

// // Fetch properties dynamically (example locations for now)
// const fetchProperties = async (city: string): Promise<Property[]> => {
//   return [
//     {
//       id: "1",
//       address: `Downtown ${city}`,
//       price: 15000000,
//       sqft: 1200,
//       type: "apartment",
//       latitude: 28.7041,
//       longitude: 77.1025
//     },
//     {
//       id: "2",
//       address: `Suburban ${city}`,
//       price: 10000000,
//       sqft: 1000,
//       type: "house",
//       latitude: 28.5355,
//       longitude: 77.3910
//     }
//   ];
// };

// // Fetch AQI data for a city using station-wise API
// const fetchAQIData = async (city: string): Promise<Record<string, AQIData>> => {
//   const url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${city}`;
//   const response = await fetch(url);
//   const data = await response.json();

//   if (data.status !== "ok") {
//     console.error("Failed to fetch AQI data:", data);
//     return {};
//   }

//   const aqiData: Record<string, AQIData> = {};

//   // Map station data to properties
//   data.data.forEach((station: any, index: number) => {
//     aqiData[index.toString()] = {
//       value: station.aqi,
//       category: getAQICategory(station.aqi),
//       color: getAQIColor(station.aqi),
//       healthImplications: getHealthImplications(station.aqi)
//     };
//   });

//   return aqiData;
// };

// // AQI Helper functions
// const getAQICategory = (aqi: number): string => {
//   if (aqi <= 50) return "Good";
//   if (aqi <= 100) return "Moderate";
//   if (aqi <= 150) return "Unhealthy for Sensitive Groups";
//   if (aqi <= 200) return "Unhealthy";
//   if (aqi <= 300) return "Very Unhealthy";
//   return "Hazardous";
// };

// const getAQIColor = (aqi: number): string => {
//   if (aqi <= 50) return "#00E400";
//   if (aqi <= 100) return "#FFFF00";
//   if (aqi <= 150) return "#FF7E00";
//   if (aqi <= 200) return "#FF0000";
//   if (aqi <= 300) return "#8F3F97";
//   return "#7E0023";
// };

// const getHealthImplications = (aqi: number): string => {
//   if (aqi <= 50) return "Air quality is satisfactory.";
//   if (aqi <= 100) return "Air quality is acceptable.";
//   if (aqi <= 150) return "Sensitive groups may experience health effects.";
//   if (aqi <= 200) return "Everyone may experience health effects.";
//   if (aqi <= 300) return "Health alert: serious risk.";
//   return "Health warning: emergency conditions.";
// };

// export default function PropertyList() {
//   const [selectedCity, setSelectedCity] = useState("Delhi");

//   const { data: properties = [] } = useQuery({
//     queryKey: ["properties", selectedCity],
//     queryFn: () => fetchProperties(selectedCity),
//   });

//   const { data: aqiData = {} } = useQuery({
//     queryKey: ["aqi", selectedCity],
//     queryFn: () => fetchAQIData(selectedCity),
//   });

//   const calculateAdjustedPrice = (property: Property, aqi: AQIData) => {
//     const aqiImpact = Math.max(0, (aqi.value - 50) / 200);
//     return property.price * (1 - aqiImpact);
//   };

//   return (
//     <div>
//       {/* City selection dropdown */}
//       <div className="mb-8 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">Property Listings</h1>
//         <select
//           className="border rounded-lg p-2"
//           value={selectedCity}
//           onChange={(e) => setSelectedCity(e.target.value)}
//         >
//           {CITIES.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Last Updated */}
//       <p className="text-sm text-gray-600 mt-2">
//         Last updated: {format(new Date(), "PPP")}
//       </p>

//       {/* Property List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((property, index) => (
//           <PropertyCard
//             key={property.id}
//             property={property}
//             aqiData={aqiData[index.toString()]}
//             adjustedPrice={calculateAdjustedPrice(property, aqiData[index.toString()] || { value: 50 })}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }






// import { useQuery } from '@tanstack/react-query';
// import { Search } from 'lucide-react';
// import { format } from 'date-fns';
// import { z } from 'zod';
// import PropertyCard from '../components/PropertyCard';
// import { Property, AQIData } from '../types';

// // Validation schema for API responses
// const propertySchema = z.array(z.object({
//   id: z.string(),
//   address: z.string(),
//   price: z.number(),
//   sqft: z.number(),
//   type: z.enum(['apartment', 'house', 'commercial']),
//   latitude: z.number(),
//   longitude: z.number(),
// }));

// const aqiDataSchema = z.record(z.object({
//   value: z.number(),
//   category: z.string(),
//   color: z.string(),
//   healthImplications: z.string(),
// }));

// // Simulated API calls - in a real app, these would hit actual endpoints
// const fetchProperties = async (): Promise<Property[]> => {
//   // Simulated data
//   const response = [
//     {
//       id: '1',
//       address: 'Green Park, New Delhi',
//       price: 15000000,
//       sqft: 1200,
//       type: 'apartment',
//       latitude: 28.5589,
//       longitude: 77.2373
//     },
//     {
//       id: '2',
//       address: 'Vasant Kunj, New Delhi',
//       price: 25000000,
//       sqft: 2000,
//       type: 'house',
//       latitude: 28.5200,
//       longitude: 77.1600
//     }
//   ];
  
//   // Validate response
//   return propertySchema.parse(response);
// };

// const fetchAQIData = async (): Promise<Record<string, AQIData>> => {
//   // Simulated data
//   const response = {
//     '1': {
//       value: 156,
//       category: 'Unhealthy',
//       color: '#FF5252',
//       healthImplications: 'May cause breathing discomfort to people with lung disease'
//     },
//     '2': {
//       value: 92,
//       category: 'Moderate',
//       color: '#FFA726',
//       healthImplications: 'May cause breathing discomfort to sensitive people'
//     }
//   };

//   // Validate response
//   return aqiDataSchema.parse(response);
// };

// export default function PropertyList() {
//   const { data: properties = [] } = useQuery({
//     queryKey: ['properties'],
//     queryFn: fetchProperties
//   });

//   const { data: aqiData = {} } = useQuery({
//     queryKey: ['aqi'],
//     queryFn: fetchAQIData
//   });

//   const calculateAdjustedPrice = (property: Property, aqi: AQIData) => {
//     // Simple price adjustment based on AQI
//     const aqiImpact = Math.max(0, (aqi.value - 50) / 200);
//     return property.price * (1 - aqiImpact);
//   };

//   return (
//     <div>
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-900">Property Listings</h1>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search properties..."
//               className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>
//         </div>
//         <p className="text-sm text-gray-600 mt-2">
//           Last updated: {format(new Date(), 'PPP')}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((property) => (
//           <PropertyCard
//             key={property.id}
//             property={property}
//             aqiData={aqiData[property.id]}
//             adjustedPrice={calculateAdjustedPrice(property, aqiData[property.id])}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
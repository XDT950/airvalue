import { Property, AQIData } from "../types"; // Ensure this file exists and has the correct types

interface PropertyCardProps {
  property: Property;
  aqiData?: AQIData; // Make optional in case of missing data
  adjustedPrice: number;
}


export default function PropertyCard({ property, aqiData, adjustedPrice }: PropertyCardProps) {
  if (!aqiData) return <div className="text-gray-500">Loading AQI data...</div>; // Avoid crash

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{property.address}</h3>
        <span className="px-2 py-1 rounded-md text-white" style={{ backgroundColor: aqiData?.color || "#ccc" }}>
          AQI: {aqiData?.value ?? "N/A"} ({aqiData?.category ?? "Unknown"})
        </span>
      </div>

      <p className="text-sm text-gray-600">{aqiData?.healthImplications ?? "Data not available"}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-sm text-gray-600">Original Price</p>
          <p className="text-lg font-semibold">₹{property.price.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">AQI Adjusted Price</p>
          <p className="text-lg font-semibold">₹{adjustedPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}


// import { Building2, Wind, AlertTriangle } from 'lucide-react';
// import { Property, AQIData } from '../types';

// interface PropertyCardProps {
//   property: Property;
//   aqiData: AQIData;
//   adjustedPrice: number;
// }

// export default function PropertyCard({ property, aqiData, adjustedPrice }: PropertyCardProps) {
//   const priceChange = adjustedPrice - property.price;
//   const percentChange = (priceChange / property.price) * 100;

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <Building2 className="h-6 w-6 text-blue-600" />
//           <h3 className="ml-2 text-lg font-semibold">{property.address}</h3>
//         </div>
//         <div className="flex items-center">
//           <Wind className="h-5 w-5 text-gray-600" />
//           <span className="ml-1 text-sm font-medium" style={{ color: aqiData.color }}>
//             AQI: {aqiData.value}
//           </span>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <p className="text-sm text-gray-600">Original Price</p>
//           <p className="text-lg font-semibold">₹{property.price.toLocaleString()}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-600">AQI Adjusted Price</p>
//           <p className="text-lg font-semibold">₹{adjustedPrice.toLocaleString()}</p>
//         </div>
//       </div>

//       <div className="border-t pt-4">
//         <div className="flex items-center">
//           <AlertTriangle className="h-5 w-5 text-yellow-500" />
//           <p className="ml-2 text-sm">
//             Price adjustment: {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}%
//           </p>
//         </div>
//         <p className="mt-2 text-sm text-gray-600">{aqiData.healthImplications}</p>
//       </div>
//     </div>
//   );
// }
// import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Property, AQIData } from '../types';

// interface AQIMapProps {
//   properties: Property[];
//   aqiData: Record<string, AQIData>;
// }

// export default function AQIMap({ properties, aqiData }: AQIMapProps) {
//   const center = { lat: 28.6139, lng: 77.2090 }; // Delhi coordinates

//   return (
//     <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
//       <MapContainer
//         center={[center.lat, center.lng]}
//         zoom={12}
//         className="h-full w-full"
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
        
//         {properties.map((property) => {
//           const aqi = aqiData[property.id];
//           return (
//             <Circle
//               key={property.id}
//               center={[property.latitude, property.longitude]}
//               radius={500}
//               pathOptions={{
//                 color: aqi.color,
//                 fillColor: aqi.color,
//                 fillOpacity: 0.4
//               }}
//             >
//               <Popup>
//                 <div className="p-2">
//                   <h3 className="font-semibold">{property.address}</h3>
//                   <p>AQI: {aqi.value}</p>
//                   <p>Category: {aqi.category}</p>
//                 </div>
//               </Popup>
//             </Circle>
//           );
//         })}
//       </MapContainer>
//     </div>
//   );
// }

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface AQIMapProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

function LocationMarker({ onLocationSelect }: AQIMapProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function AQIMap({ onLocationSelect }: AQIMapProps) {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-64 w-full rounded-md">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}
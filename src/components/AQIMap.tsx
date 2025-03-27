import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Define Property Type
interface AQIStation {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  aqi: number;
}

// Define Props Type
interface AQIMapProps {
  properties: AQIStation[];
}

export default function AQIMap({ properties }: AQIMapProps) {
  if (properties.length === 0) return <p className="text-center">No AQI data available.</p>;

  // Ensure at least one valid AQI station exists
  const validProperties = properties.filter(
    (station) => station.latitude !== undefined && station.longitude !== undefined && !isNaN(station.aqi)
  );

  if (validProperties.length === 0) {
    return <p className="text-center text-red-500">No valid AQI data available.</p>;
  }

  // Center the map on the first valid station
  const center: [number, number] = [validProperties[0].latitude, validProperties[0].longitude];

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={center} zoom={11} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {validProperties.map((station: AQIStation) => (
          <Circle
            key={station.id}
            center={[station.latitude, station.longitude]}
            radius={650} // Scale size
            pathOptions={{
              color: getAQIColor(station.aqi),
              fillColor: getAQIColor(station.aqi),
              fillOpacity: 0.6,
            }}
          >
            <Popup>
              <h3 className="font-semibold">{station.address}</h3>
              <p>AQI: {station.aqi}</p>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}

// Function to determine AQI color
const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "#00E400"; // Green (Good)
  if (aqi <= 100) return "#FFFF00"; // Yellow (Moderate)
  if (aqi <= 150) return "#FF7E00"; // Orange (Unhealthy for Sensitive)
  if (aqi <= 200) return "#FF0000"; // Red (Unhealthy)
  if (aqi <= 300) return "#8F3F97"; // Purple (Very Unhealthy)
  return "#7E0023"; // Maroon (Hazardous)
};
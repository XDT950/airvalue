

import { useQuery } from '@tanstack/react-query';
import AQIMap from '../components/AQIMap';
import { Property, AQIData } from '../types';

export default function AQIHeatmap() {
  const { data: properties = [] } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: () => Promise.resolve([
      {
        id: '1',
        address: 'Green Park, New Delhi',
        price: 15000000,
        sqft: 1200,
        type: 'apartment',
        latitude: 28.5589,
        longitude: 77.2373
      },
      {
        id: '2',
        address: 'Vasant Kunj, New Delhi',
        price: 25000000,
        sqft: 2000,
        type: 'house',
        // latitude: 28.5200,
        longitude: 77.1600
      }
    ])
  });

  const { data: aqiData = {} } = useQuery<Record<string, AQIData>>({
    queryKey: ['aqi'],
    queryFn: () => Promise.resolve({
      '1': {
        value: 156,
        category: 'Unhealthy',
        color: '#FF5252',
        healthImplications: 'May cause breathing discomfort to people with lung disease'
      },
      '2': {
        value: 92,
        category: 'Moderate',
        color: '#FFA726',
        healthImplications: 'May cause breathing discomfort to sensitive people'
      }
    })
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">AQI Heatmap</h1>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <AQIMap properties={properties} aqiData={aqiData} />
      </div>
    </div>
  );
}


export interface Property {
  id: string;
  address: string;
  price: number;
  sqft: number;
  type: 'apartment' | 'house' | 'commercial';
  latitude: number;
  longitude: number;
}

export interface AQIData {
  value: number;
  category: string;
  color: string;
  healthImplications: string;
}

export interface HealthRiskScore {
  score: number;
  annualCost: number;
  recommendations: string[];
}
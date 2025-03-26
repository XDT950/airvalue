import { MapPin, Calculator, HeartPulse } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Property Health Risk & Value Intelligence Platform
      </h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-700 mb-10 text-center text-xl">
          Transforming Real Estate Decisions Through Health and Environmental Analytics
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <Calculator className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Adjusted Property Valuation</h3>
            <p className="text-gray-600">
              Dynamic property value calculation incorporating health risk and environmental factors
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <MapPin className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Cross-Area Comparison</h3>
            <p className="text-gray-600">
              Compare property values and health risks across different geographical regions
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <HeartPulse className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Family Health Risk Assessment</h3>
            <p className="text-gray-600">
              Comprehensive health risk evaluation for families based on local environmental conditions
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="list-disc list-inside space-y-2">
              <li>Real-time AQI data integration</li>
              <li>Health cost impact calculation</li>
              <li>Geographical property value mapping</li>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li>Interactive environmental heat maps</li>
              <li>Predictive health risk modeling</li>
              <li>Comprehensive property valuation reports</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Empower real estate stakeholders with data-driven insights that bridge environmental health, property valuation, and family well-being.
          </p>
        </div>
      </div>
    </div>
  );
}
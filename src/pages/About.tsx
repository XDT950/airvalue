import { Shield, Target, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About AQI Property Valuator</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-8">
          AQI Property Valuator is an innovative platform that helps real estate stakeholders make informed decisions by considering air quality impacts on property values and health risks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
            <p className="text-gray-600">
              Leverage real-time AQI data to make informed property investment decisions
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Target className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Health Impact Analysis</h3>
            <p className="text-gray-600">
              Understand potential health risks and associated costs in different areas
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Zap className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Visualization</h3>
            <p className="text-gray-600">
              Explore AQI patterns through intuitive heatmaps and property overlays
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-8">
          We aim to revolutionize how environmental factors are considered in real estate valuation, promoting healthier living spaces and informed decision-making for all stakeholders.
        </p>

        <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
        <ul className="list-disc list-inside text-gray-600 mb-8">
          <li>React with TypeScript for robust frontend development</li>
          <li>Real-time AQI data integration</li>
          <li>Interactive mapping with Leaflet</li>
          <li>Advanced data visualization with Chart.js</li>
          <li>Responsive design with Tailwind CSS</li>
        </ul>
      </div>
    </div>
  );
}
import { Gauge, Globe, Stethoscope, HomeIcon, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/about" className="flex items-center">
              <HomeIcon className="h-6 w-6 text-blue-600" />
              <span className="ml-2 font-semibold text-xl text-gray-700">About</span>
            </Link>
          </div>
          
          <div className="flex space-x-8">
            <Link to="/map" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Globe className="h-5 w-5" />
              <span className="ml-1">Heat Map</span>
            </Link>
            <Link to="/health" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Stethoscope className="h-5 w-5" />
              <span className="ml-1">Health Risk</span>
            </Link>
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <Gauge className="h-5 w-5" />
              <span className="ml-1">AQI Valuator</span>
            </Link>
            <Link to="/news" className="flex items-center text-gray-700 hover:text-blue-600">
              <Newspaper className="h-5 w-5" />
              <span className="ml-1">News</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
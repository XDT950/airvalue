import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Leaf, Shield, Zap } from 'lucide-react';
import Navbar from './components/Navbar';
import PropertyList from './pages/PropertyList';
import AQIHeatmap from './pages/AQIHeatmap';
import HealthAssessment from './pages/HealthAssessment';
import News from "./pages/News"; // ✅ Import News page
import About from './pages/About';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 text-gray-900 antialiased">
          <Navbar />
          
          <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-cyan-100 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
              <div className="p-6 sm:p-10">
                <Routes>
                  <Route path="/" element={<PropertyList />} />
                  <Route path="/map" element={<AQIHeatmap />} />
                  <Route path="/health" element={<HealthAssessment />} />
                  <Route path="/news" element={<News />} /> {/* ✅ Add News Route */}
                  <Route path="/about" element={<About />} />
                </Routes>
              </div>
            </div>
          </main>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-cyan-50 p-6 rounded-2xl flex items-center space-x-4 shadow-lg hover:shadow-xl transition-all">
                <Leaf className="h-12 w-12 text-cyan-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Environmental Insights</h3>
                  <p className="text-sm text-gray-600">Real-time air quality tracking</p>
                </div>
              </div>
              <div className="bg-teal-50 p-6 rounded-2xl flex items-center space-x-4 shadow-lg hover:shadow-xl transition-all">
                <Shield className="h-12 w-12 text-teal-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Health Protection</h3>
                  <p className="text-sm text-gray-600">Personalized risk assessment</p>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl flex items-center space-x-4 shadow-lg hover:shadow-xl transition-all">
                <Zap className="h-12 w-12 text-blue-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Smart Analytics</h3>
                  <p className="text-sm text-gray-600">Advanced property valuation</p>
                </div>
              </div>
            </div>
          </div>

          <footer className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Property Health Intelligence</h2>
              <p className="text-sm opacity-80 max-w-2xl mx-auto">
                Empowering informed decisions through comprehensive environmental and health data analysis
              </p>
            </div>
          </footer>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
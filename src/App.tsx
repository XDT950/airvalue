import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from './components/Navbar';
import PropertyList from './pages/PropertyList';
import AQIHeatmap from './pages/AQIHeatmap';
import HealthAssessment from './pages/HealthAssessment';
import About from './pages/About';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-200 transition-all duration-300">
          {/* 🌍 Global Navigation */}
          <Navbar />

          {/* 🏠 Main Content Area */}
          <main className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 mt-6">
            <div className="w-full max-w-6xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 md:p-10 transition-all duration-300">
              <Routes>
                <Route path="/" element={<PropertyList />} />
                <Route path="/map" element={<AQIHeatmap />} />
                <Route path="/health" element={<HealthAssessment />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </main>

          {/* 🌟 Footer */}
          <footer className="w-full py-6 mt-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center shadow-lg rounded-t-xl">
            <p className="text-lg font-semibold">© {new Date().getFullYear()} Air Quality & Property Evaluator</p>
            <p className="text-sm opacity-90">Designed for better living.</p>
          </footer>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

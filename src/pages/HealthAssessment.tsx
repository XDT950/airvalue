import HealthRiskCalculator from '../components/HealthRiskCalculator';

export default function HealthAssessment() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Health Risk Assessment</h1>
      <div className="max-w-2xl mx-auto">
        <HealthRiskCalculator />
      </div>
    </div>
  );
}
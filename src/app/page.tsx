'use client';

import CapexChart from './components/CapexChart';
import OpexChart from './components/OpexChart';
import CellCostChart from './components/CellCostChart';

export default function Home() {
  const cellCostReduction = 23;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        
        <CapexChart />
        <OpexChart />
        <CellCostChart cellCostReduction={cellCostReduction} />
      </div>
    </div>
  );
}
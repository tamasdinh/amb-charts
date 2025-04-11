import React, { Suspense } from 'react';
const ReactApexChart = React.lazy(() => import('react-apexcharts'));
import { ApexOptions } from 'apexcharts';

function App() {
  // Sample data for the first chart - Monthly Revenue by Product Category
  const chart1Options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
    },
    title: {
      text: 'Monthly Revenue by Product Category',
      align: 'left'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };

  const chart1Series = [
    {
      name: 'Electronics',
      data: [44, 55, 41, 67, 22, 43]
    },
    {
      name: 'Clothing',
      data: [13, 23, 20, 8, 13, 27]
    },
    {
      name: 'Home & Garden',
      data: [11, 17, 15, 15, 21, 14]
    }
  ];

  const chart2Options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    title: {
      text: 'User Engagement Metrics',
      align: 'left'
    },
    xaxis: {
      categories: ['Mobile', 'Desktop', 'Tablet', 'Other'],
    },
    legend: {
      position: 'right',
      offsetY: 40
    }
  };

  const chart2Series = [
    {
      name: 'Active Users',
      data: [44, 55, 41, 67]
    },
    {
      name: 'New Signups',
      data: [13, 23, 20, 8]
    },
    {
      name: 'Returning Users',
      data: [11, 17, 15, 15]
    }
  ];

  const chart3Options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    title: {
      text: 'Sales Performance by Region',
      align: 'left'
    },
    xaxis: {
      categories: ['North', 'South', 'East', 'West', 'Central'],
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    }
  };

  const chart3Series = [
    {
      name: 'Q1',
      data: [44, 55, 41, 67, 22]
    },
    {
      name: 'Q2',
      data: [13, 23, 20, 8, 13]
    },
    {
      name: 'Q3',
      data: [11, 17, 15, 15, 21]
    },
    {
      name: 'Q4',
      data: [21, 7, 25, 13, 22]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        
        <Suspense fallback={<div className="bg-white rounded-lg shadow p-6">Loading chart...</div>}>
          <div className="bg-white rounded-lg shadow p-6">
            <ReactApexChart
              options={chart1Options}
              series={chart1Series}
              type="bar"
              height={350}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <ReactApexChart
              options={chart2Options}
              series={chart2Series}
              type="bar"
              height={350}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <ReactApexChart
              options={chart3Options}
              series={chart3Series}
              type="bar"
              height={350}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
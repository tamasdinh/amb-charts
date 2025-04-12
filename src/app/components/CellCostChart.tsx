import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { colors } from '../styles/colors';
import { GeistSans } from 'geist/font/sans';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow p-6">Loading chart...</div>
});

interface Props {
  cellCostReduction: number;
}

const chartData = [{
  name: 'Cell Cost',
  data: [71.86, 66.91]
}];

export default function CellCostChart({ cellCostReduction }: Props) {
  const chartOptions: ApexOptions = {
    colors: [colors.ionBlue],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true
      },
      fontFamily: GeistSans.style.fontFamily
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 6,
        dataLabels: {
          position: 'top'
        }
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
        }
      }
    },
    title: {
      text: 'Cell Cost',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600,
        color: colors.slurryBlack
      }
    },
    subtitle: {
      text: 'Specific Cell Cost ($/kWh)',
      align: 'left',
      style: {
        fontSize: '14px',
        color: '#6B7280'
      }
    },
    xaxis: {
      categories: ['Slurry', 'Dry'],
      labels: {
        style: {
          fontSize: '14px',
          colors: colors.slurryBlack
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return '$' + value + '/kWh';
        },
        style: {
          colors: colors.cathodeOrange
        }
      },
      title: {
        text: undefined
      },
      max: 100
    },
    legend: {
      show: false
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: true,
      formatter: function(val: number) {
        return '$' + val.toFixed(0) + '/kWh';
      },
      offsetY: -20,
      style: {
        fontSize: '13px',
        colors: [colors.slurryBlack],
        fontWeight: 500
      }
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return '$' + value + '/kWh';
        }
      },
      theme: 'dark'
    },
    annotations: {
      yaxis: [{
        y: 85,
        borderColor: colors.slurryBlack,
        label: {
          text: `${cellCostReduction}% reduction`,
          position: 'left',
          borderColor: 'transparent',
          style: {
            background: colors.slurryBlack,
            color: '#fff',
            padding: {
              left: 10,
              right: 10,
              top: 5,
              bottom: 5
            },
            fontSize: '12px',
            fontWeight: 500
          }
        }
      }]
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={350}
      />
    </div>
  );
}
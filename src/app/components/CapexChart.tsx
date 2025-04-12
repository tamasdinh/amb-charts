import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { colors } from '../styles/colors';
import { GeistSans } from 'geist/font/sans';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow p-6">Loading chart...</div>
});

const chartData = [
  {
    name: 'Mixing & slurry prep',
    data: [3.5, 1.7425]
  },
  {
    name: 'Coating & drying',
    data: [7.7, 4.59]
  },
  {
    name: 'Calendering',
    data: [2.4, 4.8875]
  },
  {
    name: 'Slitting / notching',
    data: [1.7, 1.7]
  },
  {
    name: 'Vacuum drying',
    data: [1.9, 0]
  },
  {
    name: 'NMP solvent recovery',
    data: [3.6, 0]
  }
];

// Calculate the totals for slurry and dry
const slurryTotal = chartData.reduce((total, series) => total + series.data[0], 0);
const dryTotal = chartData.reduce((total, series) => total + series.data[1], 0);
// Set yaxis max to 125% of the higher total
const yaxisMax = Math.ceil(Math.max(slurryTotal, dryTotal) * 1.25);

export default function CapexChart() {
  const slurryTotal = chartData.reduce((total, series) => total + series.data[0], 0);
  const dryTotal = chartData.reduce((total, series) => total + series.data[1], 0);
  const percentDiff = ((slurryTotal - dryTotal) / slurryTotal * 100).toFixed(0);

  const chartOptions: ApexOptions = {
    colors: [colors.chargeWhite, colors.yellow, colors.orangeLight, colors.cathodeOrange, colors.ionBlue, colors.slurryBlack],
    chart: {
      type: 'bar',
      height: 450,
      stacked: true,
      toolbar: {
        show: false
      },
      fontFamily: GeistSans.style.fontFamily
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 0,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last'
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    title: {
      text: 'CAPEX Comparison',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600,
        color: colors.slurryBlack
      }
    },
    subtitle: {
      text: 'Equipment CAPEX ($M/GWh)',
      align: 'left',
      style: {
        fontSize: '14px',
        color: '#6B7280'
      }
    },
    xaxis: {
      categories: ['Slurry Coating', 'Dry Coating'],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
        }
      }
    },
    yaxis: {
      min: 0,
      max: yaxisMax,
      tickAmount: 6,
      labels: {
        formatter: function(value) {
          return '$' + Math.round(value) + 'M';
        },
        style: {
          fontSize: '12px'
        }
      },
      title: {
        text: undefined
      }
    },
    legend: {
      position: 'right',
      offsetY: 80,
      fontSize: '13px',
      inverseOrder: true,
      itemMargin: {
        horizontal: 12,
        vertical: 5
      },
      markers: {
        strokeWidth: 0,
        size: 6,
        shape: 'circle',
        offsetX: -5
      }
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: true,
      formatter: function(val: number) {
        return val === 0 ? '' : '$' + val.toFixed(1);
      },
      style: {
        fontSize: '14px',
        colors: ['transparent']
      }
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return '$' + value.toFixed(2) + 'M/GWh';
        }
      }
    },
    annotations: {
      points: [{
        x: 'Slurry Coating',
        y: slurryTotal,
        marker: {
          size: 0,
          strokeWidth: 0
        },
        label: slurryTotal === 0 ? undefined : {
          text: '$' + slurryTotal.toFixed(1) + 'M/GWh',
          offsetY: -5,
          borderColor: '#FFFFFF',
          style: {
            fontSize: '14px',
            color: colors.slurryBlack,
            background: '#FFFFFF',
            fontWeight: 600,
            padding: {
              left: 8,
              right: 8,
              top: 4,
              bottom: 4
            }
          }
        }
      },
      {
        x: 'Dry Coating',
        y: dryTotal,
        marker: {
          size: 0,
          strokeWidth: 0
        },
        label: dryTotal === 0 ? undefined : {
          text: '$' + dryTotal.toFixed(1) + 'M/GWh',
          offsetY: -5,
          borderColor: '#FFFFFF',
          style: {
            fontSize: '14px',
            color: colors.slurryBlack,
            background: '#FFFFFF',
            fontWeight: 600,
            padding: {
              left: 8,
              right: 8,
              top: 4,
              bottom: 4
            }
          }
        }
      }],
      yaxis: [{
        y: yaxisMax,
        borderColor: 'transparent',
        label: {
          text: percentDiff + '% reduction',
          position: 'right',
          offsetX: -10,
          offsetY: -3,
          borderColor: 'transparent',
          style: {
            background: '#475569',
            color: '#fff',
            padding: {
              left: 10,
              right: 10,
              top: 5,
              bottom: 5
            },
            fontSize: '14px',
            fontWeight: 600
          }
        }
      }]
    },
    markers: {
      size: 0,
      strokeWidth: 0,
      colors: ['transparent'],
      strokeColors: ['transparent']
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={450}
      />
    </div>
  );
}
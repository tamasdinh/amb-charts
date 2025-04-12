import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { colors } from '../styles/colors';
import { geist } from '../layout';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow p-6">Loading chart...</div>
});

export default function CellCostChart() {

  const chartData = [{
    name: 'Cell Cost',
    data: [71.86, 66.91]
  }];

  const totalSlurry = chartData[0].data[0];
  const totalDry = chartData[0].data[1];
  const percentDiff = (((totalSlurry - totalDry) / totalSlurry) * 100).toFixed(0);
  const yaxisMax = Math.ceil(Math.max(totalSlurry, totalDry) * 1.3);

  const chartOptions: ApexOptions = {
    colors: [colors.cathodeOrange],
    chart: {
      type: 'bar',
      height: 520, // Adjusted for the container's padding
      toolbar: {
        show: true
      },
      fontFamily: 'Geist, sans-serif'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 0,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        }
      }
    },
    title: {
      text: 'Cell Cost',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600,
        fontFamily: geist.style.fontFamily,
        color: colors.powderBlack
      }
    },
    subtitle: {
      text: 'Specific Cell Cost ($/kWh)',
      align: 'left',
      style: {
        fontSize: '14px',
        color: colors.graphite
      }
    },
    xaxis: {
      categories: ['Slurry', 'Dry'],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: colors.powderBlack
        }
      }
    },
    yaxis: {
      min: 0,
      max: yaxisMax - (yaxisMax % 10),
      tickAmount: Math.floor(yaxisMax / 10),
      labels: {
        formatter: function (value) {
          return '$' + value + '/kWh';
        },
        style: {
          colors: colors.powderBlack
        }
      },
      title: {
        text: undefined
      },
    },
    legend: {
      show: false
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return '$' + value + '/kWh';
        }
      },
      theme: 'dark'
    },
    annotations: {
      points: [
        {
          x: 'Slurry',
          y: totalSlurry,
          marker: {
            size: 0,
            strokeWidth: 0
          },
          label: {
            text: '$' + totalSlurry.toFixed(1) + '/kWh',
            position: 'top',
            offsetY: -5,
            textAnchor: 'middle',
            borderColor: 'transparent',
            style: {
              fontSize: '14px',
              fontWeight: 600,
              color: colors.powderBlack,
              background: colors.cleanWhite,
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
          x: 'Dry',
          y: totalDry,
          marker: {
            size: 0,
            strokeWidth: 0
          },
          label: {
            text: '$' + totalDry.toFixed(1) + '/kWh',
            position: 'top',
            offsetY: -5,
            textAnchor: 'middle',
            borderColor: 'transparent',
            style: {
              fontSize: '14px',
              fontWeight: 600,
              color: colors.powderBlack,
              background: colors.cleanWhite,
              padding: {
                left: 8,
                right: 8,
                top: 4,
                bottom: 4
              }
            }
          }
        }
      ],
      yaxis: [{
        y: yaxisMax - (yaxisMax % 10),
        borderColor: 'transparent',
        label: {
          text: percentDiff + '% reduction',
          position: 'right',
          borderColor: 'transparent',
          offsetX: -10,
          offsetY: -12,
          style: {
            background: colors.powderBlack,
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
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6" style={{ width: '920px', height: '580px' }}>
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={520}
        width="100%"
      />
    </div>
  );
}
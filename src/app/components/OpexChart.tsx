import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { colors } from '../styles/colors';
import { GeistSans } from 'geist/font/sans';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow p-6">Loading chart...</div>
});

export default function OpexChart() {

  const chartData = [
    {
      name: 'Energy',
      data: [2.52, 0.81, 5.60, 3.89]
    },
    {
      name: 'Labor',
      data: [2.81, 2.12, 7.02, 6.34]
    },
    {
      name: 'Consumables',
      data: [0.26, 0, 0.26, 0]
    },
    {
      name: 'Cost of Capital',
      data: [2.54, 1.58, 7.32, 6.19]
    },
    {
      name: 'Real Estate',
      data: [0.50, 0.18, 1.44, 1.11]
    },
    {
      name: 'Overhead',
      data: [2.20, 1.19, 5.52, 4.47]
    }
  ];

  const totalSlurry = chartData.reduce((sum, item) => sum + item.data[2], 0);
  const totalDry = chartData.reduce((sum, item) => sum + item.data[3], 0);
  const percentDiff = (((totalSlurry - totalDry) / totalSlurry) * 100).toFixed(0);
  const yaxisMax = Math.ceil(Math.max(totalSlurry, totalDry) * 1.3);

  // Calculate column totals
  const totals = chartData[0].data.map((_, colIndex) =>
    chartData.reduce((sum, series) => sum + series.data[colIndex], 0)
  );

  const chartOptions: ApexOptions = {
    colors: [colors.slurryBlack, colors.ionBlue, colors.chargeWhite, colors.yellow, colors.orangeLight, colors.cathodeOrange],
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
      }
    },
    grid: {
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    title: {
      text: 'OPEX Comparison',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 600,
        color: colors.slurryBlack
      }
    },
    subtitle: {
      text: 'Operational Costs ($/kWh)',
      align: 'left',
      style: {
        fontSize: '14px',
        color: colors.subtitle
      }
    },
    xaxis: {
      categories: ['Slurry', 'Dry', 'Slurry (factory)', 'Dry (factory)'],
      group: {
        groups: [
          { title: 'Electrode manufacturing', cols: 2 },
          { title: 'Entire Factory', cols: 2 }
        ],
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: [colors.slurryBlack]
        }
      },
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      }
    },
    yaxis: {
      min: 0,
      max: yaxisMax - (yaxisMax % 5),
      tickAmount: Math.floor(yaxisMax / 5),
      labels: {
        formatter: (val: number) => '$' + Math.round(val) + '/kWh',
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
      offsetY: 40,
      fontSize: '13px',
      markers: {
        strokeWidth: 0,
        size: 6,
        shape: 'circle',
        offsetX: -5
      },
      itemMargin: {
        horizontal: 12,
        vertical: 5
      },
      inverseOrder: true
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val === 0 ? '' : '$' + val.toFixed(2),
      style: {
        fontSize: '14px',
        colors: ['transparent']
      }
    },
    tooltip: {
      shared: false,
      intersect: true,
      y: {
        formatter: (val: number) => '$' + val.toFixed(2) + '/kWh'
      }
    },
    annotations: {
      points: [
        ...totals.map((total, index) => ({
          x: ['Slurry', 'Dry', 'Slurry (factory)', 'Dry (factory)'][index],
          y: total,
          marker: { size: 0, strokeWidth: 0 },
          label: {
            text: '$' + total.toFixed(1) + '/kWh',
            position: 'top',
            offsetY: -5,
            textAnchor: 'middle',
            borderColor: 'transparent',
            style: {
              fontSize: '14px',
              fontWeight: 600,
              color: colors.slurryBlack,
              background: '#FFFFFF'
            }
          }
        }))
      ],
      yaxis: [{
        y: yaxisMax - (yaxisMax % 5),
        borderColor: 'transparent',
        label: {
          text: percentDiff + '% reduction',
          position: 'right',
          offsetX: -10,
          offsetY: -3,
          borderColor: 'transparent',
          style: {
            background: colors.annotation,
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
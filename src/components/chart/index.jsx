import Chart from 'react-apexcharts';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const options = {
  labels: ["Income", "Expense"],
  colors: ["#0000ff", "#FFA1A1"],
  chart: {
    width: "50px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#0000ff", "#FFA1A1"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    style: {
      fontSize: "12px",
      FontFamily: undefined,
      backgroundColor: "#000000",
    },
  },
};

export default function TransactionChartSummary() {
  const { totalIncome, totalExpense } = useContext(GlobalContext);

  return (
    <Chart
      options={options}
      series={[totalIncome, totalExpense]}
      type='pie'
      width={'100%'}
      height={'100%'}
    />
  );
}

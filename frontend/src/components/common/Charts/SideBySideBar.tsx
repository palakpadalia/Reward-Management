import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";


const TwoSidedBarChart = () => {
 const [series] = React.useState([
  {
   name: 'Members',
   data: [50, 80, 60, 40, 47]
  },
  {
   name: 'Average Transaction',
   data: [1000, 1200, 870, 640, 750]
  }
 ]);

 const [options] = React.useState<ApexOptions>({
    
  chart: {
   type: 'bar',
   height: 440,
//    stacked: true
  },
  colors: ['#008FFB', '#FF4560'],
  plotOptions: {
   bar: {
    borderRadius: 5,
    borderRadiusApplication: 'end',
    borderRadiusWhenStacked: 'all',
    horizontal: false,
    barHeight: '80%',
   },
  },
  dataLabels: {
   enabled: true,
//    position: 'top',
//    style: {
//     colors: ['#333']
//    },
//    formatter: (val: number) => `${val}`
   
  },
  stroke: {
   width: 1,
   colors: ["#fff"]
  },
  grid: {
   xaxis: {
    lines: {
     show: false
    }
   }
  },
  yaxis: {
   labels: {
    // Converting numeric values to string with "k"
    formatter: (value: number) => "₹ " + value.toString()
   }
  },
  tooltip: {
   shared: false,
   x: {
    formatter: (val: number) => val.toString()
   },
   y: {
    formatter: (val: number) => `₹ ${val / 1000}k`
   }
  },
  title: {
   text: 'Last Transactions'
  },
  xaxis: {
   categories: ['9-12 Months', '6-9 Months', '3-6 Months', '1-3 Months', '< 1 Month'],
   title: {
    text: 'String'
   },
   labels: {
    formatter: (val: string) => val.toString()
   }
  },
 });

 return (
  <div className="mt-5">
   <div id="chart">
    <ReactApexChart options={options} series={series} type="bar" height={440} />
   </div>
   <div id="html-dist"></div>
  </div>
 );
};

export default TwoSidedBarChart;

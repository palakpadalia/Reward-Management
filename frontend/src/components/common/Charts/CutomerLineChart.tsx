import React from "react";
import ReactApexChart from "react-apexcharts";

export class LineColumnChart extends React.Component {
 constructor(props) {
  super(props);

  this.state = {

   series: [{
    name: 'Accured:',
    type: 'column',
    data: [44, 50, 41, 67, 227, 41, 20, 35, 75, 32, 25, 16]
   }, {
    name: 'Redeemed',
    type: 'line',
    data: [23000, 42000, 35000, 27000, 43000, 22000, 17000, 31000, 22000, 22000, 12000, 16000]
   }
, {
    name: 'Revenue',
    type: 'line',
    data: [23000, 42000, 35000, 27000, 43000, 22000, 17000, 31000, 22000, 22000, 12000, 16000]
   }],
   options: {
    chart: {
     height: 350,
     type: 'line',
    },
    stroke: {
     width: [0, 4]
    },
    
    dataLabels: {
     enabled: true,
     enabledOnSeries: [1]
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yaxis: [{
     title: {
      text: 'Redeemed',
      color:'blue',
     },

    }, {
     opposite: true,
     title: {
      text: ''
     }
    }]
   },


  };
 }



 render() {
  return (
   <div className="mt-5">
    <div id="chart">
     <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
    </div>
    <div id="html-dist"></div>
   </div>
  );
 }
}
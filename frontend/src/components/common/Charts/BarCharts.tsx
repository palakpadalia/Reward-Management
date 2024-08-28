import React from "react";
import ReactApexChart from "react-apexcharts";

export class ApexChart extends React.Component {
 constructor(props) {
   super(props);

   this.state = {
   
     series: [{
       data: [4, 13, 24, 47, 54, 58, 69, 110, 120, 138, 245, 312]
     }],
     options: {
       chart: {
         type: 'bar',
         height: 350
       },
       plotOptions: {
         bar: {
           borderRadius: 4,
           borderRadiusApplication: 'end',
           vertical: true,
         }
       },
       dataLabels: {
         enabled: false
       },
       xaxis: {
         categories: props?.barChartLabels,
       }
     },
   
   
   };
 }



 render() {
   return (
     <div>
       <div id="chart">
         <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
       </div>
       <div id="html-dist"></div>
     </div>
   );
 }
}
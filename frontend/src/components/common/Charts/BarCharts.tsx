import React from "react";
import ReactApexChart from "react-apexcharts";

interface IProps {
  barChartLabels: string[];
}
interface IState {
    series?: any;
    options?: any;
  }

export class ApexChart extends React.Component<IProps, IState, any> {
 constructor(props: any) {
   super(props);

   this.state = {
   
     series: [{
       data: [124, 210, 54, 147, 264, 58, 69, 110, 120, 138, 245, 312]
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
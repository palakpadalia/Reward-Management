import React from "react";
import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

// Defining the type for the props
interface DonutChartProps {
 chartLabels: string[];
}

// Defining the type for state
interface DonutChartState {
 series: number[];
 options: ApexCharts.ApexOptions;
}


export class DonutChart extends Component<DonutChartProps, DonutChartState> {
 constructor(props: DonutChartProps) {
     super(props);
     this.state = {
         series: [18, 25, 24, 167],
         options: {
             labels: props.chartLabels,
             chart: {
                 events: {
                     mounted: (chart) => {
                         chart.windowResizeHandler();
                     }
                 },
                 height: 260,
                 type: 'donut',
             },
             dataLabels: {
                 enabled: false,
             },
             legend: {
                 show: false,
             },
             stroke: {
                 show: true,
                 curve: 'smooth',
                 lineCap: 'round',
                 colors: ["#000"],
                 width: 0,
                 dashArray: 0,
             },
             plotOptions: {
                 pie: {
                     expandOnClick: true,
                     donut: {
                         size: '82%',
                         labels: {
                             show: true,
                             name: {
                                 show: true,
                                 fontSize: '20px',
                                 color: '#495057',
                                 offsetY: -4,
                             },
                             value: {
                                 show: true,
                                 fontSize: '18px',
                                 color: undefined,
                                 offsetY: 8,
                             },
                             total: {
                                 show: true,
                                 label: 'Total',
                                 formatter: function (w) {
                                     return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                 }
                             }
                         }
                     }
                 }
             },
             colors: ["rgb(132, 90, 223)", "rgb(35, 183, 229)", "rgb(245, 184, 73)", "rgb(38, 191, 148)"],
         }
     };
 }

 render() {
     const labels = this.props.chartLabels;
     const colors = ["rgb(132, 90, 223)", "rgb(35, 183, 229)", "rgb(245, 184, 73)", "rgb(38, 191, 148)"];
     const counts = this.state.series;

     return (
         <div>
             <ReactApexChart options={this.state.options} series={this.state.series} type="donut" height={260} />
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                 {labels.map((label, index) => (
                     <div key={index} style={{ textAlign: 'center' }}>
                         <div style={{ backgroundColor: colors[index], padding: '10px', borderRadius: '5px', color: 'white' }}>
                             {label}
                         </div>
                         <div style={{ marginTop: '5px', fontSize: '18px', fontWeight: 'bold' }}>
                             {counts[index]}
                         </div>
                     </div>
                 ))}
             </div>
         </div>
     );
 }
}
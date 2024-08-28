import React from "react";
import { DonutChart } from "../Charts/DonutCharts";
import { ApexChart } from "../Charts/BarCharts";

const AcquisitionChart = () => {
  const chartLabels = ["Call Center", "Email", "Social", "Web"];
  const BarChartLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className="grid grid-cols-12 gap-4 mt-5">
      <div className="lg:col-span-4">
        <center className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0">Customer Acquisition</center>
        <div className="box-body overflow-hidden">
          <div className="leads-source-chart flex items-center justify-center relative">
            <DonutChart chartLabels={chartLabels} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <ApexChart barChartLabels={BarChartLabels} />
      </div>
    </div>
  );
};

export default AcquisitionChart;

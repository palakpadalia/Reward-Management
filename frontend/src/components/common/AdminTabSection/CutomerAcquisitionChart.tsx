
import React, { useState } from 'react';
import { DonutChart } from "../Charts/CutomerDonutCharts";
import EngagementChartSection from './CustomerEngagementChartSection';

const AcquisitionChart = () => {
    const [alignment, setAlignment] = useState('Customer Activity');
  const chartLabels = ["Basic", "Silver", "Gold", "Platinum"];

  return (
    <div className="grid grid-cols-12 gap-4 mt-5">
      <div className="lg:col-span-4">
        <center className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 text-start pl-2">Customer By Tiers</center>
        <div className="box-body overflow-hidden">
          <div className="leads-source-chart flex items-center justify-center relative">
            <DonutChart chartLabels={chartLabels} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
      <EngagementChartSection alignment={alignment} />
      </div>
    </div>
  );
};

export default AcquisitionChart;

import React from 'react';
import { LineColumnChart } from "../Charts/LineAndColumn"
import TwoSidedBarChart from '../Charts/SideBySideBar';

interface EngagementChartSectionProps {
  alignment: string;
}

const EngagementChartSection: React.FC<EngagementChartSectionProps> = ({ alignment }) => {
  return (
    <div>
     {alignment === "Customer Activity" && <LineColumnChart />}
     {alignment === "Customer Tenure" && <TwoSidedBarChart />}
    </div>
  );
};

export default EngagementChartSection;

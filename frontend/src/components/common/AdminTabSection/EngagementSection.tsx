import React, { useState } from 'react';
import ToggleButtonSection from './ToggleButtonSection';
import EngagementChartSection from './EngagementChartSection';

const EngagementSection = () => {
  const [alignment, setAlignment] = useState('Customer Activity');

  const handleAlignmentChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <ToggleButtonSection
        alignment={alignment}
        onAlignmentChange={handleAlignmentChange}
      />
      <EngagementChartSection alignment={alignment} />
    </div>
  );
};

export default EngagementSection;

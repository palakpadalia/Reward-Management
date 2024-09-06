import { useState } from 'react';
import { DonutChart } from "../Charts/CutomerDonutCharts";
import { LineColumnChart } from "../Charts/CutomerLineChart";
import CustomerAcquisitionSection from './CustomerAcquisition';
import SelectInputBar from '../../../components/common/AdminSelection/SelectInputBar';

// Example data, replace with actual logic if needed
const programOptions = [
  { value: 'program1', label: 'Program 1' },
  { value: 'program2', label: 'Program 2' },
];

const tierOptions = [
  { value: 'tier1', label: 'Tier 1' },
  { value: 'tier2', label: 'Tier 2' },
  // Add more options as needed
];

const durationOptions = [
  { value: '1year', label: '1 Year' },
  { value: '6months', label: '6 Months' },
  { value: '1month', label: '1 Month' },
];

const formFields = [
  { label: 'Program', name: 'program', id: 'program', options: programOptions, placeholder: 'Select Program' },
  { label: 'Tier Group', name: 'tier-group', id: 'tier-group', options: tierOptions, placeholder: 'Select Tier Group' },
  { label: 'Duration', name: 'duration', id: 'duration', options: durationOptions, placeholder: 'Select Duration' }
];

// Example data for different programs and tiers
const loyaltyProgramData = {
  program1: {
    tier1: { labels: ['Basic', 'Silver', 'Gold', 'Platinum'], series: [150, 300, 450, 200] },
    tier2: { labels: ['Standard', 'Premium', 'Elite', 'Platinum'], series: [100, 250, 350, 790] }
  },
  program2: {
    tier1: { labels: ['Basic', 'Silver', 'Gold', 'Platinum'], series: [200, 350, 400, 250] },
    tier2: { labels: ['Standard', 'Premium', 'Elite', 'Platinum'], series: [120, 270, 360, 800] }
  }
};

const customerAcquisitionData = {
  program1: {
    tier1: {
      pointAccrued: { value: '1.2M', percentageChange: '▲14.63%', changeColor: 'green' },
      pointRedeemed: { value: '36.3K', percentageChange: '▼14.5%', changeColor: 'red' },
      pointExpired: { value: '81K', percentageChange: '▲52%', changeColor: 'green' },
      pointBalance: { value: '72.1k', percentageChange: '', changeColor: 'blue' },
      revenueGrowth: { value: '735.2k', percentageChange: '▼18.64%', changeColor: 'red' }
    },
    tier2: {
      pointAccrued: { value: '1.5M', percentageChange: '▲20.5%', changeColor: 'green' },
      pointRedeemed: { value: '42.1K', percentageChange: '▼10.2%', changeColor: 'red' },
      pointExpired: { value: '90K', percentageChange: '▲45%', changeColor: 'green' },
      pointBalance: { value: '80.5k', percentageChange: '', changeColor: 'blue' },
      revenueGrowth: { value: '800.4k', percentageChange: '▼15.12%', changeColor: 'red' }
    }
  },
  program2: {
    tier1: {
      pointAccrued: { value: '1.3M', percentageChange: '▲18.5%', changeColor: 'green' },
      pointRedeemed: { value: '38.0K', percentageChange: '▼12.0%', changeColor: 'red' },
      pointExpired: { value: '85K', percentageChange: '▲55%', changeColor: 'green' },
      pointBalance: { value: '75.0k', percentageChange: '', changeColor: 'blue' },
      revenueGrowth: { value: '760.5k', percentageChange: '▼16.3%', changeColor: 'red' }
    },
    tier2: {
      pointAccrued: { value: '1.6M', percentageChange: '▲22.0%', changeColor: 'green' },
      pointRedeemed: { value: '45.0K', percentageChange: '▼9.5%', changeColor: 'red' },
      pointExpired: { value: '95K', percentageChange: '▲50%', changeColor: 'green' },
      pointBalance: { value: '85.0k', percentageChange: '', changeColor: 'blue' },
      revenueGrowth: { value: '820.3k', percentageChange: '▼13.8%', changeColor: 'red' }
    }
  }
};

const AcquisitionChart = () => {
  const [selectedProgram, setSelectedProgram] = useState('program1'); // Default program
  const [selectedTier, setSelectedTier] = useState('tier1'); // Default tier

  const seriesData = [
    { name: 'Accrued', type: 'column', data: [44, 50, 41, 67, 227, 41, 20, 35, 75, 32, 25, 16] },
    { name: 'Redeemed', type: 'line', data: [23000, 42000, 35000, 27000, 43000, 22000, 17000, 31000, 22000, 22000, 12000, 16000] },
    { name: 'Revenue', type: 'line', data: [23000, 42000, 35000, 27000, 43000, 22000, 17000, 31000, 22000, 22000, 12000, 16000] }
  ];
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const title = 'Monthly Data';
  const yAxisTitles = { primary: { text: 'Redeemed', color: 'blue' }, secondary: { text: '' } };

  // Extract the data based on the selected program and tier
  const chartData = loyaltyProgramData[selectedProgram]?.[selectedTier] || { labels: [], series: [] };
  const acquisitionData = customerAcquisitionData[selectedProgram]?.[selectedTier] || {};

  // Handle program and tier selection changes
  const handleProgramChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedProgram(selectedOption.value);
    }
  };

  const handleTierChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedTier(selectedOption.value);
    }
  };

  return (
    <div style={{ width: '100%', marginTop: '20px' }}>
      <div className="pb-5 grid md:grid-cols-3 gap-3">
        {formFields.map(field => (
          <SelectInputBar
            key={field.id}
            label={field.label}
            name={field.name}
            id={field.id}
            options={field.options}
            placeholder={field.placeholder}
            onChange={field.name === 'program' ? handleProgramChange : field.name === 'tier-group' ? handleTierChange : undefined}
          />
        ))}
      </div>
      <div style={{ borderColor: 'divider', backgroundColor: 'white' }}>
        <div className="p-3 flex flex-row justify-between">
          <span className='font-bold text-defaulttextcolor'>Customer Loyalty Program</span>
          <span className='font-bold text-defaulttextcolor'>Status: Active</span>
        </div>
      </div>
      
      <div className='p-2 bg-white'>
        <CustomerAcquisitionSection 
          pointAccrued={acquisitionData.pointAccrued}
          pointRedeemed={acquisitionData.pointRedeemed}
          pointExpired={acquisitionData.pointExpired}
          pointBalance={acquisitionData.pointBalance}
          revenueGrowth={acquisitionData.revenueGrowth}
        />
      </div>
      
      <div className="grid grid-cols-12 gap-4 bg-white">
        <div className="lg:col-span-4">
          <center className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 text-start pl-2">
            Customer By Tiers
          </center>
          <div className="box-body overflow-hidden">
            <div className="leads-source-chart flex items-center justify-center relative">
              <DonutChart chartLabels={chartData.labels} chartSeries={chartData.series} />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-8">
          <LineColumnChart series={seriesData} labels={labels} title={title} yAxisTitles={yAxisTitles} />
        </div>
      </div>
    </div>
  );
};

export default AcquisitionChart;

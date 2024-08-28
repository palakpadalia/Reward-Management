import React from 'react'
import ChartSection from "./AcquisitionChart";

const AcquisitionSection = () => {
 return (
  <>
   <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 8px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
   }}>
    {/* Customer Count/Trend */}
    <div>
     <div>New Customers</div>
     <div className='flex items-end gap-4'>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>234</div>
      <div style={{ color: 'green', fontSize: '1rem', paddingBottom: '4px' }}>▲23.63%</div>
     </div>
    </div>

    {/* New Customer with 0 Transaction */}
    <div>
     <div>New Customers with 0 Transactions</div>
     <div className='flex items-end gap-4'>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>104</div>
      <div style={{ color: 'red', fontSize: '1rem', paddingBottom: '4px' }}>▼44.44%</div>
     </div>
    </div>

    {/* New Customer with 1 Transaction */}
    <div>
     <div>New Customers with 1 Transactions</div>
     <div className='flex items-end gap-4'>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>130</div>
      <div style={{ color: 'green', fontSize: '1rem', paddingBottom: '4px' }}>▲55.55%</div>
     </div>
    </div>
   </div>
   <ChartSection />
  </>
 )
}

export default AcquisitionSection
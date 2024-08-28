import React from 'react'
import ChartSection from "./CutomerAcquisitionChart";

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
     <div>Point Accured</div>
     <div className='flex items-end gap-4'>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1.2M</div>
      <div style={{ color: 'red', fontSize: '1rem', paddingBottom: '4px' }}>▲14.63%</div>
     </div>
    </div>

    {/* New Customer with 0 Transaction */}
    <div>
     <div>Point Redeemed</div>
     <div className='flex items-end gap-4'>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>36.3K</div>
      <div style={{ color: 'red', fontSize: '1rem', paddingBottom: '4px' }}>▼14.5%</div>
     </div>
    </div>

    {/* New Customer with 1 Transaction */}
    <div>
     <div>Point Expired</div>
     <div className='flex items-end gap-4'>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>81K</div>
      <div style={{ color: 'green', fontSize: '1rem', paddingBottom: '4px' }}>▲52%</div>
     </div>
    </div>

    {/* New Customer with 1 Transaction */}
    <div>
     <div>Point Balance to Date</div>
     <div className='flex items-end gap-4'>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>72.1k</div>
      <div style={{ color: 'green', fontSize: '1rem', paddingBottom: '4px' }}></div>
     </div>
    </div>
    {/* New Customer with 1 Transaction */}
    <div>
     <div>Revenue Growth</div>
     <div className='flex items-end gap-4'>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>735.2k</div>
      <div style={{ color: 'red', fontSize: '1rem', paddingBottom: '4px' }}>▼18.64%</div>
      
     </div>
    </div>
   </div>
   <ChartSection />
  </>
 )
}

export default AcquisitionSection
import React from 'react'
import PerfactPicture from './PerfactPicture'
import CompleteOnBording from './CompleteOnBording'
import VirtualTryOnWithStudio from './VirtualTryOnWithStudio'
import DashboardHeader from './DashboardHeader'


function Dashboard() {
    return (
        <>     
        <DashboardHeader/>
        <div className='dashboard_content_container'>
        <div className='dashboard_content_row'>
              <PerfactPicture/>
              <VirtualTryOnWithStudio/>
            </div>

            <div className='dashboard_vartual_content_row'>
              <CompleteOnBording/>
               
            </div>
        </div>
        </>
    )
}

export default Dashboard

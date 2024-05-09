import React from 'react'
import PerfactPicture from './PerfactPicture'
import CompleteOnBording from './CompleteOnBording'
import VartualTryOnWithStudio from './VartualTryOnWithStudio'
import DashboardHeader from './DashboardHeader'


function Dashboard() {
    return (
        <>     
        <DashboardHeader/>
        <div className='dashboard_content_container'>
        <div className='dashboard_content_row'>
              <PerfactPicture/>
              <VartualTryOnWithStudio/>
            </div>

            <div className='dashboard_vartual_content_row'>
              <CompleteOnBording/>
               
            </div>
        </div>
        </>
    )
}

export default Dashboard

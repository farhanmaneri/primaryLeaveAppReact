import React from 'react'
import { useNavigate } from 'react-router'
import LeaveForm from '../form/LeaveForm'
import FireStore from '../FireStore'
import Puc from '../puc/Puc'

function Home() {
    const navigate = useNavigate();
  return (
    <>
    <div>

     <LeaveForm/>
     {/* <Puc/> */}
     {/* <FireStore/> */}

    </div>
     <div>

      <button onClick={()=>navigate('counter')}>Go to Counter</button>
      <button onClick={()=>navigate('puc')}>Print PUC</button>
     </div>
    </>
  )
}

export default Home

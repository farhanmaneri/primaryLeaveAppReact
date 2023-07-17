import React from 'react'
import { useNavigate } from 'react-router'
import LeaveForm from '../form/LeaveForm'
import FireStore from '../FireStore'

function Home() {
    const navigate = useNavigate()
  return (
    <>
    <div>

     <LeaveForm/>
     {/* <FireStore/> */}

    </div>
     <div>

      <button onClick={()=>navigate('counter')}>Go to Counter</button>
     </div>
    </>
  )
}

export default Home

import React from 'react'
import DataTable from '../dataTable/DataTable'
import LeaveForm from '../form/LeaveForm'
import './Puc.css'
import { useNavigate } from 'react-router'
export default function Puc() {
    const navigate = useNavigate()
    
  return (
    <>
    <div>
       <LeaveForm/>
      this is puc section
    </div>
    <button onClick={()=>navigate(-1)}>Go Back</button>
    </>

  )
}

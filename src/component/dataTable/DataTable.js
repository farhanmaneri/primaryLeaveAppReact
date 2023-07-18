import React from 'react';
import "./DataTable.css";

function DataTable({ dataArray }) {
    const handlePrint = ()=>{
        window.print()
    }
  return (
    <div className='tableContainer'>
      <h3>Data Table:</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>School/Station</th>
            <th>Leave Date</th>
            <th>Nature of Leave</th>
            <th>Tehsil</th>
            <th>S/Book <br></br> Attached</th>
            {/* Add more table headers for other fields */}
          </tr>
        </thead>
        <tbody>
          {dataArray.map((v , i) => (
            <tr key={i}>
              <td>{v.gender} {v.name} {v.desgination}</td>
              <td>{v.schoolStatus} {v.schoolName}</td>
              <td>{v.leaveFrom} To {v.leaveUpto} ({v.days})days {v.leaveType}</td>
              <td>{v.leaveNature}</td>
              <td>{v.tehsil}</td>
              <td>{v.serviceBook} </td>
              {/* Add more table cells for other fields */}
            </tr>
          ))}
        </tbody>
      </table>
      <button className='print_button' onClick={handlePrint}>Print</button>
    </div>
  );
}

export default DataTable;

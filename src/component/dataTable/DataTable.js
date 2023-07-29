import React from "react";
import "./DataTable.css";
import { useState } from "react";

function DataTable({ primaryTeachers,secondaryTeachers, date, handleDelete, handleEdit, showPrimary }) {

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedData, setEditedData] = useState({
    gender: "Ms.",
    name: "",
    desgination: "PST",
    schoolName: "",
    schoolStatus: "GGPS",
    leaveFrom: "",
    leaveUpto: "",
    leaveType: "On full Pay",
    leaveNature: "Earned Leave",
    tehsil: "Swabi",
    serviceBook: "Yes",
    days: "",
    // Add other fields here
  });

  

  // const handleEditClick = (index) => {
  //   console.log(index);
  //   const selectedData = dataArray[index];
  //   setEditedData({ ...selectedData });
  //   setEditingIndex(index);
  // };

  const handleDeleteClick = (cadre, date,id ) => {
    handleDelete(cadre, date,id);
  };
  

  const handleSaveEdit = () => {
    if (editingIndex !== -1) {
      handleEdit(editingIndex, editedData);
      setEditingIndex(-1);
    }
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
    
    {/* <button onClick={handleToggleCadre}>
      Show {showPrimary ? 'Secondary' : 'Primary'} Teachers
    </button> */}
    <div className="tableContainer">
      <h3>Data Table:</h3>
      {date}
      {showPrimary ?(
        <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>School/Station</th>
            <th>Leave Date</th>
            <th>Nature of Leave</th>
            <th>Tehsil</th>
            <th>
              S/Book <br></br> Attached
            </th>
            
            {/* Add more table headers for other fields */}
          </tr>
        </thead>
        <tbody>
          {primaryTeachers.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>
                {data.gender} {data.name} {data.desgination}
              </td>
              <td>
                {data.schoolStatus} {data.schoolName}
              </td>
              <td>
                {data.leaveFrom} To {data.leaveUpto} days ({data.days}) days {data.leaveType}
              </td>
              <td>{data.leaveNature}</td>
              <td>{data.tehsil}</td>
              <td>{data.serviceBook} </td>

              <td>
                {/* Edit and Delete buttons */}
                {editingIndex === index ? (
                  <>
                    <button onClick={() => handleSaveEdit()}>Save</button>
                    <button onClick={() => setEditingIndex(-1)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {/* <button onClick={() => handleEditClick(index)}>Edit</button> */}
                    <button onClick={() => handleDeleteClick(data.cadre,data.date, data.id )}>Delete</button>

                  </>
                )}
              </td>
              {/* Add more table cells for other fields */}
            </tr>
          ))}
        </tbody>
      </table>
        
      ):(
        <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>School/Station</th>
            <th>Leave Date</th>
            <th>Nature of Leave</th>
            <th>Tehsil</th>
            <th>
              S/Book <br></br> Attached
            </th>
            
            {/* Add more table headers for other fields */}
          </tr>
        </thead>
        <tbody>
          {secondaryTeachers.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>
                {data.gender} {data.name} {data.desgination}
              </td>
              <td>
                {data.schoolStatus} {data.schoolName}
              </td>
              <td>
                {data.leaveFrom} To {data.leaveUpto} days ({data.days}) days {data.leaveType}
              </td>
              <td>{data.leaveNature}</td>
              <td>{data.tehsil}</td>
              <td>{data.serviceBook} </td>

              <td>
                {/* Edit and Delete buttons */}
                {editingIndex === index ? (
                  <>
                    <button onClick={() => handleSaveEdit()}>Save</button>
                    <button onClick={() => setEditingIndex(-1)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {/* <button onClick={() => handleEditClick(index)}>Edit</button> */}
                    <button onClick={() => handleDeleteClick(data.cadre, data.date,data.id )}>Delete</button>

                  </>
                )}
              </td>
              {/* Add more table cells for other fields */}
            </tr>
          ))}
        </tbody>
      </table>
      )
    }
      
      <button className="print_button" onClick={handlePrint}>
        Print
      </button>
    </div>
    </>  
    );
}

export default DataTable;

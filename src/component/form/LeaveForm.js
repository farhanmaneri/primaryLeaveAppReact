import React, { useEffect, useState } from "react";
import "./LeaveForm.css";
import database from "../../config/firebase";
function LeaveForm() {
  // form state
  const [formData, setFormData] = useState({
    gender: "Ms.",
    name: "",
    desgination: "PST",
    schoolName: "",
    schoolStatus: "GGPS",
    leaveFrom: "",
    leaveUpto: "",
    leaveType: "With full Pay",
    leaveNature: "Earned Leave",
    tehsil: "",
    serviceBook: "Yes",
  });
  
  
  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // perform any necessary form submission logic
    console.log(formData);
    Push()
  };
  
  const [dataArray, setDataArray]= useState([]);
  const { name, gender, desgination, schoolName, schoolStatus, leaveFrom, leaveUpto, leaveType, leaveNature, tehsil, serviceBook } = formData;

  // handle form input changes
  const handleChange = (e) => {
    // setFormData({[e.target.name]: e.target.value})
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const Push = () => {
    let x = Math.floor(Math.random()*10000);
    const newData ={
      id: x,
      gender: formData.gender,
      name: formData.name,
      desgination: formData.desgination,
      schoolName:formData.schoolName,
      schoolStatus: formData.schoolStatus,
      leaveFrom: formData.leaveFrom,
      leaveUpto: formData.leaveUpto,
      leaveType: formData.leaveType,
      leaveNature: formData.leaveNature,
      tehsil: formData.tehsil,
      serviceBook: formData.serviceBook,
    };
    setDataArray((preDataArray)=>[...preDataArray, newData]);
    database.ref("/").child(`user/${x}`).set({
      newData
      
    }).catch(alert);
        };

        useEffect(()=>{
          const fetchData = async ()=>{
            const snapshot = await database.ref('/user').once('value');
            const fetchedData = snapshot.val();
            if(fetchedData){
              const dataArray = Object.entries(fetchedData).map(([key,value])=>({
                id: key,
                ...value.newData
              }));
              setDataArray(dataArray)
              // console.log(dataArray)
            }
            
          }
          fetchData();
        },[]);

  return (
    <>
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Gender:
            <select
              type="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Desgination:
            <select
              type="select"
              name="desgination"
              value={formData.desgination}
              onChange={handleChange}
            >
              <option value="PST">PST</option>
              <option value="SPST">SPST</option>
              <option value="PSHT">PSHT</option>
            </select>
          </label>
        </div>
        <br/>
        <div>
          <label>
            School/Station Name:
            <select
              type="select"
              name="schoolStatus"
              value={formData.schoolStatus}
              onChange={handleChange}
            >
              <option value="GGPS">GGPS</option>
              <option value="GGMS">GGMS</option>
              <option value="GGCMS">GGCMS</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="School Name"
            />
          </label>
        </div>
        <div>
          <br />
          <label>
            leaveFrom
            <input
              type="date"
              name="leaveFrom"
              value={formData.leaveFrom}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            leaveUpto:
            <input
              type="date"
              name="leaveUpto"
              value={formData.leaveUpto}
              onChange={handleChange}
            />
          </label>
        </div>

        <br />
        <div>
          <label>
            Nature of Leave:
            <select
              type="select"
              name="leaveNature"
              value={formData.leaveNature}
              onChange={handleChange}
            >
              <option value="Maternity (Pre-Natal)">
                Maternity (Pre-Natal)
              </option>
              <option value="Maternity (Post-Natal)">
                Maternity (Post-Natal)
              </option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Type of Leave:
            <select
              type="select"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
            >
              <option value="On full pay">On full pay</option>
              <option value="Without pay">Without pay</option>
              <option value="Half pay">Half pay</option>
            </select>
          </label>
        </div>
        <br />
        <div>
          <label>
            Tehsil:
            <select
              type="select"
              name="tehsil"
              value={formData.tehsil}
              onChange={handleChange}
            >
              <option value="Swabi">Swabi</option>
              <option value="Lahor">Lahor</option>
              <option value="Topi">Topi</option>
              <option value="Razzar">Razzar</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            S/Book Attached:
            <select
              type="select"
              name="serviceBook"
              value={formData.serviceBook}
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    <div>
        <h3>Data Table:</h3>
        <table>
          <thead>
            <tr>
              <th>Gender</th>
              <th>Name</th>
              <th>Designation</th>
              {/* Add more table headers for other fields */}
            </tr>
          </thead>
          <tbody>
            {dataArray.map((v,i) => (
              <tr key={i}>
                <td>{v.gender}</td>
                <td>{v.name}</td>
                <td>{v.desgination}</td>
                {/* Add more table cells for other fields */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </>
    
  );
}

export default LeaveForm;

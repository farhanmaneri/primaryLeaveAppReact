import React, { useEffect, useState } from "react";
import "./LeaveForm.css";
import database from "../../config/firebase";
import DataTable from "../dataTable/DataTable";
function LeaveForm() {
  
  // form state
  const [formData, setFormData] = useState({
    gender: "Ms.",
    name: "",
    designation: "PST",
    schoolName: "",
    schoolStatus: "GGPS",
    leaveFrom: "",
    leaveUpto: "",
    leaveType: "On full Pay",
    leaveNature: "Earned Leave",
    tehsil: "Swabi",
    serviceBook: "Yes",
    days: "",
  });

  const [cadre, setCadre] = useState('primary'); // Default to 'primary'

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // perform any necessary form submission logic
    // console.log(formData);
     // Determine the path based on the selected cadre
     const newData = {
      gender: formData.gender,
      name: formData.name,
      desgination: formData.designation,
      schoolName: formData.schoolName,
      schoolStatus: formData.schoolStatus,
      leaveFrom: formData.leaveFrom,
      leaveUpto: formData.leaveUpto,
      leaveType: formData.leaveType,
      leaveNature: formData.leaveNature,
      tehsil: formData.tehsil,
      serviceBook: formData.serviceBook,
      days: daysDifference || 0,   // it no date were enter it will give zero
    };
     const path = `/teachers/${cadre}`;

     // Push the teacher data to the database under the determined path
     database.ref(path).push(newData);
    //  setCadre('primary')

    setFormData({
      name: "",
      gender: "",
      designation: "",
      schoolName: "",
      schoolStatus: "",
      leaveFrom: "",
      leaveUpto: "",
      leaveType: "",
      leaveNature: "",
      tehsil: "",
      serviceBook: "",
      days: 0,
    });
  };
const [primaryTeachers, setPrimaryTeachers] = useState([]);
const [secondaryTeachers, setSecondaryTeachers] = useState([]);
  // const [dataArray, setDataArray] = useState([]);
  const { name,    gender,    desgination,    schoolName,  schoolStatus,    leaveFrom,    leaveUpto,    leaveType,
    leaveNature,
    tehsil,
    serviceBook,
  } = formData;

  // handle form input changes
  const handleChange = (e) => {
    // setFormData({[e.target.name]: e.target.value})
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //.................... for calcualtion of days............
  const fromDate = new Date(leaveFrom);
  const toDate = new Date(leaveUpto);
  const timeDifference = toDate.getTime() - fromDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  //..................... date formate change from yy.mm.dd to dd.mm.yy..............

 

  // const pushPrimaryTeacher = () => {
  //       const newData = {
  //     gender: formData.gender,
  //     name: formData.name,
  //     desgination: formData.desgination,
  //     schoolName: formData.schoolName,
  //     schoolStatus: formData.schoolStatus,
  //     leaveFrom: formData.leaveFrom,
  //     leaveUpto: formData.leaveUpto,
  //     leaveType: formData.leaveType,
  //     leaveNature: formData.leaveNature,
  //     tehsil: formData.tehsil,
  //     serviceBook: formData.serviceBook,
  //     days: daysDifference || 0,   // it no date were enter it will give zero
  //   };
  //   const newDatabaseRef = database.ref("/teachers/primary").push(); // Generates a new unique key
  //   const newId = newDatabaseRef.key; // Get the unique key

  //   newDatabaseRef
  //     .set(newData)
  //     .then(() => {
  //       // Add the generated unique key to the newData object
  //       newData.id = newId;
  //     })
  //     .catch(alert);
  // };
//   const pushSecondaryTeacher = () => {
//     const newData = {
//   gender: formData.gender,
//   name: formData.name,
//   desgination: formData.desgination,
//   schoolName: formData.schoolName,
//   schoolStatus: formData.schoolStatus,
//   leaveFrom: formData.leaveFrom,
//   leaveUpto: formData.leaveUpto,
//   leaveType: formData.leaveType,
//   leaveNature: formData.leaveNature,
//   tehsil: formData.tehsil,
//   serviceBook: formData.serviceBook,
//   days: daysDifference || 0,   // it no date were enter it will give zero
// };
// const newDatabaseRef = database.ref("/teachers/secondary").push(); // Generates a new unique key
// const newId = newDatabaseRef.key; // Get the unique key

// newDatabaseRef
//   .set(newData)
//   .then(() => {
//     // Add the generated unique key to the newData object
//     newData.id = newId;
//   })
//   .catch(alert);
// };



  useEffect(() => {
    const fetchPrimaryTeacher = async () => {
      try {
        // Attach an event listener to the 'value' event for the '/users' path
        database.ref("/teachers/primary").on("value", (snapshot) => {
          const fetchedData = snapshot.val();
          if (fetchedData) {
            const dataArray = Object.entries(fetchedData).map(
              ([id, value]) => ({
                id,
                cadre:'primary',
                ...value,
              })
            );

            setPrimaryTeachers(dataArray);
          }
          
        });
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPrimaryTeacher();
    // Clean up the event listener when the component unmounts to avoid memory leaks
    return () => {
      database.ref("/teachers/primary").off("value");
      // database.ref("/teachers/primary").off("value");
    };
    
  }, []);

  // fetching Secondary Teachers Data
  useEffect(() => {
    const fetchSecondaryTeacher = async () => {
      try {
        // Attach an event listener to the 'value' event for the '/users' path
        database.ref("/teachers/secondary").on("value", (snapshot) => {
          const fetchedData = snapshot.val();
          if (fetchedData) {
            const dataArray = Object.entries(fetchedData).map(
              ([id, value]) => ({
                id,
                cadre: 'secondary',
                ...value,
              })
            );
            setSecondaryTeachers(dataArray);
          }          
        });        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSecondaryTeacher();
    // Clean up the event listener when the component unmounts to avoid memory leaks
    return () => {
      database.ref("/teachers/Secondary").off("value");
    };
    
  }, []);


  const handleDelete = async (cadre,id) => {
    // console.log("id in form:", id)
    // console.log("cadre in form:", cadre)
    
    try {
      // Construct the path based on the cadre and the teacher's ID
      const path = `/teachers/${cadre}/${id}`;

      // Remove the data from the database
      await database.ref(path).remove();

      // Update the local state by removing the item from the dataArray
      if (cadre === 'primary') {
        const newPrimaryTeachers = primaryTeachers.filter((teacher) => teacher.id !== id);
        setPrimaryTeachers(newPrimaryTeachers);
      } else if (cadre === 'secondary') {
        const newSecondaryTeachers = secondaryTeachers.filter((teacher) => teacher.id !== id);
        setSecondaryTeachers(newSecondaryTeachers);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const [showPrimary, setShowPrimary] = useState(true);
  const handleToggleCadre = (e) => {
    const selectedCadre = e.target.value;
    setCadre(selectedCadre)
    setShowPrimary((prevShowPrimary) => !prevShowPrimary);
    // console.log('working')
  };

  return (
    <>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
        <div className="inputSections">
          <div>
          <label>
          Cadre:
          <select className="upperSection" value={cadre}  onChange={handleToggleCadre}>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
          </select>
        </label>
          </div>
          <div>
            <label >
              Nature of Leave:
              <select
              className="upperSection"
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
          </div>
          <hr></hr>

          <div className="inputSections">
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
                  placeholder="Enter Name"
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
                  value={formData.designation}
                  onChange={handleChange}
                >
                  <option value="PST">PST</option>
                  <option value="SPST">SPST</option>
                  <option value="PSHT">PSHT</option>
                </select>
              </label>
            </div>
          </div>
          <div className="inputSections">
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
          </div>
          <div className="inputSections">
            <div>
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

         
                </div>
          <div className="inputSections">


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
          </div>
                </div>
          <div>
            <button className="submitBtn" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <DataTable
          primaryTeachers={primaryTeachers}
          // handleEdit={handleEdit}
          handleDelete={handleDelete}
          showPrimary={showPrimary}
          secondaryTeachers={secondaryTeachers}
        />
      </div>

      {/* Rest of the component code */}
      {/* <div>
        <h3>Data Table:</h3>
        <table>
          <thead>
            <tr>
              <th>Gender</th>
              <th>Name</th>
              <th>Designation</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((v,i) => (
              <tr key={i}>
                <td>{v.gender}</td>
                <td>{v.name}</td>
                <td>{v.desgination}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
}

export default LeaveForm;

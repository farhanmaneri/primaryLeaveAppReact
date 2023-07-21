import React, { useEffect, useState } from "react";
import "./LeaveForm.css";
import database from "../../config/firebase";
import DataTable from "../dataTable/DataTable";
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
    leaveType: "On full Pay",
    leaveNature: "Earned Leave",
    tehsil: "Swabi",
    serviceBook: "Yes",
    days: "",
  });

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // perform any necessary form submission logic
    console.log(formData);
    Push();
    setFormData({
      name: "",
      gender: "",
      desgination: "",
      schoolName: "",
      schoolStatus: "",
      leaveFrom: "",
      leaveUpto: "",
      leaveType: "",
      leaveNature: "",
      tehsil: "",
      serviceBook: "",
      day: 0,
    });
  };

  const [dataArray, setDataArray] = useState([]);
  const {
    name,
    gender,
    desgination,
    schoolName,
    schoolStatus,
    leaveFrom,
    leaveUpto,
    leaveType,
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

  // const formattedFromDate = fromDate.toLocaleDateString();
  //  console.log(formattedFromDate)
  // const formattedToDate = toDate.toLocaleDateString('');
  //  console.log(formattedToDate)

  // const handleDelete = (index) => {
  //   // Implement the delete logic here using the index as the key
  //   // For example, you can remove the item from the dataArray based on the index and update the database
  //   const newDataArray = [...dataArray];
  //   newDataArray.splice(index, 1);
  //   setDataArray(newDataArray);

  //   // Update the database here if needed
  // };
  const handleEdit = (index, updatedData) => {
    // Implement the edit logic here using the index and updated data
    // For example, you can update the item in the dataArray based on the index with the updatedData
    const newDataArray = [...dataArray];
    newDataArray[index] = updatedData;
    setDataArray(newDataArray);

    // Update the database here if needed
  };

  const Push = () => {
        const newData = {
      gender: formData.gender,
      name: formData.name,
      desgination: formData.desgination,
      schoolName: formData.schoolName,
      schoolStatus: formData.schoolStatus,
      leaveFrom: formData.leaveFrom,
      leaveUpto: formData.leaveUpto,
      leaveType: formData.leaveType,
      leaveNature: formData.leaveNature,
      tehsil: formData.tehsil,
      serviceBook: formData.serviceBook,
      days: daysDifference,
    };
    const newDatabaseRef = database.ref("/users").push(); // Generates a new unique key
    const newId = newDatabaseRef.key; // Get the unique key

    newDatabaseRef
      .set(newData)
      .then(() => {
        // Add the generated unique key to the newData object
        newData.id = newId;
      })
      .catch(alert);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Attach an event listener to the 'value' event for the '/users' path
        database.ref("/users").on("value", (snapshot) => {
          const fetchedData = snapshot.val();
          if (fetchedData) {
            const dataArray = Object.entries(fetchedData).map(
              ([id, value]) => ({
                id,
                ...value,
              })
            );

            setDataArray(dataArray);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Clean up the event listener when the component unmounts to avoid memory leaks
    return () => {
      database.ref("/users").off("value");
    };
  }, []);

  const handleDelete = async ( id) => {
    // console.log("id in form:", id)
    try {
      // Remove the data from the database
      await database.ref(`/users/${id}`).remove();

      // Update the local state by removing the item from the dataArray
      const newDataArray = dataArray.filter((data) => data.id !== id);
      setDataArray(newDataArray);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      {/* <button onClick={handleCalculateDays}>date</button> */}
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
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
                  value={formData.desgination}
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
                </div>
          <div>
            <button className="submitBtn" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <DataTable
          dataArray={dataArray}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
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

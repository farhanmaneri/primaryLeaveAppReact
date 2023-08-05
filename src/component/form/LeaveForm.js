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
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [cadre, setCadre] = useState("primary"); // Default to 'primary'
  const [date, setDate] = useState(getFormattedDate(new Date()));
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
      days: daysDifference || 0, // it no date were enter it will give zero
    };
    const path = `/teachers/${cadre}/${date}`;

    // Push the teacher data to the database under the determined path
    database.ref(path).push(newData);
    //  setCadre('primary')

    setFormData(prevFormData =>({
      ...prevFormData,
      name: "",
      // gender: "",
      // designation: "",
      schoolName: "",
      // schoolStatus: "",
      leaveFrom: "",
      leaveUpto: "",
      // leaveType: "",
      // leaveNature: "",
      // tehsil: "",
      // serviceBook: "",
      days: 0,
    }));
  };
  const [primaryTeachers, setPrimaryTeachers] = useState([]);
  const [secondaryTeachers, setSecondaryTeachers] = useState([]);
  // const [selectedLeaveType, setSelectedLeaveType] = useState(''); // Initialize with an empty string as the default value

  // const [dataArray, setDataArray] = useState([]);
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

  useEffect(() => {
    // Construct the path for the parent node
    const path = "/teachers/primary";

    // Attach an event listener to the 'value' event for the parent node
    const fetchPrimaryTeachers = () => {
      database.ref(path).on("value", (snapshot) => {
        const fetchedData = snapshot.val();
        if (fetchedData) {
          // Fetch data for each date dynamically and combine them into an array
          const dataArray = Object.keys(fetchedData).flatMap((date) =>
            Object.entries(fetchedData[date]).map(([id, value]) => ({
              id,
              cadre: "primary",
              date,
              ...value,
            }))
          );

          // Set the fetched data in the state
          setPrimaryTeachers(dataArray);
        }
      });
    };

    // Fetch the primary teacher data for all dates
    fetchPrimaryTeachers();

    // Clean up the event listener when the component unmounts
    return () => {
      database.ref(path).off("value");
    };
  }, []);

  

  // fetching Secondary Teachers Data
  useEffect(() => {
    // Construct the path for the parent node
    const path = "/teachers/secondary";

    // Attach an event listener to the 'value' event for the parent node
    const fetchSecondaryTeachers = () => {
      database.ref(path).on("value", (snapshot) => {
        const fetchedData = snapshot.val();
        if (fetchedData) {
          // Fetch data for each date dynamically and combine them into an array
          const dataArray = Object.keys(fetchedData).flatMap((date) =>
            Object.entries(fetchedData[date]).map(([id, value]) => ({
              id,
              cadre: "secondary",
              date,
              ...value,
            }))
          );

          // Set the fetched data in the state
          setSecondaryTeachers(dataArray);
        }
      });
    };

    // Fetch the primary teacher data for all dates
    fetchSecondaryTeachers();

    // Clean up the event listener when the component unmounts
    return () => {
      database.ref(path).off("value");
    };
  }, []);

  const handleDelete = async (cadre, date, id) => {
    // console.log("cadre in form:", cadre)
    // console.log("date in form:", date)
    // console.log("id in form:", id)

    try {
      // Construct the path based on the cadre and the teacher's ID
      const path = `/teachers/${cadre}/${date}/${id}`;

      // Remove the data from the database
      await database.ref(path).remove();

      // Update the local state by removing the item from the dataArray
      if (cadre === "primary") {
        const newPrimaryTeachers = primaryTeachers.filter(
          (teacher) => teacher.id !== id
        );
        setPrimaryTeachers(newPrimaryTeachers);
      } else if (cadre === "secondary") {
        const newSecondaryTeachers = secondaryTeachers.filter(
          (teacher) => teacher.id !== id
        );
        setSecondaryTeachers(newSecondaryTeachers);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const [showPrimary, setShowPrimary] = useState(true);
  const handleToggleCadre = (e) => {
    const selectedCadre = e.target.value;
    setCadre(selectedCadre);
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
                <select
                  className="upperSection"
                  value={cadre}
                  onChange={handleToggleCadre}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
              </label>
            </div>
            <div>
              <label>
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
            <div>
              <label>
                Date:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
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
                  name="designation"
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
            <div></div>
          </div>
          <div>
            <button className="submitBtn" type="submit">
              Submit
            </button>
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
          date={date}
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
                <td>{vig}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
}

export default LeaveForm;

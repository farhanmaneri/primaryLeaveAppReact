import React, { useState } from "react";
import "./LeaveForm.css";
function LeaveForm() {
  // form state
  const [formData, setFormData] = useState({
    name: "",
    Gender: "Ms.",
    desgination: "PST",
    schoolName: "",
    schoolStatus: "GGPS",
    leaveFrom: "",
    leaveUpto: "",
    leaveType: "",
    leaveNature: "",
    tehsil: "",
    serviceBook: "",
  });

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // perform any necessary form submission logic
    console.log(formData);
  };

  // handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Gender:
            <select
              type="select"
              name="Gender"
              value={formData.Gender}
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
  );
}

export default LeaveForm;

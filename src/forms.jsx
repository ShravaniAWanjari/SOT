import { useState } from "react";
import "./index.css"; // Import the CSS file

const Forms = () => {
  const [userType, setUserType] = useState(""); // Faculty or Student
  const [entryType, setEntryType] = useState(""); // Research, Project, Achievement
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idNumber: "",
    entryName: "",
    entryDescription: "",
    researchPaperLink: "", // This will be removed
    projectTechStack: "",
    achievementDate: "",
    file: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload with size validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File max size: 5MB");
      e.target.value = ""; // Reset file input
    } else {
      setFormData({ ...formData, file });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="forms-container">
      <h2>Submit Your Work</h2>
      <h2>Research | Projects | Achievements</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Are you submitting as a Student or Faculty?</label>
        <select onChange={(e) => setUserType(e.target.value)} required>
          <option value="">Select</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        {userType && (
          <>
            <label>{userType === "student" ? "Student ID:" : "Faculty Number:"}</label>
            <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
          </>
        )}

        <label>Entry Type:</label>
        <select name="entryType" value={entryType} onChange={(e) => setEntryType(e.target.value)} required>
          <option value="">Select</option>
          <option value="research">Research</option>
          <option value="project">Project</option>
          <option value="achievement">Achievement</option>
        </select>

        {entryType && (
          <>
            <label>Title of your Research/Project/Achievement:</label>
            <input type="text" name="entryName" value={formData.entryName} onChange={handleChange} required />

            <label>Brief Description:</label>
            <textarea name="entryDescription" value={formData.entryDescription} onChange={handleChange} required />
          </>
        )}

        {/* Conditionally render extra fields based on entry type */}
        {entryType === "project" && (
          <>
            <label>GitHub Repository Link:</label>
            <input type="url" name="projectRepoLink" value={formData.projectRepoLink} onChange={handleChange} required />
            <label>Technology Stack Used:</label>
            <input type="text" name="projectTechStack" value={formData.projectTechStack} onChange={handleChange} required />
          </>
        )}

        {entryType === "achievement" && (
          <>
            <label>Date of Achievement:</label>
            <input type="date" name="achievementDate" value={formData.achievementDate} onChange={handleChange} required />
          </>
        )}

        <label>Upload Proof (Max: 5MB)</label>
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Forms;
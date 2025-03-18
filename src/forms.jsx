import React, { useEffect, useState } from "react";
import apiConfig from "./config/apiconfig";
import "./index.css";

const Forms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [forms, setForms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form data state matching Django model fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    team_members: "",
    tech_stack: "",
    projecturl: "",
    achivements: "",
    from_date: "",
    to_date: "",
    category: ""
  });

  // Get user data from localStorage
  const getUserFromLocalStorage = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
    return null;
  };

  const user = getUserFromLocalStorage();

  // Fetch user's forms on component mount
  useEffect(() => {
    fetchForms();
  }, []);

  // Fetch all forms belonging to the user
  const fetchForms = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token') || localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const response = await fetch(apiConfig.getUrl('api/forms/'), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch your forms. Please try again.');
      }

      const data = await response.json();
      setForms(data);
    } catch (err) {
      console.error('Error fetching forms:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with title validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 4) {
        setError("Title should not exceed 4 words.");
        return;
      } else {
        setError(null); // Clear the error if within limit
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('access_token') || localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const response = await fetch(apiConfig.getUrl('api/forms/'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit form. Please try again.');
      }

      const data = await response.json();
      setSuccess('Form submitted successfully!');
      setFormData({
        title: "",
        description: "",
        team_members: "",
        tech_stack: "",
        projecturl: "",
        achivements: "",
        from_date: "",
        to_date: "",
        category: ""
      });
      setShowForm(false);
      fetchForms(); // Refresh the forms list
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Safely render tech stack badges
  const renderTechStack = (techStack) => {
    if (!techStack) return null;
    
    // Parse if string, use directly if already array
    let techItems = [];
    
    if (typeof techStack === 'string') {
      techItems = techStack.split(',').map(item => item.trim()).filter(Boolean);
    } else if (Array.isArray(techStack)) {
      techItems = techStack;
    } else {
      console.warn('Unexpected tech_stack type:', typeof techStack);
      return null;
    }
    
    return techItems.map((tech, index) => (
      <span key={index} className="tech-badge">{tech}</span>
    ));
  };

  // Safely render achievements
  const renderAchievements = (achievements) => {
    if (!achievements) return null;
    
    // Parse if string, use directly if already array
    let achievementItems = [];
    
    if (typeof achievements === 'string') {
      achievementItems = achievements.split(',').map(item => item.trim()).filter(Boolean);
    } else if (Array.isArray(achievements)) {
      achievementItems = achievements;
    } else {
      console.warn('Unexpected achievements type:', typeof achievements);
      return null;
    }
    
    // Only used for display, we're returning null here since achievements
    // aren't shown in the cards in the original code
    return null;
  };

  if (!user) {
    return (
      <div className="forms-container">
        <h2>Authentication Required</h2>
        <p>Please log in to access this page.</p>
        <button onClick={() => window.location.href = '/login'}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="forms-wrapper">
    <div className="forms-container">
      <h2>Research, Projects & Achievements</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      {!showForm ? (
        <div className="forms-list-container">
          <button className="add-form-btn" onClick={() => setShowForm(true)}>
            + Add New Entry
          </button>
          
          {isLoading ? (
            <p>Loading your entries...</p>
          ) : forms.length > 0 ? (
            <div className="forms-grid">
              {forms.map(form => (
                <div className="form-card" key={form.id}>
                  <h3>{form.title}</h3>
                  <span className="category-badge">{form.category}</span>
                  <p>{form.description.substring(0, 100)}...</p>
                  <div className="form-dates">
                    {formatDate(form.from_date)} - {formatDate(form.to_date)}
                  </div>
                  <div className="tech-stack">
                    {renderTechStack(form.tech_stack)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't added any entries yet. Click the button above to get started!</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="entry-form">
          <h3>Add New Entry</h3>
          
          <div className="form-group">
            <label>Category:</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select a Category</option>
              <option value="achievement">Achievement</option>
              <option value="research">Research</option>
              <option value="project">Project</option>
            </select>
          </div>

          <div className="form-group">
            <label>Title:</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Team Members (comma separated):</label>
            <input 
              type="text" 
              name="team_members" 
              value={formData.team_members} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Technology Stack (comma separated):</label>
            <input 
              type="text" 
              name="tech_stack" 
              value={formData.tech_stack} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Project URL:</label>
            <input 
              type="text" 
              name="projecturl" 
              value={formData.projecturl} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Achievements (comma separated):</label>
            <textarea 
              name="achivements" 
              value={formData.achivements} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>From Date:</label>
            <input 
              type="date" 
              name="from_date" 
              value={formData.from_date} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>To Date (leave empty if ongoing):</label>
            <input 
              type="date" 
              name="to_date" 
              value={formData.to_date} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-buttons">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Entry'}
            </button>
            <button 
              type="button" 
              onClick={() => setShowForm(false)} 
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
    </div>
  );
};

export default Forms;
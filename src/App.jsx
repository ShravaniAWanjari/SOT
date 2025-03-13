import React from "react";
import { Route, Routes } from "react-router-dom";
import Placements from './Placements';
import Forms from "./forms";
import HomePage from "./homepage";
import Navbar from "./navbar";
import SignUp from "./signup";
import ProjectsPage from "./projects";
import ResearchPage from "./research";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forms" element={<Forms />} /> {/* Forms Route */}
        <Route path="/placements" element={<Placements />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/research" element={<ResearchPage />} />
      </Routes>
    </>
  );
};

export default App;

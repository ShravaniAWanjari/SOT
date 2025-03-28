import React from "react";
import { Route, Routes } from "react-router-dom";
import Placements from './Placements';
import AchievementsPage from "./achievements";
import ContactPage from "./contactpage";
import Forms from "./forms";
import HomePage from "./homepage";
import Navbar from "./navbar";
import ProjectsPage from "./projects";
import ResearchPage from "./research";
import SignUp from "./signup";


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
        <Route path="/contactpage" element={<ContactPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />

      </Routes>

    </>
  );
};

export default App;

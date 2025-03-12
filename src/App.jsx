import React from "react";
import { Route, Routes } from "react-router-dom";
import Placements from './Placements';
import Forms from "./forms";
import HomePage from "./homepage";
import Navbar from "./navbar";
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

      </Routes>
    </>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import HomePage from "./homepage";
import SignUp from "./signup";
import Forms from "./forms";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forms" element={<Forms />} /> {/* Forms Route */}
      </Routes>
    </>
  );
};

export default App;

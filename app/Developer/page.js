"use client";

import React from "react";
import Navbar from "../components/Navbar";
import WelcomeHero from "../components/DeveloperComponents/WelcomeHero";
import SearchBar from "../components/DeveloperComponents/SearchBar";
import AllDevelopers from "../components/DeveloperComponents/AllDevelopers";

const Developer = () => {
  return (
    <>
      <Navbar />
      <WelcomeHero />
      <SearchBar />
      <AllDevelopers />
    </>
  );
};

export default Developer;
"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import WelcomeHero from "../components/DeveloperComponents/WelcomeHero";
import SearchBar from "../components/DeveloperComponents/SearchBar";
import AllDevelopers from "../components/DeveloperComponents/AllDevelopers";

const Developer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar />
      <WelcomeHero />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AllDevelopers searchQuery={searchQuery} />
    </>
  );
};

export default Developer;
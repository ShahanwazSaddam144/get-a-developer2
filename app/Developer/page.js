"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import WelcomeHero from "../components/DeveloperComponents/WelcomeHero";
import SearchBar from "../components/DeveloperComponents/SearchBar";
import AllDevelopers from "../components/DeveloperComponents/AllDevelopers";
import WebDevelopers from "../components/DeveloperComponents/WebDevelopers";
import FamousDevelopers from "../components/DeveloperComponents/FamousDevelopers";

const Developer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar />
      <WelcomeHero />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AllDevelopers searchQuery={searchQuery} />
      <WebDevelopers />
      <FamousDevelopers />
    </>
  );
};

export default Developer;
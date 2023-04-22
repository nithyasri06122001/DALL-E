import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Home, CreatePosts } from "./pages";
import { logo } from "./assets";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain"></img>
        </Link>
        <Link
          to="/create-posts"
          className="font-inter font-medium bg-[#6469ff] rounded-md px-6 py-3 text-white "
        >
          Create
        </Link>
      </header>
      <main className="w-full sm:px-8 px-4 py-4 min-h-[calc(100vh-73px)] bg[#f9fafe]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-posts" element={<CreatePosts />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;

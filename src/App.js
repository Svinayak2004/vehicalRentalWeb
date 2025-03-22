import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// Import Components
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Explore from "./Components/Explore/Explore";
import Footer from "./Components/Footer/Footer";
import CarDisplay from "./Components/CarDisplay/CarDisplay";
import Benefits from "./Components/Benefits/Benefits";
import CarView from "./Components/CarView/CarView";
import LoginSignup from "./Components/LoginSignup/Login";
import Cart from "./Pages/cart";

function App() {
  const [category, setCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false);
  const exploreRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Page Check
  const isCarViewPage = location.pathname.startsWith("/CarView");
  const isCartPage = location.pathname === "/Cart";

  // Load login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userName", userName);
  }, [isLoggedIn, userName]);

  // Handle Login
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserName(user.name);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    window.location.reload();
  };
  
  // Scroll function
  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {showLogin && <LoginSignup setShowLogin={setShowLogin} handleLogin={handleLogin} />}
      
      <Navbar
        setShowLogin={setShowLogin}
        scrollToExplore={scrollToExplore}
        isLoggedIn={isLoggedIn}
        userName={userName}
        handleLogout={handleLogout}
      />
      
      <div className="App">
        {!isCarViewPage && !isCartPage && (
          <>
            <Hero scrollToExplore={scrollToExplore} />
            <div ref={exploreRef}>
              <Explore category={category} setCategory={setCategory} />
            </div>
            <CarDisplay category={category} />
            <Benefits />
          </>
        )}

        <Routes>
          <Route path="/CarView/:id" element={<CarView />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import logo from "../assets/EquitylensLogo.svg";
import "./Navbar.css";


export default function Navbar() {


  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);

  const location = useLocation();

  const path = location.pathname;



  // CLICK OUTSIDE TO CLOSE MENU
  useEffect(() => {

    function handleClickOutside(event) {

      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {

        setMenuOpen(false);

      }

    }


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };


  }, []);


  function isActive(route) {
    return path === route;
  }


  function go(path) {

    navigate(path);

    setMenuOpen(false);

  }




  function logout() {

    localStorage.removeItem("token");

    navigate("/");

    setMenuOpen(false);

  }




  return (

    <div 
      className="nav-container"
      ref={navRef}
    >


      <div className="nav">



        {/* BRAND */}

        <div
          className="brand"
          onClick={() => go("/")}
        >

          <img
            src={logo}
            className="brand-logo"
            alt="EquityLens"
          />


          <span>
            EquityLens
          </span>


        </div>





        {/* DESKTOP NAV */}

        <div className="nav-actions desktop-nav">


          <button
            className={`nav-link ${isActive("/lookup") ? "active" : ""}`}
            onClick={() => go("/lookup")}
          >
            Lookup
          </button>



          <button
            className={`nav-link ${isActive("/market") ? "active" : ""}`}
            onClick={() => go("/market")}
          >
            Market
          </button>



          <button
            className={`nav-link ${isActive("/macrostats") ? "active" : ""}`}
            onClick={() => go("/macrostats")}
          >
            Macro Stats
          </button>





          {token ? (

            <button
              className="logout-btn"
              onClick={logout}
            >

              Log Out

            </button>


          ) : (


            <button
              className="login-btn"
              onClick={() => go("/auth")}
            >

              Log In

            </button>


          )}


        </div>








        {/* HAMBURGER */}

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          <span></span>
          <span></span>
          <span></span>


        </button>






      </div>







      {/* MOBILE MENU */}

      <div
        className={`mobile-menu ${
          menuOpen ? "open" : ""
        }`}
      >



        <button
          className={`nav-link ${isActive("/lookup") ? "active" : ""}`}
          onClick={() => go("/lookup")}
        >
          Lookup
        </button>



        <button
          className={`nav-link ${isActive("/market") ? "active" : ""}`}
          onClick={() => go("/market")}
        >
          Market
        </button>



        <button
          className={`nav-link ${isActive("/macrostats") ? "active" : ""}`}
          onClick={() => go("/macrostats")}
        >
          Macro Stats
        </button>





        {token ? (


          <button
            className="mobile-logout"
            onClick={logout}
          >

            Log Out

          </button>



        ) : (



          <button
            className="mobile-login"
            onClick={() => go("/auth")}
          >

            Log In

          </button>


        )}



      </div>




    </div>

  );

}
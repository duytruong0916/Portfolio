import React from "react";
import { store } from "../Store";

function Navbar(props) {
  const [toggle, setToggle] = React.useState(false);
  const globalState = React.useContext(store);
  const [navBackground, setNavBackground] = React.useState(false);
  const navRef = React.useRef();
  navRef.current = navBackground;

  React.useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 0;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const ontoggleHanle = (refName) => {
    setToggle(!toggle);
    globalState.dispatch({ type: "SET_REF", refName });
  };

  return (
    <>
      <div className="navbar-wrapper" style={{background: `${navBackground ? 'rgba(0, 0, 0, 0.5)' : 'black'}`}}>
        <div className="hamburger" onClick={ontoggleHanle}>
          <div className={`line ${toggle ? "bg-danger" : ""}`}></div>
          <div className={`line ${toggle ? "bg-danger" : ""}`}></div>
          <div className={`line ${toggle ? "bg-danger" : ""}`}></div>
        </div>
        <div className="section-title px-md-5 p-4" style={{opacity: `${navBackground? 0: 1}`, transition: '1.75s'}}>Portfolio</div>
        <ul className={`nav-links ${toggle ? "open" : ""}`}>
          <li onClick={() => ontoggleHanle("homeRef")}>HOME</li>
          <li onClick={() => ontoggleHanle("aboutRef")}>ABOUT</li>
          <li onClick={() => ontoggleHanle("projectRef")}>PROJECTS</li>
          <li onClick={() => ontoggleHanle("contactRef")}>CONTACT</li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;

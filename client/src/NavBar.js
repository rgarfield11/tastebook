import React from 'react'
import { useHistory } from "react-router-dom";

function NavBar({ setUser }) {
  const history = useHistory();

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  function handleNewRecipe() {
    history.push("/new");
  }

  function handleReturnHome() {
    history.push("/");
  }

  function handleProfileRoute() {
    history.push("/profile");
  }

  const navStyle = {
    display: "inline-block",
    color: "blue",
    margin: "auto",
    padding: "10px"
  }

  return (
    <div className="navBar">
      <h2 id="logo" style={navStyle} onClick={handleReturnHome}>tastebook</h2> &nbsp;
      <button style={navStyle} onClick={handleNewRecipe}>Add Recipe</button> &nbsp;
      <button style={navStyle} onClick={handleProfileRoute}>Profile</button> &nbsp;
      <button style={navStyle} onClick={handleLogout}>Logout</button> &nbsp;
    </div>
  )
}

export default NavBar
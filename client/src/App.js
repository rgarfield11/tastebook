import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Login from "./Login"
import Homepage from "./Homepage"
import Profile from "./Profile"
import NewRecipe from "./NewRecipe"
import "./App.css"

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;
  
  return (
    <div className="App">
      <NavBar setUser={setUser}/>
      <Switch>
        <Route path="/new">
          <NewRecipe user={user}/>
        </Route>
        <Route exact path="/">
          <Homepage/>
        </Route>
        <Route path="/profile">
          <Profile  user={user}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

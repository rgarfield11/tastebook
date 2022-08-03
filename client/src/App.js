import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Login from "./Login"
import Homepage from "./Homepage"
import Profile from "./Profile"
import NewRecipe from "./NewRecipe"
import RecipeExpanded from "./RecipeExpanded"
import EditRecipe from "./EditRecipe"
import "./App.css"

function App() {
  const [user, setUser] = useState(null);
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/recipes")
      .then((r) => r.json())
      .then((data) => setRecipeList(data));
  }, []);

  if (!user) return <Login onLogin={setUser} />;
  
  return (
    <div className="App">
      <NavBar setUser={setUser}/>
      <Switch>
        <Route path="/new">
          <NewRecipe user={user} recipeList={recipeList} setRecipeList={setRecipeList}/>
        </Route>
        <Route exact path="/">
          <Homepage recipeList={recipeList} setRecipeList={setRecipeList} />
        </Route>
        <Route path="/profile">
          <Profile user={user} setUser={setUser} recipeList={recipeList} setRecipeList={setRecipeList}/>
        </Route>
        <Route path="/recipes/:id">
          <RecipeExpanded/>
        </Route>
        <Route path="/edit_recipes/:id">
          <EditRecipe user={user}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

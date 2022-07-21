import React, { useState, useEffect } from 'react'
import RecipeCard from "./RecipeCard"

function Homepage() {
    const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    fetch("/recipes")
      .then((r) => r.json())
      .then((data) => setRecipeList(data));
  }, [recipeList.length]);

  const renderRecipes = recipeList.map((recipe)=>{
    return <RecipeCard key={recipe.id} title={recipe.title} description={recipe.description}/>
  })

  return (
    <div>
        <center>
        <h1>Homepage</h1>
        {renderRecipes}
        </center>
    </div>
  )
}

export default Homepage
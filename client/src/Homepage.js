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
    return <RecipeCard id={recipe.id} key={recipe.id} title={recipe.title} description={recipe.description} image={recipe.image_url}/>
  })

  return (
    <div className="wrapper">
        {renderRecipes}
    </div>
  )
}

export default Homepage
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function RecipeExpanded() {
  const params = useParams();
  const [recipe, setRecipe] = useState([]);

  useEffect(()=>{
    fetch(`/recipes/${params.id}`)
    .then(response => response.json())
    .then(data => setRecipe(data))
  },[params.id])

  return (
    <div className="expanded_wrapper">
      <div className="expanded_header">
        <h1 className="expanded_title">{recipe.title}</h1>
        <h4 className="expanded_description">{recipe.description}</h4>
        <h5 className="expanded_user">By {recipe?.user?.username}</h5>
      </div>
      <img className="expanded_image" alt={"recipe"} src={recipe.image_url}/>
      <div className="expanded_ingredients">
        <h2 className="expanded_text_head">Ingredients</h2>
        <ul>
          {recipe.ingredients?.map(ingredient => (
            <li>{ingredient.name}</li>
          ))}
        </ul>
      </div>
      <div className="expanded_instructions">
        <h2 className="expanded_text_head">Instructions</h2>
        <ol>
          {recipe.instructions?.map(instruction => (
            <li>{instruction.name}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default RecipeExpanded
import React from 'react'
import { useHistory } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const history = useHistory()
  
  function handleRecipeClick() {
    history.push(`/recipes/${recipe.id}`)
  }
  
  return (
    <div className="card">
      <div className="card_body">
        <img alt="" className="card_image" src={recipe.image_url}/>
        <div className="card_info">
        <h1 className="card_title">{recipe.title}</h1>
        <p className="card_description">{recipe.description}</p>
        <h5 className="card_user">By {recipe?.user?.username}</h5>
        </div>
      </div>
      <button value={recipe.id} onClick={handleRecipeClick} className="card_btn">View Recipe</button>
    </div>
  )
}

export default RecipeCard
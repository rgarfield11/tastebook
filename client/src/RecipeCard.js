import React from 'react'
import {useHistory} from "react-router-dom"

function RecipeCard({title, description, image}) {
  const history= useHistory()

  function handleRecipeClick() {
    console.log("test")
  }

  return (
    <div className="card">
      <div className="card_body">
        <img alt="" className="card_image" src={image}/>
        <h2 className="card_title">{title}</h2>
        <p className="card_description">{description}</p>
      </div>
      <button onClick={handleRecipeClick} class="card_btn">View Recipe</button>
    </div>
  )
}

export default RecipeCard
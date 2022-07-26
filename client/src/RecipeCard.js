import React from 'react'

function RecipeCard({title, description, image}) {

  function handleRecipeClick() {
    console.log("test")
  }

  return (
    <div class="card">
      <div class="card_body">
        <img class="card_image" src={image}/>
        <h2 class="card_title">{title}</h2>
        <p class="card_description">{description}</p>
      </div>
      <button onClick={handleRecipeClick} class="card_btn">View Recipe</button>
    </div>
  )
}

export default RecipeCard
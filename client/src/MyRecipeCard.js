import React from 'react'
import { useHistory } from 'react-router-dom';


function MyRecipeCard({ recipe, setRecipeList }) {
  const history = useHistory();

    function handleDeleteRecipe() {
      fetch(`/recipes/${recipe.id}`, 
      { method: "DELETE"})
      
      Promise.all(
        fetch("/recipes")
        .then((r) => r.json())
        .then((data) => setRecipeList(data))
      )
        history.push('/');
    }

    function handleUpdateRecipe() {
        history.push(`/edit_recipes/${recipe.id}`)
    }

  return (
    <div className="card">
      <div className="card_body">
        <img alt="" className="card_image" src={recipe.image_url}/>
        <h1 className="card_title">{recipe.title}</h1>
        <p className="card_description">{recipe.description}</p>
      </div>
      <div>
        <button 
          className="my_card_edit"
          onClick={handleUpdateRecipe}
        >Edit</button>
        <button 
          className="my_card_delete"
          onClick={handleDeleteRecipe}
        >Delete</button>
      </div>
    </div>
  )
}

export default MyRecipeCard
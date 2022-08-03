import React, { useState, useEffect } from 'react'
import MyRecipeCard from './MyRecipeCard'

function Profile({ user, recipeList, setRecipeList }) {
  const [myRecipes, setMyRecipes] = useState([])


  useEffect(()=>{
    fetch(`/users/${user.id}`)
    .then(response => response.json())
    .then(data => setMyRecipes(data.recipes))
  },[user.recipes])

  const mapMyRecipes = myRecipes.map((recipe)=>{
    return <MyRecipeCard key={recipe.id} recipe={recipe} recipeList={recipeList} setRecipeList={setRecipeList}/>
  })

  return (
    <div>
      <h1 className="profile_header">What's cooking, {user.username}?</h1>
      <div className="wrapper">
        {mapMyRecipes}
      </div>
    </div>
  )
}

export default Profile
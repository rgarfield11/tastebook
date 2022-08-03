import React from 'react'
import RecipeCard from "./RecipeCard"
import SearchBar from "./SearchBar"

function Homepage({ recipeList, setRecipeList }) {

  function handleFilter(e) {
    const filteredRecipes = recipeList.filter((recipe) => {
      if(recipe.title.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      } else {
        return false
      }
    })
    setRecipeList(filteredRecipes)
  }

  const renderRecipes = recipeList.map((recipe)=>{
    // console.log(recipe)
    return <RecipeCard recipeList={recipeList} key={recipe.id} recipe={recipe}/>
  })

  return (
    <div className="homepage">
      <SearchBar recipeList={recipeList} handleFilter={handleFilter} />
      <div className="wrapper">
          {renderRecipes}
      </div>
    </div>
  )
}


export default Homepage
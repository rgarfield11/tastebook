import React from 'react'
import RecipeCard from "./RecipeCard"
import SearchBar from "./SearchBar"

function Homepage({ recipeList, setRecipeList, filteredRecipeList, setFilteredRecipeList }) {

  function handleFilter(e) {
    const filteredRecipes = recipeList.filter((recipe) => {
      if(recipe.title.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      } else {
        return false
      }
    })
    setFilteredRecipeList(filteredRecipes)
  }

  const renderRecipes = filteredRecipeList.map((recipe)=>{
    // console.log(recipe)
    return <RecipeCard recipeList={recipeList} key={recipe.id} recipe={recipe}/>
  })

  return (
    <div className="homepage">
      <SearchBar recipeList={recipeList} handleFilter={handleFilter} setFilteredRecipeList={setFilteredRecipeList} />
      <div className="wrapper">
          {renderRecipes}
      </div>
    </div>
  )
}


export default Homepage
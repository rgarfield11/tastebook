import React, { useState } from 'react'
import { useHistory } from "react-router";

function NewRecipe({ user, recipeList, setRecipeList }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([{name: ""}]);
  const [instructions, setInstructions] = useState([{name: ""}]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        image_url: imageUrl,
        ingredients: ingredients,
        instructions: instructions,
        user_id: user.id
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(recipe => {
          setRecipeList([...recipeList, recipe]);
          history.push("/");})
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const handleChangeIngredients = (i, e) => {
    let newIngredients = [...ingredients]
    newIngredients[i][e.target.name] = e.target.value
    setIngredients(newIngredients)
  }

  const handleChangeInstructions = (i, e) => {
    let newInstructions = [...instructions]
    newInstructions[i][e.target.name] = e.target.value
    setInstructions(newInstructions)
  }

  const addIngredients = () => {
    setIngredients([...ingredients, {name: ""}])
  }

  const addInstructions = () => {
    setInstructions([...instructions, {name: ""}])
  }

  const removeIngredients = (i) => {
    let newIngredients = [...ingredients]
    newIngredients.splice(i,1)
    setIngredients(newIngredients)
  }

  const removeInstructions = (i) => {
    let newInstructions = [...instructions]
    newInstructions.splice(i,1)
    setInstructions(newInstructions)
  }

  function mapErrors() {
    errors.map((err) => (
        <p key={err}>{err}</p>
    ))
  }

  return (
    <>
    <h2>Add Your Recipe</h2>
    <form onSubmit={handleSubmit}>
      <label>Title </label>
      <input 
        className="recipe_input"
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br/>
      <label>Description </label>
      <input 
        className="recipe_input"
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br/>
      <label>Image URL </label>
      <input
        className="recipe_input" 
        type="text"
        id="description"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <br/>
      {ingredients.map((e, index) => (
            <div className="ingredients" key={index}>
              <label>Ingredient </label>
              <input className="recipe_input" type="text" name="name" value={e.name} onChange={e => handleChangeIngredients(index, e)} />
              {
                index ? 
                  <button type="button"  className="button_remove_ingredient" onClick={() => removeIngredients(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="add_ingredient">
              <button className="button add" type="button" onClick={() => addIngredients()}>Add</button>
          </div>
      
      <br/>
      {/*  */}
      {instructions.map((e, index) => (
            <div className="instructions" key={index}>
              <label>Instruction </label>
              <input className="recipe_input" type="text" name="name" value={e.name} onChange={e => handleChangeInstructions(index, e)} />
              {
                index ? 
                  <button type="button"  className="button_remove_instruction" onClick={() => removeInstructions(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="add_instruction">
              <button className="button add" type="button" onClick={() => addInstructions()}>Add</button>
          </div>
      
      <br/>
      {/*  */}
      <button type="submit">Submit</button>
    </form>
    <p>{mapErrors}</p>
    </>
  )
}

export default NewRecipe
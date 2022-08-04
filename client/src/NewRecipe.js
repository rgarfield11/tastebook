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
    <div className="new_recipe">
    <h2 className="recipe_form_header">Add Your Recipe</h2>
    <form classname="new_recipe_form"onSubmit={handleSubmit}>
      <input 
        placeholder="Recipe Title..."
        className="recipe_input"
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br/>
      <input 
        placeholder="Recipe Description..."
        className="recipe_input"
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br/>
      <input
        placeholder="Recipe Image URL..."
        className="recipe_input" 
        type="text"
        id="description"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <br/>
      {ingredients.map((e, index) => (
            <div className="ingredients" key={index}>
              <input 
                placeholder="Ingredient..."
                className="recipe_input" 
                type="text" name="name" 
                value={e.name} 
                onChange={e => handleChangeIngredients(index, e)} />
              {
                index ? 
                <div className="button_remove" >
                  <button 
                    className="remove_button"
                    type="button"  
                    onClick={() => removeIngredients(index)}
                    >Remove Ingredient</button>
                </div>
                : null
              }
            </div>
          ))}
          <br/>
          <div className="add_ingredient">
              <button className="button_add" type="button" onClick={() => addIngredients()}>Add Ingredient</button>
          </div>
      
      <br/>
      {instructions.map((e, index) => (
            <div className="instructions" key={index}>
              <input 
                placeholder="Instruction..."
                className="recipe_input" 
                type="text" name="name" 
                value={e.name} 
                onChange={e => handleChangeInstructions(index, e)} />
              <br/>
              {
                index ? 
                <div className="button_remove"> 
                  <button
                    className="remove_button"
                    type="button"  
                    onClick={() => removeInstructions(index)}
                    >Remove Instruction</button>
                </div>
                : null
              }
            </div>
          ))}
      <br/>
          <div className="add_instruction">
              <button className="button_add" type="button" onClick={() => addInstructions()}>Add Instruction</button>
          </div>
      <br/>
      <button type="submit" className="submit_recipe_btn">Save Recipe</button>
    </form>
    <p>{mapErrors}</p>
    </div>
  )
}

export default NewRecipe
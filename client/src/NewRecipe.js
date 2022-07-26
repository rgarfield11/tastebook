import React, { useState } from 'react'
import { useHistory } from "react-router";

function NewRecipe({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] =useState([{name: ""}]);
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
        user_id: user.id
      }),
    }).then((r) => {
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const handleChangeIngredients = (i, e) => {
    let newIngredients = [...ingredients]
    newIngredients[i][e.target.name] = e.target.value
    setIngredients(newIngredients)
    console.log(ingredients)
  }

  const addFormFields = () => {
    setIngredients([...ingredients, {name: ""}])
  }

  const removeFormFields = (i) => {
    let newIngredients = [...ingredients]
    newIngredients.splice(i,1)
    setIngredients(newIngredients)
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
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br/>
      <label>Description </label>
      <input 
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br/>
      <label>Image URL </label>
      <input 
        type="text"
        id="description"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <br/>
      {ingredients.map((e, index) => (
            <div className="form-inline" key={index}>
              <label>Ingredient </label>
              <input type="text" name="name" value={ingredients.name} onChange={e => handleChangeIngredients(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
          </div>
      
      <br/>
      <button type="submit">Submit</button>
    </form>
    <p>{mapErrors}</p>
    </>
  )
}

export default NewRecipe
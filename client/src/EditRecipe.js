import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import EditIngredients from "./EditIngredients"
import EditInstructions from "./EditInstructions"

function EditRecipe({user}) {
  const params = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([{name: ""}]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch(`/recipes/${params.id}`)
    .then(response => response.json())
    .then(data => setRecipe(data))
  },[params.id])

  useEffect(() => {
    setIngredients(recipe.ingredients)
    setInstructions(recipe.instructions)
    setTitle(recipe.title)
    setDescription(recipe.description)
    setImageUrl(recipe.image_url)
  }, [recipe])

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/recipes/${params.id}`, {
      method: "PATCH",
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
        history.push("/profile");
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
    <h2>Edit Recipe</h2>
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
      {ingredients && ingredients.map((e, index) => (
            <EditIngredients index={index} key={e.id} e={e}  handleChangeIngredients={handleChangeIngredients} removeIngredients={removeIngredients} />
          ))}
          <div className="add_ingredient">
              <button className="button add" type="button" onClick={() => addIngredients()}>Add</button>
          </div>
      <br/>
      {instructions && instructions.map((e, index) => (
            <EditInstructions index={index} key={e.id} e={e} handleChangeInstructions={handleChangeInstructions} removeInstructions={removeInstructions} />
          ))}
          <div className="add_instruction">
              <button className="button add" type="button" onClick={() => addInstructions()}>Add</button>
          </div>
      
      <br/>
      <button type="submit">Submit</button>
    </form>
    <p>{mapErrors}</p>
    </>
  )
}

export default EditRecipe
import React, { useState } from 'react'
import { useHistory } from "react-router";

function NewRecipe({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("")
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
        title,
        description,
        image_url: imageUrl,
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
      <button type="submit">Submit</button>
    </form>
    <p>{mapErrors}</p>
    </>
  )
}

export default NewRecipe
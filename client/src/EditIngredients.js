import React from 'react'

function EditIngredients({e}) {

  return (
    <div>
        <div className="ingredients">
            <label>Ingredient </label>
            <input type="text" name="name" value={e.name}/>
            <button type="button"  className="button_remove_ingredient">Remove</button> 
            </div>
    </div>
  )
}

export default EditIngredients
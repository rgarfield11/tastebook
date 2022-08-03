import React from 'react'

function EditIngredients({e, index, handleChangeIngredients, removeIngredients}) {

  return (
    <div>
        <div className="ingredients">
            <label>Ingredient </label>
            <input type="text" name="name" value={e.name} onChange={e => handleChangeIngredients(e)} />
            <button type="button"  className="button_remove_ingredient" onClick={() => removeIngredients(index)}>Remove</button> 
            </div>
    </div>
  )
}

export default EditIngredients
import React from 'react'

function EditIngredients({e, index, handleChangeIngredients, removeIngredients}) {

  return (
    <div>
        <div className="ingredients">
            <input 
              className="recipe_input" 
              type="text" 
              name="name" 
              value={e.name} 
              onChange={e => handleChangeIngredients(e)} 
            />
            <div className="button_remove">
              <button 
                className="remove_button"
                type="button" 
                onClick={() => removeIngredients(index)}
              >Remove Ingredient</button> 
            </div>
        </div>
    </div>
  )
}

export default EditIngredients
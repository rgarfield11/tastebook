import React from 'react'

function EditInstructions({ e, index, handleChangeInstructions }) {
  return (
    <div>
        <div className="instructions">
            <input 
              className="recipe_input" 
              type="text" 
              name="name" 
              value={e.name} 
              onChange={e => handleChangeInstructions(index, e)}
            />
            <div className="button_remove">
              <button 
                type="button" 
                className="remove_button"
              >Remove Instruction</button> 
            </div>
            </div>
    </div>
  )
}

export default EditInstructions
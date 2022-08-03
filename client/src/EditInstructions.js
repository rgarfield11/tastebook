import React from 'react'

function EditInstructions({ e, index, handleChangeInstructions }) {
  return (
    <div>
        <div className="instructions">
            <label>Instruction </label>
            <input type="text" name="name" value={e.name} onChange={e => handleChangeInstructions(index, e)}/>
            <button type="button"  className="button_remove_instruction">Remove</button> 
            </div>
    </div>
  )
}

export default EditInstructions
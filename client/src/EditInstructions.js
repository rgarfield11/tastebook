import React from 'react'

function EditInstructions({e}) {
  return (
    <div>
        <div className="instructions">
            <label>Instruction </label>
            <input type="text" name="name" value={e.name}/>
            <button type="button"  className="button_remove_instruction">Remove</button> 
            </div>
    </div>
  )
}

export default EditInstructions
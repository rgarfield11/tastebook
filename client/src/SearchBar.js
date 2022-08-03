import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ recipeList, handleFilter }) {
  return (
    <div className="search">
        <div className="search_inputs">
            <input 
                type="text" 
                placeholder="Search for recipes..."
                onChange={handleFilter}/>
            <div className="search_icon"><SearchIcon/></div>
        </div>
        <div className="search_result"></div>
    </div>
  )
}

export default SearchBar
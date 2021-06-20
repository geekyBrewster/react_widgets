import React, { useState, useEffect } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect (() => {
        console.log('component rendered');
    }, [searchTerm]);

    //useEffect is passed potentially two arguments
    //first is the function to run at render time
    //the seconds will be one of three things:
        //an empty array - indicates only run function at initial render
        //nothing - run function at initial render and at every re-render
        //an array w/ data - run at initial render and at every re-render if some element in that array has changed

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter search term: </label>
                    <input 
                        type="text" 
                        className="input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;
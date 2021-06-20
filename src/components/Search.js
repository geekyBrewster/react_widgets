import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    //"https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=llama";
    const baseWikipediaUrl = "https://en.wikipedia.org/w/api.php";

    const [searchTerm, setSearchTerm] = useState('programming');
    const [results, setResults] = useState([]);

    useEffect (() => {
        //have to put async-await inside the function here due to useEffect not wanting async function as first param
        const search = async () => {
            const {data} = await axios.get(baseWikipediaUrl, {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: searchTerm
                }
            });

            setResults(data.query.search);
        };
        
        search();
    }, [searchTerm]);

    //useEffect is passed potentially two arguments
    //first is the function to run at render time
    //the seconds will be one of three things:
        //an empty array - indicates only run function at initial render
        //nothing - run function at initial render and at every re-render
        //an array w/ data - run at initial render and at every re-render if some element in that array has changed
    
    function removeSpans(resultString){
        const openingTag = '<span class="searchmatch">';
        const closingTag = '</span>';

        var updatedStr = resultString.replace(new RegExp(openingTag, 'g'), '');
        updatedStr = updatedStr.replace(new RegExp(closingTag, 'g'), '');

        return updatedStr;
    }

    var renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {removeSpans(result.snippet)}
                </div>
            </div>
        );
    });

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
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
};

export default Search;
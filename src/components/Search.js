import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    //"https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=llama";
    const baseWikipediaUrl = "https://en.wikipedia.org/w/api.php";

    const [searchTerm, setSearchTerm] = useState('llama');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [results, setResults] = useState([]);

    //useEffect is passed two arguments - the first is the function to run at render
    //the seconds will be one of three things:
        //an empty array - indicates only run function at initial render
        //nothing - run function at initial render and at every re-render
        //an array w/ data - run at initial render and at every re-render if one of the element in the array has changed

    //Going to use this one to monitor user input and apply wait before sending search term to the request logic
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 1000);

        //useEffect can return one thing, a function - good to use for cleanup
        //This will be called BEFORE the above function any time the component re-renders (not called on initial render)
        return () => {
            clearTimeout(timerId);
        };

    }, [searchTerm]);

    //Going to use this one to make the API requests
    useEffect (() => {
        //have to put async-await inside the function here due to useEffect not wanting async function as first param
        const search = async () => {
            const {data} = await axios.get(baseWikipediaUrl, {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                }
            });

            setResults(data.query.search);
        };

        search();
 
    }, [debouncedTerm]); //dependency array (ideally useEffect want all references to state items in here)

    //Previously we had one useEffect that set the timeout, 
    //but also had a check on results.length so we didn't use the timeout for initial render/request
    //But having both searchTerm and results in the dependency array, you end up with additional API requests, which we don't want,
    //due to change in results after initial render triggering another render and a new request
    //So to fix we separated that out into separate useEffects targeting different pieces of state.
    //Bonus - if search term is re-entered but the same, no new request is made


    //There is a hidden React function that converts a string into HTML, but I don't wish to use it [Trust No One]
    //So I'll break out the RegEx to remove the span tags coming from the API results
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
                <div className="right floated content">
                    <a 
                        className="ui button"
                        href={`https://en.wikipedia.org/?curid=${result.pageid}`}
                    >Go</a>
                </div>
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
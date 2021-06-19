import React, { useState } from 'react';

const Accordion = ({items}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    //const [searchTerm, setSearchTerm] = useState(''); -- if you need another state variable, add another
    //array destructuring - shortcut to get to elements inside an array
    //useState returns an array with two items: state variable ("piece of state"), function to update that piece of state ("setter")
    //useState takes in one param - initial value for that piece of state (which is only used to initialze things, it'll use any new value when component re-renders)

    const onTitleClick = (index) => {
        setActiveIndex(index);
    };

    const renderedItems = items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';

        return (
        <React.Fragment key={item.title}>
            <div 
                className={`${active} title`}
                onClick={() => onTitleClick(index)} //arrow func so that helper func is called onClick and not right away
            >
                <i className="dropdown icon"></i>
                {item.title}
            </div>
            <div className={`${active} content`}>
                <p>{item.content}</p>
            </div>
        </React.Fragment>
        );
    });

    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    ); 
};

export default Accordion;
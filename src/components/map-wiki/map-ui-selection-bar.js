import React, { Component} from 'react';

export const MapSelectionBar = (props) => {  

    const onSelectionBarClick = (e) => {
        let child = e.target,
            childrens = Array.from(e.target.parentNode.childNodes);
            
            childrens.map( (child) => {
                if (child.classList.contains('--selected')){
                    child.classList.remove('--selected');
                }
            });
            child.classList.add('--selected');

        let attribute = e.target.getAttribute('data');
        return props.getSelectionBar(attribute);
    }

    return(
        <div className='map-selection-bar' onClick={onSelectionBarClick}>
            <div className='map-selection-bar__item --cursor --selected' data='cursor'></div>
            <div className='map-selection-bar__item --node'              data='node'></div>
            <div className='map-selection-bar__item --edge'              data='edge'></div>
            <div className='map-selection-bar__item --delete'            data='delete'></div>
        </div>
    );
}

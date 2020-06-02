import React from 'react';

export const Home_MapsListRecent = (props) => {

    const { RecentMaps } = props;

    const OpenMapEditor = (id) => {
        props.getMapId(id);
        props.history.push('/map-editor');    
    }

    return(       
        <div className='home-container__maps-grid'>
            <h3 className='maps-grid__title'>Недавние карты</h3>

            <div className='maps-grid__container'>
                {   RecentMaps.length > 0 ?
                
                    RecentMaps.map(({_id, title}) => (
                        <div className='map-card' key={_id}>
                            <div className='map-card__body' onClick={() => OpenMapEditor(_id)}>
                                <div className='map-card__title'>{title}</div>
                            </div>                            
                        </div>
                    ))

                    : null
                }
            </div>

        </div>
        
    );
}
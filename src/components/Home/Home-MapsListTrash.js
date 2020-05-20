import React from 'react';

export const Home_MapsListTrash = (props) => {

    const { TrashMaps } = props;

    const OpenFormAddMap = () => {
        props.openFormAddMap();    
    } 

    return(       
        <div className='home-container__maps-grid'>
            <h3 className='maps-grid__title'>Удаленные карты</h3>

            <div className='maps-grid__container'>
                {   TrashMaps.length > 0 ?
                   
                TrashMaps.map(({id, title}) => (
                        <div className='map-card' key={id}>
                            <div className='map-card__title'>{title}</div>
                            <svg className='map-card__delete' width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0)">
                                <path d="M15.9483 9.05756C15.6249 9.05756 15.3628 9.31965 15.3628 9.64304V20.7086C15.3628 21.0318 15.6249 21.2941 15.9483 21.2941C16.2717 21.2941 16.5338 21.0318 16.5338 20.7086V9.64304C16.5338 9.31965 16.2717 9.05756 15.9483 9.05756Z" fill="white"/>
                                <path d="M9.0397 9.05756C8.71632 9.05756 8.45422 9.31965 8.45422 9.64304V20.7086C8.45422 21.0318 8.71632 21.2941 9.0397 21.2941C9.36309 21.2941 9.62519 21.0318 9.62519 20.7086V9.64304C9.62519 9.31965 9.36309 9.05756 9.0397 9.05756Z" fill="white"/>
                                <path d="M4.00465 7.44267V21.8676C4.00465 22.7202 4.31729 23.5209 4.86343 24.0954C5.40705 24.6715 6.1636 24.9985 6.95537 24.9999H18.0328C18.8248 24.9985 19.5813 24.6715 20.1247 24.0954C20.6709 23.5209 20.9835 22.7202 20.9835 21.8676V7.44267C22.0692 7.15451 22.7727 6.10568 22.6274 4.99167C22.482 3.87789 21.5331 3.04473 20.4097 3.0445H17.4121V2.31265C17.4155 1.69722 17.1722 1.10625 16.7365 0.671486C16.3008 0.236951 15.709 -0.00501556 15.0935 1.58918e-05H9.89465C9.27922 -0.00501556 8.68733 0.236951 8.25166 0.671486C7.81598 1.10625 7.57264 1.69722 7.57607 2.31265V3.0445H4.57847C3.45508 3.04473 2.50619 3.87789 2.36074 4.99167C2.21551 6.10568 2.919 7.15451 4.00465 7.44267ZM18.0328 23.829H6.95537C5.95434 23.829 5.17561 22.969 5.17561 21.8676V7.49413H19.8126V21.8676C19.8126 22.969 19.0338 23.829 18.0328 23.829ZM8.74703 2.31265C8.74314 2.00779 8.86298 1.71437 9.07933 1.49916C9.29545 1.28395 9.58956 1.16571 9.89465 1.17097H15.0935C15.3986 1.16571 15.6927 1.28395 15.9088 1.49916C16.1252 1.71414 16.245 2.00779 16.2411 2.31265V3.0445H8.74703V2.31265ZM4.57847 4.21546H20.4097C20.9918 4.21546 21.4636 4.68727 21.4636 5.26932C21.4636 5.85136 20.9918 6.32318 20.4097 6.32318H4.57847C3.99642 6.32318 3.5246 5.85136 3.5246 5.26932C3.5246 4.68727 3.99642 4.21546 4.57847 4.21546Z" fill="white"/>
                                <path d="M12.494 9.05756C12.1707 9.05756 11.9086 9.31965 11.9086 9.64304V20.7086C11.9086 21.0318 12.1707 21.2941 12.494 21.2941C12.8174 21.2941 13.0795 21.0318 13.0795 20.7086V9.64304C13.0795 9.31965 12.8174 9.05756 12.494 9.05756Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0">
                                <rect width="25" height="25" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </div>                        
                    ))

                    : null
                }
            </div>
        </div>
        
    );
}
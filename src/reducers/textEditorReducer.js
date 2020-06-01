import * as types from '../constants/types';

const initialState = {
    isEmpty: true,
    document:{
        id: null,
        title: '',
        docBody: []
    }    
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case types.textEditor.LOAD_DATA:           
            return {
                ...state,
                isEmpty: false,
                document:{
                    id: action.payload._id,
                    title: action.payload.title,
                    docBody: action.payload.DocBody
                }                
            };


        case types.textEditor.REMOVE_DATA:           
            return {
                ...state,
                isEmpty: true,
                document:{
                    id: null,
                    title: '',
                    docBody: []
                }  
            };

        default: 
            return state;
    }
}


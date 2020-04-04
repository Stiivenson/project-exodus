//Создаем новый узел на карте
// export function sendMapConfig (newBranch, parentID) {
//     return (dispatch, getState) => {
//         const {branches} = getState();
//         if(branches.length){
//             newBranch.id = branches[branches.length-1].id + 1;
//         }
//         return dispatch({
//             type: 'CREATE',
//             newBranch, 
//             parentID
//         });        
//     };
// }

export function sendMapConfig () {
    return (dispatch, getState) => {
        const state = getState();       
        return dispatch({
            type: 'SAVE',
            state
        });        
    };
}
import initialState from "../constants/initialState";

export function map_component(state = initialState.map_component, action){ 
    switch(action.type){
        case 'SAVE':{
            const stateOld = action.state;
            let nextState = state;          
            return nextState;
        }
        default:
            return state;
    }
}

// export function map_component(state = initialState.branches, action){ 
//     switch(action.type){
//         case 'SAVE':{
//             const {newBranch, parentID} = action;
//             let nextState = Array.from(state),
//                 nextId = 0,
//                 stop = true;
//             nextState.map(branch => {
//                 if(branch.id === parentID){ //Добавляем к родителю новый элемент
//                     nextId = branch.id;
//                     branch.childNodes.push(newBranch.id);
//                     newBranch.position.x = branch.position.x + 100;
//                     newBranch.position.y = branch.position.y;
//                     return;
//                 }
//             });
//             nextState.push(newBranch);

//             do { //Обновляем свойство childNodes у всех Веток, чтобы синхронизировать измененения при DragEvent
//                 nextState.map(branch => {
//                     if(branch.childNodes.includes(nextId)){                     
//                         branch.childNodes.push(newBranch.id);
//                         stop = true;
//                         return;
//                     }
//                     stop = false;
//                 });            
//             }
//             while(stop);

//             return nextState;
//         }
//         default:
//             return state;
//     }
// }


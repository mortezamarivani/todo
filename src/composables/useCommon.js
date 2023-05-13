    
    export function getTodoItemFromLocalStorage(){
        if (localStorage.getItem('todos') === null) {
            return [];
        } else {
            return JSON.parse(localStorage.getItem('todos'));
        }
     }

     export function deleteItem(pi_value){
        let todosInStorage=[];
        todosInStorage = getTodoItemFromLocalStorage().filter(({ title }) => title != pi_value); 
        localStorage.setItem('todos', JSON.stringify(todosInStorage));
    }


        

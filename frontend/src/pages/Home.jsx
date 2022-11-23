import { useEffect } from "react";

import TodoDetails from '../components/TodoDetails';
import TodoForm from "../components/TodoForm";
import { useTodosContext } from "../hooks/useTodosContext";

var protocol = window.location.protocol;
var hostname = window.location.hostname;
var port = '4000';
let fetchURL = protocol + '//' + hostname + ':' + port;
console.log(fetchURL);

const Home = () => {

    const {todos, dispatch} = useTodosContext()
    
    useEffect(() => {
        const fetchTodos = async () =>{
            const response = await fetch(fetchURL + '/api/todos', {
                method: 'GET',
                mode: 'cors',
            });
            
            const json = await response.json();
            if(response.ok)
            {
                dispatch({type: 'SET_TODOS', payload: json});
            }
        }

        fetchTodos();

    }, [dispatch]);
    
    return(
        <div className="grid grid-cols-3 gap-24">
            <div className="col-span-2">
                {todos && todos.map((todo) => (
                    <TodoDetails key={todo._id} todo={todo}/>
                ))}
            </div>
            <TodoForm />
        </div>
    );
}

export default Home;
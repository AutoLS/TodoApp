import { useEffect } from "react";

import TodoDetails from '../components/TodoDetails';
import TodoForm from "../components/TodoForm";
import { useTodosContext } from "../hooks/useTodosContext";

const Home = () => {

    const {todos, dispatch} = useTodosContext()
    
    useEffect(() => {
        const fetchTodos = async () =>{
            const response = await fetch('http://autols.ca:4000/api/todos', {
                method: 'GET',
                mode: 'no-cors',
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
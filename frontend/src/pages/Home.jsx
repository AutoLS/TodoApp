import { useEffect } from "react";

import TodoDetails from '../components/TodoDetails';
import TodoForm from "../components/TodoForm";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {

    const {todos, dispatch} = useTodosContext()
    const {user} = useAuthContext();
    
    useEffect(() => {
        const fetchTodos = async () =>{
            const response = await fetch('/api/todos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            
            const json = await response.json();
            if(response.ok)
            {
                dispatch({type: 'SET_TODOS', payload: json});
            }
        }

        if(user) fetchTodos();

    }, [dispatch, user]);
    
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
import { useTodosContext } from "../hooks/useTodosContext";
const { useState } = require("react");

const TodoForm = () => {
    const {dispatch} = useTodosContext()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const todo = {title, description, completed: false};

        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if(!response.ok)
        {
            setError(json.error);
        }
        else
        {
            setTitle('');
            setDescription('');
            setError(null);
            dispatch({type: 'CREATE_TODO', payload: json});
            console.log('New todo added', json);
        }
    };

    return(
        <form className="" onSubmit={handleSubmit} id="addTodoForm">
            <h3 className="text-xl font-bold">Add a new Todo</h3>
            <label className="block">Title:</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="p-2.5 mt-2.5 mb-5 w-full rounded border-gray-400 box-border block"/>
            <label>Description:</label>
            <textarea name="description" form="addTodoForm" onChange={(e) => setDescription(e.target.value)} value={description} className="p-2.5 mt-2.5 mb-5 w-full rounded border-gray-400 box-border block"/>

            <button className="bg-blue-800 text-white rounded cursor-pointer p-2.5">Add Todo</button>
            {error && <div className="p-2.5 bg-red-50 text-red-700 rounded border border-red-700 my-2.5">{error}</div>}
        </form>
    );
};

export default TodoForm;
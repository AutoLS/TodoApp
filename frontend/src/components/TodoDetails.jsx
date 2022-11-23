import { useTodosContext } from "../hooks/useTodosContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,  faTrashCanArrowUp} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const TodoDetails = ({ todo }) => {

    const { dispatch } = useTodosContext();
    const [deleteIcon, setDeleteIcon] = useState(<FontAwesomeIcon icon={faTrash} />);

    const handleClick = async () => {
        const response = await fetch("http://autols.ca:4000/api/todos/" + todo._id, {
            method: 'DELETE',
            mode: 'no-cors'
        });

        const json = await response.json();

        if(response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json});
        }
    };

    const deleteButtonHover = () => {
        setDeleteIcon(<FontAwesomeIcon icon={faTrashCanArrowUp} />)
    };

    const deleteButtonLeave = () => {
        setDeleteIcon(<FontAwesomeIcon icon={faTrash} />)
    };

    const handleCheckbox = async (e) => {
        const updatedTodo = {title: todo.title, description: todo.description, completed: e.currentTarget.checked};

        const response = await fetch("http://autols.ca:4000/api/todos/" + todo._id, {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(updatedTodo),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const json = await response.json();
        
        if(response.ok) {
            updatedTodo._id = json._id;
            console.log(updatedTodo);
            dispatch({type: 'PATCH_TODO', payload: updatedTodo});
        }
    };

    return (
        <div className="bg-white border rounded p-5 my-5 mx-auto relative shadow">
            <div className="flex justify-between mb-2.5">
                <div className="text-xl text-blue-800">{todo.title}</div>
                <div className="order-last">
                    <input type="checkbox" id={"completed_" + todo._id} name={"completed_" + todo._id} checked={todo.completed} onChange={handleCheckbox} className="scale-[1.5] mr-1"/>
                    <label htmlFor={"completed_" + todo._id} className="text-sm"> Completed</label>
                </div>
            </div>
            {!todo.completed ? <div className="p-3 bg-gray-200 min-h-[150px] mb-5 rounded whitespace-pre-line">{todo.description}</div> : <div></div>}
            <div className="flex justify-between">
                <div className="text-sm">Created {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</div>
                <div className="order-last"><span onMouseLeave={deleteButtonLeave} onMouseOver={deleteButtonHover} onClick={handleClick} className="cursor-pointer scale-150">{deleteIcon}</span></div>
            </div>
        </div>
    );
};

export default TodoDetails;
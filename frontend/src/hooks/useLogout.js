import { useAuthContext } from "./useAuthContext";
import { useTodosContext } from "./useTodosContext";

export const useLogout = () => {

    const {dispatch} = useAuthContext();
    const {dispatch: todoDispatch} = useTodosContext();

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
        todoDispatch({type: 'SET_TODOS', payload: null});
    }

    return {logout};
}
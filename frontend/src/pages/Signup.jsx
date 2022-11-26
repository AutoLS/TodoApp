import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import ErrorMessage from "../components/ErrorMessage";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    }

    return (
        <form className="max-w-[400px] my-10 mx-auto p-5 bg-white rounded" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-5">Sign up</h3>

            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}
                className="p-2.5 mt-2.5 mb-5 w-full rounded border-gray-400 border block"
            />

            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} 
                value={password}
                className="p-2.5 mt-2.5 mb-5 w-full rounded border-gray-400 border block"
            />
        
            <button disabled={isLoading} className="bg-blue-800 text-white rounded cursor-pointer p-2.5 mb-3">Sign up</button>
            {error && <ErrorMessage error={error}/>}
        </form>
    );

}

export default Signup;
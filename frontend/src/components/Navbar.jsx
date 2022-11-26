import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const {user} = useAuthContext();
    const { logout } = useLogout();

    return (
        <header className="bg-white">
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-5 py-2.5">
                <Link to="/" className=" text-neutral-700 no-underline">
                    <h1 className="text-4xl font-bold">TodoList</h1>
                </Link>
                <nav className="flex items-center">
                    {user && (
                        <div>
                            <span className="mr-3">{user.email}</span>
                            <button onClick={logout} className="bg-white text-blue-800 py-[6px] px-2.5 border border-blue-800 rounded cursor-pointer text-base">Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login" className="ml-2.5">Login</Link>
                            <Link to="/Signup" className="ml-2.5">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="bg-white">
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-5 py-2.5">
                <Link to="/" className=" text-neutral-700 no-underline">
                    <h1 className="text-4xl font-bold">TodoList</h1>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
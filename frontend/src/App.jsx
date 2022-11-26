import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//Pages & Components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter basename='/apps/TodoReact'>
        <Navbar />
        <div className="max-w-screen-2xl p-5 mx-auto font-bold">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login"/>}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

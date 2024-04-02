import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { setAuthToken } from "./store/application_slice";

function App() {

  const [user, setUser] = useState(null);
  const api = useApi();
  const dispatch = useDispatch();


 async function getUser() {
    const {user} = await api.get("/users/me");
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, [])

  function logout() {
    dispatch(setAuthToken(null));
  }


  const authToken = useSelector(state => state.application.authToken)
  return (
    <div>
      <nav className="my-nav">
        <h1 className="logo">Reptile Tracker</h1>
        {authToken ? (
          // If authToken exists, render this content
          <div className="welcome">
            {user && <h1 style={{paddingRight: "10px", fontSize: "30px"}}>Welcome, {user.firstName}</h1>}
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="links">
            <>
              <Link style={{paddingRight: "30px"}} to="/sign_up">Create Account </Link>
              <Link style={{paddingRight: "10px"}} className="link" to="/login">Sign In</Link>
            </>
          </div>
        
          // If authToken doesn't exist, render this content
        )}
      </nav>
      <Outlet />
    </div>
  );
}

export default App

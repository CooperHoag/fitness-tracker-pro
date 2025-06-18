import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Fitness Tracker</p>
      <nav>
        <NavLink to="/activities">Activites</NavLink>
        <NavLink to="/routines">Routines</NavLink>
        {token ? (
          <NavLink to="/logout">Log Out</NavLink>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
        
        
      </nav>
    </header>
  );
}

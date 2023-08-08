import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">
        <h1>🪙</h1>
      </NavLink>
      <ul className="links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" role="button">
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

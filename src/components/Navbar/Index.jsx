import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="sticky navbar px-4 bg-base-100 border-b-[1px] border-b-neutral">
      <section className="flex justify-between max-w-[1200px] w-full mx-auto">
        <NavLink to="/" className="text-2xl duration-300 hover:scale-125">
          🪙
        </NavLink>
        <div className="flex flex-grow justify-end">
          <ul className="menu menu-horizontal gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">Sobre</NavLink>
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
};

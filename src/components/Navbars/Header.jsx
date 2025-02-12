import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { BsPencilSquare } from "react-icons/bs";

const Header = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(user)


  return (
    <div className="container mx-auto border-b-[1px] border-[#f1f1f1]">
      <div className="navbar bg-base-100">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="dropdown-content absolute left-0 mt-2 w-screen bg-white shadow-lg p-4">
                <NavLink
                  className="navlink block py-2"
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className="navlink block py-2"
                  to="/crime-feed"
                >
                  Crime Feed
                </NavLink>
                <NavLink
                  className="navlink block py-2"
                  to="/my-posted-crimes"
                >
                  My Posts
                </NavLink>
                <NavLink
                  className="navlink block py-2"
                  to="/about"
                >
                  About
                </NavLink>
              </div>
            )}
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="w-28"
          >
            <h4 className="uppercase font-bold">Crimes</h4>
          </Link>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-4 text-base capitalize">
            <NavLink
              className="navlink"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="navlink"
              to="/crime-feed"
            >
            Crime Feed
            </NavLink>
            <NavLink
              className="navlink"
              to="/about"
            >
              About
            </NavLink>
          </ul>
        </div>

        {/* Navbar End (Profile & Logout) */}
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Add Query Button */}
              <Link
                to="/add-query"
                className="flex items-center gap-2 text-gray-500 hover:text-black"
              >
                <BsPencilSquare className="text-xl" />
                <h4 className="text-base">Add Query</h4>
              </Link>

              {/* Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2"
                >
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-cover rounded-full"
                    alt="Profile"
                  />
                </button>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box shadow-lg mt-2 w-52 p-2 text-base"
                >
                  <li>
                    <Link to="/my-queries">My Queries</Link>
                  </li>
                  <li>
                    <Link to="/my-recommendations">My Recommendations</Link>
                  </li>
                  <li>
                    <Link to="/recommendations-for-me">
                      Recommendations for Me
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="btn1 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

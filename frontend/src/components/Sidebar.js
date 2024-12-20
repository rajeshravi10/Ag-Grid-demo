import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown manually
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Keep dropdown open if the current page is under "User"
  const isUserPage = location.pathname.includes("/user");

  // Auto-close dropdown when the route changes
  useEffect(() => {
    if (!isUserPage) {
      setDropdownOpen(false);
    }
  }, [location.pathname, isUserPage]);

  return (
    <nav className="bg-dark text-white p-3" style={{ height: "100vh", width: "250px" }}>
      <h2>My App</h2>
      <ul className="nav flex-column">
        {/* Dashboard */}
        <li className="nav-item mb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "bg-primary text-white rounded" : ""}`
            }
          >
            Dashboard
          </NavLink>
        </li>

        {/* User Dropdown */}
        <li className="nav-item mb-2">
          <div className={`${isUserPage ? "bg-primary text-white rounded" : ""}`}>
            <button
              className="btn dropdown-toggle w-100 text-start"
              type="button"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen || isUserPage ? "true" : "false"}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              User
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-dark ${
                isDropdownOpen || isUserPage ? "d-block" : "d-none"
              }`}
              style={{ position: "static" }}
            >
              <li>
                <NavLink
                  to="/user-details"
                  className={({ isActive }) =>
                    `dropdown-item ${isActive ? "bg-primary text-white rounded" : ""}`
                  }
                >
                  User Details
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        {/* Profile */}
        <li className="nav-item mb-2">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link ${isActive ? "bg-primary text-white rounded" : ""}`
            }
          >
            Profile
          </NavLink>
        </li>

        {/* Settings */}
        <li className="nav-item mb-2">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-link ${isActive ? "bg-primary text-white rounded" : ""}`
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;

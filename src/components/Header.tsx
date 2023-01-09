import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/context';
import { Link } from 'react-router-dom';

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const openDropdown = (): void => {
    setShowDropdown(true);
  };

  const handleLogout = (): void => {
    dispatch({ type: 'logout' });
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  return (
    <div className="header-container">
      <Link to={'/'}>
        <h1>Pollster</h1>
      </Link>
      <div className="header-account-section">
        <div className="header-menu">
          <button onClick={openDropdown}>Nav</button>
          {showDropdown && (
            <div className="header-dropdown" ref={ref}>
              <nav>
                <ul>
                  <li
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    <Link to={`/users/${state.user?._id}`}>View Profile</Link>
                  </li>
                  <li
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/context';

const Header = () => {
  const value = useContext(AuthContext);

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
    value?.dispatch({ type: 'logout' });
  };

  const handleClickOutside = (event: MouseEvent): void => {
    event.preventDefault();
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  return (
    <div className="header-container">
      <h1>Pollster</h1>
      <div className="header-account-section">
        <div className="header-menu">
          <button onClick={openDropdown}>Nav</button>
          {showDropdown && (
            <div className="header-dropdown" ref={ref}>
              <nav>
                <ul>
                  <li>View Profile</li>
                  <li>
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

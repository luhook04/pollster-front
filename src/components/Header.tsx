import React from 'react';

const Header = () => {
  return (
    <div className="header-container">
      <h1>Pollster</h1>
      <div className="header-account-section">
        <div className="header-menu">
          <button></button>
          {/* {showDropdown && (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Header;

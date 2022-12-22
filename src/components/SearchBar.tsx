import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
const SearchBar = () => {
  const { state } = useContext(AuthContext);
  const [users, setUsers]: any = useState<[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const req = await fetch(
          'https://pollster-api-production.up.railway.app/api/users',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );

        const reqJson = await req.json();
        setUsers(reqJson.users);
      } catch (err) {
        return err;
      }
    };

    getUsers();
  }, [state]);

  const filteredItems = users.filter((user: any) =>
    user.username.toLocaleLowerCase().includes(filterText)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter items by keyword"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
      />
      <hr />
      {!filterText ? (
        <div>There are no items to display adjust your filter criteria</div>
      ) : (
        filteredItems.map((item: any) => (
          <div key={item.username}>
            <h3>{item.username}</h3>
            <button>Add Friend</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchBar;

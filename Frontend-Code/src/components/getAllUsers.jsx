import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9898/api/v2/user/getAllUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the state with the fetched users
        setUsers(response.data);
      } catch (error) {
        // Handle errors
        console.error("Error fetching users:", error.response.data.message);
      }
    };

    fetchUsers();
  }, [token]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">All Users</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="search" className="form-label">
              Search by Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Enter name to search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.email}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;

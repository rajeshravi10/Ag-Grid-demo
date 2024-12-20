import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { PaginationModule } from "ag-grid-community";
import { TextEditorModule } from "ag-grid-community";
import { TextFilterModule } from "ag-grid-community";
import { ValidationModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import CreateUserModal from "./CreateUserModal";

// Register required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
]);

const updateUserApi = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/users/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data on the server:", error);
    throw error;
  }
};

const createUserApi = async (newUser) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/create",
      newUser
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user on the server:", error);
    throw error;
  }
};

const deleteUserApi = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user on the server:", error);
    throw error;
  }
};

const GridWithApiData = () => {
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modifiedRows, setModifiedRows] = useState({}); // Tracks modified rows
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "" },
    address: { street: "", city: "", zipcode: "" },
    net: 0,
    gross: 0,
  });

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setRowData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await deleteUserApi(id);
      setRowData((prevData) => prevData.filter((user) => user.id !== id));
      setFilteredData((prevData) => prevData.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const handleCellValueChange = (event) => {
    const updatedField = event.colDef.field;
    const updatedValue = event.newValue;

    // Update the row data
    const updatedRow = { ...event.data, [updatedField]: updatedValue };

    // Dynamically calculate the total
    if (updatedField === "gross" || updatedField === "net") {
      updatedRow.total =
        (parseFloat(updatedRow.net) || 0) + (parseFloat(updatedRow.gross) || 0);
    }

    // Track the modified rows
    setModifiedRows((prev) => ({
      ...prev,
      [event.data.id]: updatedRow,
    }));

    // Update the row on the grid
    event.node.setData(updatedRow);
  };

  const handleSaveChanges = async () => {
    const updates = Object.values(modifiedRows);
    if (updates.length === 0) {
      alert("No changes to save.");
      return;
    }

    try {
      for (const row of updates) {
        await updateUserApi(row.id, row);
      }

      // Clear the modifiedRows state after successful updates
      setModifiedRows({});
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    }
  };

  const handleCreateUser = async () => {
    if (
      !newUser.id ||
      !newUser.name ||
      !newUser.username ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.website ||
      !newUser.company.name ||
      !newUser.address.street ||
      !newUser.address.city ||
      !newUser.address.zipcode
    ) {
      alert("All fields are required. Please fill out all fields.");
      return;
    }

    const total = (parseFloat(newUser.net) || 0) + (parseFloat(newUser.gross) || 0);

    try {
      const createdUser = await createUserApi({ ...newUser, total });
      setRowData((prevData) => [...prevData, createdUser]);
      setFilteredData((prevData) => [...prevData, createdUser]);
      setNewUser({
        id: "",
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        company: { name: "", catchPhrase: "" },
        address: { street: "", city: "", zipcode: "" },
        net: 0,
        gross: 0,
      });
      setShowModal(false);
      alert("User added successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = rowData.filter((row) =>
      [row.name, row.email, row.username].some((field) =>
        field.toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  const [columnDefs] = useState([
    { field: "id", headerName: "ID", editable: false },
    { field: "name", headerName: "Name", editable: true },
    { field: "username", headerName: "Username", editable: true },
    { field: "email", headerName: "Email", editable: true },
    { field: "phone", headerName: "Phone", editable: true },
    {
      field: "gross",
      headerName: "Gross Salary",
      editable: true,
      valueSetter: (params) => {
        params.data.gross = parseFloat(params.newValue) || 0;
        params.data.total =
          (params.data.net || 0) + (parseFloat(params.newValue) || 0);
        return true;
      },
    },
    {
      field: "net",
      headerName: "Net Salary",
      editable: true,
      valueSetter: (params) => {
        params.data.net = parseFloat(params.newValue) || 0;
        params.data.total =
          (params.data.gross || 0) + (parseFloat(params.newValue) || 0);
        return true;
      },
    },
    { field: "total", headerName: "Total Salary", editable: false },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <button
          onClick={() => handleDeleteUser(params.data.id)}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "3px",
          }}
        >
          Delete
        </button>
      ),
    },
  ]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, email, or username..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "70%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            Create User
          </button>
          <button
            onClick={handleSaveChanges}
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
          }}
          onCellValueChanged={handleCellValueChange}
        />
      </div>

      <CreateUserModal
        showModal={showModal}
        newUser={newUser}
        setNewUser={setNewUser}
        handleCreateUser={handleCreateUser}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default GridWithApiData;

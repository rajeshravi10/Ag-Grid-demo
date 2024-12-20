import React from "react";

const CreateUserModal = ({
  showModal,
  newUser,
  setNewUser,
  handleCreateUser,
  setShowModal,
}) => {
  if (!showModal) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        borderRadius: "10px",
      }}
    >
      <h3>Create New User</h3>
      <input
        type="text"
        placeholder="ID"
        value={newUser.id}
        onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={newUser.phone}
        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Website"
        value={newUser.website}
        onChange={(e) => setNewUser({ ...newUser, website: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company Name"
        value={newUser.company.name}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            company: { ...newUser.company, name: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="CatchPhrase"
        value={newUser.company.catchPhrase}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            company: { ...newUser.company, catchPhrase: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="Street"
        value={newUser.address.street}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            address: { ...newUser.address, street: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="City"
        value={newUser.address.city}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            address: { ...newUser.address, city: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="Zipcode"
        value={newUser.address.zipcode}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            address: { ...newUser.address, zipcode: e.target.value },
          })
        }
      />
      <input
        type="number"
        placeholder="Net Salary"
        value={newUser.net}
        onChange={(e) =>
          setNewUser({ ...newUser, net: Number(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Gross Salary"
        value={newUser.gross}
        onChange={(e) =>
          setNewUser({ ...newUser, gross: Number(e.target.value) })
        }
      />
      <button
        onClick={handleCreateUser}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          margin: "5px",
        }}
      >
        Save
      </button>
      <button
        onClick={() => setShowModal(false)}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          margin: "5px",
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default CreateUserModal;

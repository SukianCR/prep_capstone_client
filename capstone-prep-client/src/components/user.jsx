import { useState } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./userSlice";

/**
 * Displays user information and allows users to either
 * update or delete the user.
 */
function User({ user }) {
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [lastname, setLastname] = useState(user.lastname);
  const [firstname, setFirstname] = useState(user.firstname);

  function onEdit(event) {
    event.preventDefault();
    if (editing) {
      updateUser({ id: user.id, email, password, lastname, firstname });
    }
    setEditing(!editing);
  }

  const editFields = (
    <>
      <td className="edit_input">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </td>
      <td className="edit_input">
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </td>
      <td className="edit_input">
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </td>
    </>
  );

  function Delete_Button({ id, email }) {
    if (email === window.sessionStorage.getItem("Current_User")) {
      return (
        <button className="shine" onClick={() => deleteUser(id)} disabled>
          Delete
        </button>
      );
    }
    return (
      <button className="shine" onClick={() => deleteUser(id)}>
        Delete
      </button>
    );
  }

  return (
    <tr className="table_titles">
      {editing ? (
        editFields
      ) : (
        <>
          <td>{email}</td>
          <td>{lastname}</td>
          <td>{firstname}</td>
        </>
      )}
      <td className="buttons_users">
        <button className="shine" onClick={onEdit}>{editing ? "Save" : "Edit"}</button>

        <Delete_Button id={user.id} email={user.email} />
      </td>
    </tr>
  );
}

export default User;

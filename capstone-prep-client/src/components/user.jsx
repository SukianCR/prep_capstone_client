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
      <td>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </td>
    </>
  );

  return (
    <tr>
      {editing ? (
        editFields
      ) : (
        <>
          <td>{email}</td>
          <td>{password}</td>
          <td>{lastname}</td>
          <td>{firstname}</td>
        </>
      )}
      <td>
        <button onClick={onEdit}>{editing ? "Save" : "Edit"}</button>
        <button onClick={() => deleteUser(user.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default User;

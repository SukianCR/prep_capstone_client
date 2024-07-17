import User from "./user";
import { useGetUsersQuery } from "./userSlice";
import "./userTable.css";

/**
 * UserList displays a list of users
 */
function UserTable() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const usersArray = users && users["users"];
  console.log(usersArray);

  return (
    <section>
      <h2>Users</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Lastname</th>
            <th>Firstname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            usersArray.map((user) => <User key={user.id} user={user} />)}
        </tbody>
      </table>
    </section>
  );
}

export default UserTable;

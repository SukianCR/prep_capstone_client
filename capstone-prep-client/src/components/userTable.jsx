import User from "./user";
import { useGetUsersQuery } from "./userSlice";

import { useNavigate } from "react-router-dom";

/**
 * UserList displays a list of users
 */
function UserTable() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const usersArray = users && users["users"];
  console.log(usersArray);
  const navigate = useNavigate();
  const Logout = () => {
    if (window.sessionStorage.getItem("Token")) {
      window.sessionStorage.removeItem("Token");
      window.sessionStorage.removeItem("Current_User");
    }

    navigate("/Login");
  };

  return (
    <section>
      <div className="center">
        <h2 className=" playwrite title_space">USERS</h2>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      <div className="space-m"></div>
      <table className="users">
        <thead>
          <tr className="table_titles">
            <th>Email</th>

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
      <div className="buttons_users">
        <button onClick={Logout} className="btn btn-primary playwrite">
          Log Out
        </button>
      </div>
    </section>
  );
}

export default UserTable;

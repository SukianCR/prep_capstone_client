import { Link } from "react-router-dom";

export default function Head() {
  return (
    <div className=" center_nav ">
      <ul className="head">
        <li className=" nav-item   ">
          <Link to="/login" className="blue">Login</Link>
        </li>

        <li className="nav-item  ">
          <Link to="/registration" className="coral">Registration</Link>
        </li>
      </ul>
    </div>
  );
}

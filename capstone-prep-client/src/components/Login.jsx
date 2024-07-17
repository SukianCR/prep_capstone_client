import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./../app/api";
import Foot from "./Foot";

export default function Login() {
  const [form, setForm] = useState({});
  const [errM, setErrM] = useState(null);
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();

  const submit = async (e) => {
    e.preventDefault();

    try {
      let success = false;

      console.log("form", form);
      success = await loginUser(form).unwrap();

      console.log("sux es" + success);

      if (success) {
        window.sessionStorage.setItem("Token", success.token);
        navigate("/");
      }
    } catch (err) {
      setErrM(err?.data?.message);
    }
  };

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="space-lg"></div>

      <div className="  center">
        <div className="register">
          <p className=" playwrite title_space">Log-in</p>

          <form onSubmit={submit} name="formRegister">
            <div className="form-group">
              <label></label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={updateForm}
                required
              />
            </div>
            <div className="form-group">
              <label></label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={updateForm}
                required
              />
            </div>

            <div className="form-group">
              <label></label>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          {errM && (
            <div>
              <p className="space"></p>
              <p className="error">{errM}</p>
            </div>
          )}
        </div>
      </div>
      <div className="space"></div>
      <Foot />
    </>
  );
}

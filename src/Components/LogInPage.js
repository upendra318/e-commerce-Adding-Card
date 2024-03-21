import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from "./FireBaseConfig";
export default function LogIn({ setLogInStatus, setUser }) {
  const navigate = useNavigate();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChangeData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const onSubmitData = async (e) => {
    e.preventDefault();
    if (formData.email === "") {
      alert("Email is required");
    }
    if (formData.password === "") {
      alert("Password is required");
    }
    if (formData.email !== "" || formData.password !== "") {
      try {
        setButtonStatus(true);
        const res = await signInWithEmailAndPassword(
          database,
          formData.email,
          formData.password
        ).then(() => {
          setUser(formData);
          setLogInStatus(true);
          navigate("itemlist");
        });
      } catch (err) {
        alert(err.message);
      } finally {
        setButtonStatus(false);
      }
    }
    console.log(formData);
  };

  return (
    <div className="LogIn">
      <h1>Login</h1>
      <form onSubmit={onSubmitData}>
        <div>
          <div>
            <label>Email: </label>
          </div>
          <div>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={onChangeData}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Password: </label>
          </div>
          <div>
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={onChangeData}
            />
          </div>
        </div>
        <input type="submit" value="Submit" disabled={buttonStatus} />
      </form>
      <div>
        <span>Have an Account </span>
        <span>
          <Link to="/">SignUp</Link>
        </span>
      </div>
    </div>
  );
}

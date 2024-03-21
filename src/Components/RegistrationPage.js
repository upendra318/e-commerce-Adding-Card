import { useEffect, useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import emailjs from "@emailjs/browser";

export default function Registration() {
  const form = useRef();
  const navigate = useNavigate();

  const [buttonStatus, setButtonStatus] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: 
      Math.floor(10000000 + Math.random() * 90000000)
    ,
  });
  // useEffect(() => {
  //   const val = Math.floor(10000000 + Math.random() * 90000000);
  //   setFormData((prev) => {
  //     return { ...prev, otp: val };
  //   });
  //   //console.log(formData)
  // }, []);
  
  const onChangeData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmitData = async (e) => {
    e.preventDefault();
    if (formData.name === "") {
      alert("Name is required");
    }
    if (formData.email === "") {
      alert("Email is required");
    }
    if (formData.password === "") {
      alert("Password is required");
    }
    if (
      formData.email !== "" ||
      formData.name !== "" ||
      formData.password !== ""
    ) {
      try {
        setButtonStatus(true);
        emailjs
          .sendForm("service_e88vyo8", "template_kwrjxwc", form.current, {
            publicKey: "J25Fxo_socbELqu7j",
          })
          .then(
            (response) => {
              alert("OTP Sent to your email please verify it...", response);
            },
            (error) => {
              alert("Email sending failed:", error.text);
            }
          );

          localStorage.setItem("otp", formData.otp)
        navigate("verification", { state: formData });
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setButtonStatus(false);
      }
    }
  };

  return (
    <div className="Registration">
      <h1>Register</h1>
      <form ref={form} onSubmit={onSubmitData}>
        <div>
          <div>
            <label>Name: </label>
          </div>
          <div>
            <input
              type="text"
              value={formData.name}
              name="name"
              onChange={onChangeData}
            />
          </div>
        </div>
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
            <input
              type="text"
              value={formData.otp}
              name="otp"
              onChange={onChangeData}
              style={{ display: "none" }} // hide the input, but keep its value in form submission
            />
          </div>
        </div>

        <input type="submit" value="Submit" disabled={buttonStatus} />
      </form>
      <div>
        <span>Have an Account </span>
        <span>
          <Link to="login">SignIn</Link>
        </span>
      </div>
    </div>
  );
}

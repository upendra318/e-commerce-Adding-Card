import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { database } from "./FireBaseConfig";

export default function Verification() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  console.log(formData);
  const [userOtp, setUserOtp] = useState("");

  const handleVerification = async (e) => {
    e.preventDefault();
    const trimmedUserOtp = userOtp.trim();
    console.log("Entered OTP:", trimmedUserOtp);
    //console.log("Expected OTP:", .opt);
    if (trimmedUserOtp == localStorage.getItem("otp")) {
      // Use strict equality operator (===)
      try {
        const res = await createUserWithEmailAndPassword(
          database,
          formData.email,
          formData.password
        );
        await updateProfile(res.user, {
          displayName: formData.name,
        });
        alert("Your Account was created please use Login page for Login");
        navigate("/");
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="LogIn">
      <form id="verification-form" onSubmit={handleVerification}>
        <div>
          <div>
            <label>Enter OTP: </label>
          </div>
          <div>
            <input
              type="text"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
            />
            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

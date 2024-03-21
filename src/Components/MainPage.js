import ItemListPages from "./ItemsList";
import LogIn from "./LogInPage";
import Registration from "./RegistrationPage";
import Verification from "./VerficationPage";
import { signOut } from "firebase/auth";
import { database } from "./FireBaseConfig";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import Header from "./Hearder";
import { useState, useEffect } from "react";

export default function MainPage() {
  const [logInStatus, setLogInStatus] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    // Perform sign-out when the component mounts
    signOut(database);
  }, []);

  return (
    <div className="Main">
      {logInStatus && <Header setLogInStatus={setLogInStatus} />}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/verification" element={<Verification />} />
          <Route
            path="/login"
            element={
              <LogIn setUser={setUser} setLogInStatus={setLogInStatus} />
            }
          />
          <Route
            path="login/itemlist"
            element={
              logInStatus ? (
                <ItemListPages user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

import { signOut } from "firebase/auth";
import { database } from "./FireBaseConfig";

export default function Header({ setLogInStatus }) {
  const Logout = () => {
    signOut(database).then(() => {
      setLogInStatus(false);
    });
  };
  return (
    <div>
      <button onClick={Logout}>Logout</button>
    </div>
  );
}

import { useContext } from "react";
import UserContext from "../context/user";

export default function Timeline() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <p>This is a Timeline </p>
    </div>
  );
}

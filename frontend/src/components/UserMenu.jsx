import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";

export default function UserMenu() {
  const user = useSelector((state) => state.user);
  console.log("Current User", user);

  return (
    <div>
      <div className="font-semibold">My Account </div>
      <div className="text-sm">{user?.name || user?.mobile}</div>
      <Divider />
      <div className="text-sm grid gap-2">
        <Link to={""} className="px-2 ">
          {" "}
          My orders
        </Link>
        <Link to={""} className="px-2 ">
          {" "}
          Save Address
        </Link>
        <button className="text-sm text-red-500">Logout</button>
      </div>
    </div>
  );
}

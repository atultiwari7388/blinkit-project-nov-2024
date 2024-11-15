import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[200px,1fr] gap-3">
        {/** Left for menu */}
        <div className="py-4 sticky top-24 overflow-y-auto hidden lg:block">
          <UserMenu />
        </div>
        {/** Right for content */}
        <div className="bg-white p-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

import { Link, NavLink } from "react-router-dom";
import { appRouters_qtv } from "../routes/route_qtv.config";

export function SidesMenu_QTV(props) {
  const { collapsed } = props;
  return (
    <div
      className={`h-screen  ${
        collapsed ? "w-16" : "w-64"
      } transition-all ease-in-out duration-300  w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5`}
    >
      <div className="mt-5">
        {/* <div className={`${collapsed ? "p-2" : "p-8"} text-center`}>
          <Link to="/">
            <span className="text-white text-2xl font-bold">Logo</span>
          </Link>
        </div> */}
        <ul className="mt-5">
          {appRouters_qtv
            .filter((item) => item.showInMenu)
            .map((route) => (
              <li key={route.path} className="p-2">
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `flex items-center ${collapsed ? "pl-2" : "pl-8"} ${
                      isActive
                        ? " text-gray-100 font-bold  rounded-2xl bg-green-700 p-2"
                        : "text-green-500 font-semi hover:text-green-900 p-2"
                    }`
                  }
                >
                  <span className="mr-2 text-base">
                    {route.icon && <route.icon className="h-6 w-6" />}
                  </span>
                  <span className="text-base">{route.name}</span>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

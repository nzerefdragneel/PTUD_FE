import Home from "../components/home.component"
import Profile from "../components/profile.component"
import Register_Insurance from "../components/register.component"
import Status_User from "../components/status_user.component"
import {
  BookmarkIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon
} from "@heroicons/react/24/solid"

export const appRouters = [
  {
    path: "/home",
    title: "home",
    name: "Trang chủ",
    icon: HomeIcon,
    showInMenu: true,
    component: <Home/>
  },
  {
    path: "/profile",
    title: "profile",
    name: "Hồ sơ cá nhân",
    icon: BookmarkIcon,
    showInMenu: true,
    component:<Profile/>
  },
  {
    path: "/register",
    title: "register",
    name: "Đăng ký bảo hiểm ",
    icon: BookmarkIcon,
    showInMenu: true,
    component:<Register_Insurance/>
  },
  {
    path: "/status_user",
    title: "status_user",
    name: "Tình trạng đăng ký",
    icon: BookmarkIcon,
    showInMenu: true,
    component:<Status_User/>
  },
  

]

export const routers = [...appRouters]

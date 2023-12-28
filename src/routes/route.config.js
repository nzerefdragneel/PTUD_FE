import EditUser from "../components/edituser.component"
import Home from "../components/home.component"
import Register_Insurance from "../components/register.component"
import User_Profile from "../components/user_profile.component"
import EditAccount from "../components/editAccount.component"
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
    path: "/user_profile",
    title: "user_profile",
    name: "Profile",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <User_Profile/>
  },
  // {
  //   path: "/profile",
  //   title: "profile",
  //   name: "Hồ sơ cá nhân",
  //   icon: BookmarkIcon,
  //   showInMenu: true,
  //   component:<Profile/>
  // },
  
  {
    path: "/register",
    title: "register",
    name: "Đăng ký bảo hiểm ",
    icon: BookmarkIcon,
    showInMenu: true,
    component:<Register_Insurance/>
  },
  {
    path: "/edituser",
    title: "edituser",
    name: "Cập nhật thông tin ",
    icon: BookmarkIcon,
    showInMenu: true,
    component:<EditUser/>
  },
  {
    path: "/editAccount",
    title: "editAccount",
    name: "Cài đặt tài khoản ",
    icon: BookmarkIcon,
    showInMenu: true,
    component:<EditAccount/>
  },

 
  
]

export const routers = [...appRouters]

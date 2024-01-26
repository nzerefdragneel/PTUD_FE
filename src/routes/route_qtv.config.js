import EditUser from "../components/edituser.component";
import Home from "../components/home.component";
import AddRegister from "../components/register.component";
import User_Profile from "../components/user_profile.component";
import EditAccount from "../components/editAccount.component";
import Health_Declaration from "../components/health_declaration.component";
import XemGoiBaoHiemScreen from "../screen/xemGoiBaoHiemScreen";
import CongTyScreen from "../screen/congTyScreen";
import DongPhi from "../components/dongPhi.component";
import ChiTietDongPhi from "../components/chiTietDongPhi.component";
import YeuCauChiTra from "../components/yeuCauChiTra.component";
import YeuCauTuVan from "../components/yeuCauTuVan.component";
import Status_Register from "../components/status_register.component";
import { faL } from "@fortawesome/free-solid-svg-icons";
import addCustomerComponent from "../components/addCustomer.component";
import AdminAccountList from "../components/AdminAccountList.component";
import AddAdmin from "../components/addAdmin.component";
import Nhanvien_Profile from "../components/NV_profile.component";

import ThemNhanVienComponent from "../components/AdminAddNV.component";
import {
  BookmarkIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";

export const appRouters_qtv = [
  {
    path: "/home",
    title: "home",
    name: "Trang chủ",
    icon: HomeIcon,
    showInMenu: true,
    component: <Home />,
  },
  {
    path: "/nhanvien_Profile",
    title: "nhanvien_Profile",
    name: "Hồ sơ nhân viên",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <Nhanvien_Profile />,
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
    path: "/edituser",
    title: "edituser",
    name: "Cập nhật thông tin ",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <EditUser />,
  },
  {
    path: "/editAccount",
    title: "editAccount",
    name: "Cài đặt tài khoản ",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <EditAccount />,
  },
  {
    path: "/addAdmin",
    title: "addAdmin",
    name: "Thêm hồ sơ cá nhân",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <AddAdmin />,
  },
  {
    path: "/adminAccountList",
    title: "adminAccountList",
    name: "Danh sách tài khoản",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <AdminAccountList />,
  },
  {
    path: "/adminAdd",
    title: "adminAdd",
    name: "Thêm nhân sự ",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <ThemNhanVienComponent />,
  },

  // {
  //   path: "/editAccount",
  //   title: "editAccount",
  //   name: "Danh sách người dùng ",
  //   icon: BookmarkIcon,
  //   showInMenu: true,
  //   component: <EditAccount />,
  // },
  // {
  //   path: "/editAccount",
  //   title: "editAccount",
  //   name: "Thêm nhân viên ",
  //   icon: BookmarkIcon,
  //   showInMenu: true,
  //   component: <EditAccount />,
  // },
];

export const routers = [...appRouters_qtv];

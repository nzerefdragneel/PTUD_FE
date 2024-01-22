import EditUser from "../components/edituser.component";
import Home from "../components/home.component";
import Register_Insurance from "../components/register.component";
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

import {
  BookmarkIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";

export const appRouters_taiChinh = [
  {
    path: "/home",
    title: "home",
    name: "Trang chủ",
    icon: HomeIcon,
    showInMenu: true,
    component: <Home />,
  },
  {
    path: "/user_profile",
    title: "user_profile",
    name: "Profile",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <User_Profile />,
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
    showInMenu: true,
    component: <EditUser />,
  },
  {
    path: "/editAccount",
    title: "editAccount",
    name: "Cài đặt tài khoản ",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <EditAccount />,
  },
  {
    path: "/editAccount",
    title: "editAccount",
    name: "Xử lý yêu cầu chi trả ",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <EditAccount />,
  },
  {
    path: "/editAccount",
    title: "editAccount",
    name: "Xác định chi phí bảo hiểm",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <EditAccount />,
  },
  {
    path: "/editAccount",
    title: "editAccount",
    name: "Xác nhận thanh toán chi phí",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <EditAccount />,
  },
  {
    path: "/editAccount",
    title: "editAccount",
    name: "Lịch sử chi trả",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <EditAccount />,
  },
];

export const routers = [...appRouters_taiChinh];

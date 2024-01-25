import EditUser from "../components/edituser.component";
import Home from "../components/home.component";
import Register_Insurance from "../components/register.component";
import User_Profile from "../components/user_profile.component";
import EditAccount from "../components/editAccount.component";
import TC_QuanLiThanhToan from "../components/tc_quanLyThanhToan.component";
import Status_Register from "../components/status_register.component";
import { faL } from "@fortawesome/free-solid-svg-icons";
import AddNhanVienTC from "../components/addNhanVienTC.component";
import Nhanvien_Profile from "../components/NV_profile.component";
import Nv_duyetYeuCauChiTra from "../components/nv_duyetYeuCauChiTra.component";
import Nv_xacDinhChiPhiBaoHiem from "../components/nv_xacDinhChiPhiBaoHiem.component";
import Nv_lichSuChiTra from "../components/nv_lichSuChiTra.component";
import Nv_chinhSuaHopDong from "../components/nv_chinhSuaHopDong.component";

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
    path: "/addNhanVienTC",
    title: "addNhanVienTC",
    name: "Thêm hồ sơ cá nhân ",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <AddNhanVienTC />,
  },
  {
    path: "/nhanvien/duyetYCCT",
    title: "duyetYCCT",
    name: "Xử lý yêu cầu chi trả ",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <Nv_duyetYeuCauChiTra />,
  },
  {
    path: "/nhanvien/xdChiPhiBH",
    title: "xacDinhChiPhiBH",
    name: "Xác định chi phí bảo hiểm",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <Nv_xacDinhChiPhiBaoHiem />,
  },

  {
    path: "/nhanvien/csHopDong",
    title: "chinhSuaHopDong",
    name: "Chỉnh sửa hợp đồng",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <Nv_chinhSuaHopDong />,
  },

  {
    path: "/taichinh/TC_QuanLiThanhToan",
    title: "editAccount",
    name: "Quản lý thanh toán",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <TC_QuanLiThanhToan />,
  },

  {
    path: "/nhanvien/lichSuChiTra",
    title: "lichSuChiTra",
    name: "Lịch sử chi trả",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <Nv_lichSuChiTra />,
  },
];

export const routers = [...appRouters_taiChinh];

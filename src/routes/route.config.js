import EditUser from "../components/edituser.component";
import Home from "../components/home.component";
import Register_Insurance from "../components/register.component";
import User_Profile from "../components/user_profile.component";
import EditAccount from "../components/editAccount.component";
import Health_Declaration from "../components/health_declaration.component";
import AddNhanVienTC from "../components/addNhanVienTC.component";
import XemGoiBaoHiemScreen from "../screen/xemGoiBaoHiemScreen";
import CongTyScreen from "../screen/congTyScreen";
import DongPhi from "../components/dongPhi.component";
import ChiTietDongPhi from "../components/chiTietDongPhi.component";
import YeuCauChiTra from "../components/yeuCauChiTra.component";
import YeuCauTuVan from "../components/yeuCauTuVan.component";
import Status_Register from "../components/status_register.component";
import { faL } from "@fortawesome/free-solid-svg-icons";
import addCustomerComponent from "../components/addCustomer.component";
import PhieuDangKyList from "../components/Maganage_Application.component";
import DanhSachKyKetList from "../components/Calendar_Application.component";
import AdminAccountList from "../components/AdminAccountList.component";
import GoiBaoHiemCuaToi from "../components/goiBaoHiemCuaToi.component";
import ThemNhanVienComponent from "../components/AdminAddNV.component";
import {
  BookmarkIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";

export const appRouters = [
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
  {
    path: "/goiBaoHiemCuaToi",
    title: "goiBaoHiemCuaToi",
    name: "Gói bảo hiểm của tôi",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <GoiBaoHiemCuaToi />,
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
    path: "/xemGoiBaoHiem",
    title: "Danh sách gói bảo hiểm",
    name: "Đăng ký bảo hiểm ",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <XemGoiBaoHiemScreen />,
  },
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
    showInMenu: false,
    component: <EditAccount />,
  },
  {
    path: "/healthDeclaration",
    title: "healthDeclacation",
    name: "Khai báo sức khoẻ  ",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <Health_Declaration />,
  },

  {
    path: "/dongPhi",
    title: "dongphi",
    name: "Đóng phí",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <DongPhi />,
  },
  // {
  //     path: '/congTy',
  //     title: 'congty',
  //     name: 'Công ty',
  //     icon: BookmarkIcon,
  //     showInMenu: true,
  //     component: <CongTyScreen />,
  // },

  {
    path: "/statusRegister",
    title: "statusRegister",
    name: "Theo dõi đơn đăng ký",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <Status_Register />,
  },
  {
    path: "/addCustomer",
    title: "addCustomer",
    name: "Thêm hồ sơ khách hàng",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <AddNhanVienTC />,
  },

  {
    path: "/yeuCauChiTra",
    title: "YeuCauChiTra",
    name: "Yêu cầu chi trả",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <YeuCauChiTra />,
  },
  {
    path: "/yeuCauTuVan",
    title: "yeuCauTuVan",
    name: "Yêu cầu tư vấn",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <YeuCauTuVan />,
  },

  {
    path: "/manageApplications",
    title: "manageApplications",
    name: "Phiếu Đăng Ký Chờ Duyệt",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <PhieuDangKyList />,
  },
  {
    path: "/calendarApplications",
    title: "calendarApplications",
    name: "Danh sách đã duyệt",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <DanhSachKyKetList />,
  },
  {
    path: "/adminAccountList",
    title: "adminAccountList",
    name: "Danh sách tài khoản",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <AdminAccountList />,
  },
];

export const routers = [...appRouters];

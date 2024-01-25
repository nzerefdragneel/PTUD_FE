import EditUser from "../components/edituser.component";
import Home from "../components/home.component";
import AddRegister from "../components/register.component";
import User_Profile from "../components/user_profile.component";
import EditAccount from "../components/editAccount.component";
import Health_Declaration from "../components/health_declaration.component";
import XemGoiBaoHiemScreen from "../screen/xemGoiBaoHiemScreen";
import NV_ds_GoiBaoHiem from "../components/nv_ds_GoiBaoHiem.component";
import ChinhSuaGoiBaoHiem from "../components/nv_chinhSuaGoiBaoHiem.component";
import PhatHanhGoiBaoHiem from "../components/nv_phatHanhGBH.component";
import NV_chonLichTuVan from "../components/nv_chonLichTuVan.component";
import NV_chonLichKiHopDong from "../components/nv_chonLichKiHopDong.component";
import Nv_chinhSuaHopDong from "../components/nv_chinhSuaHopDong.component";
import NV_ChonLichHenKH from "../components/nv_chonLichGapKH.component";
import NV_ds_chinhSach from "../components/nv_ds_chinhSach.component";
import NV_ds_GBH from "../components/nv_ds_GBH.component";
import NV_TiepNhanTuVan from "../components/nv_tiepNhanTuVan.component";
import NV_LichHenCuaToi from "../components/nv_lichHenCuaToi.component";
import NV_LichSuGapKhachHang from "../components/nv_lichSuGapKH.component";
import { faL } from "@fortawesome/free-solid-svg-icons";
import AddNhanVien from "../components/addNhanVien.component";
import PhieuDangKyList from "../components/Maganage_Application.component";
import DanhSachKyKetList from "../components/Calendar_Application.component";
import {
  BookmarkIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";
import Nhanvien_Profile from "../components/NV_profile.component";

export const appRouters_nv = [
  // {
  //   path: "/home",
  //   title: "home",
  //   name: "Trang chủ",
  //   icon: HomeIcon,
  //   showInMenu: true,
  //   component: <Home />,
  // },
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
    path: "/editAccount",
    title: "editAccount",
    name: "Cài đặt tài khoản ",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <EditAccount />,
  },

  {
    path: "/nhanvien/goiBaoHiem",
    title: "phatHanhGoiBaoHiem",
    name: "Phát hành gói bảo hiểm",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <NV_ds_GoiBaoHiem />,
  },
  {
    path: "/nhanVien/dsCSach",
    title: "phatHanhChinhSach",
    name: "Phát hành chính sách",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <NV_ds_chinhSach />,
  },
  {
    path: "/nhanvien/ds_gbh",
    title: "chinhSuaDanhSachChinhSach",
    name: "Chỉnh sửa danh sách chính sách",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <NV_ds_GBH />,
  },
  // {
  //   path: "/nhanVien/goiBaoHiem",
  //   title: "phatHanhGoiBaoHiem",
  //   name: "Tiếp nhận đăng kí",
  //   icon: BookmarkIcon,
  //   showInMenu: true,
  //   component: <NV_ds_GoiBaoHiem />,
  // },
  {
    path: "/nhanvien/NV_ChonLichHenKH",
    title: "NV_ChonLichHenKH",
    name: "Chọn lịch hẹn khách hàng",
    icon: BookmarkIcon,
    showInMenu: false,
    component: <NV_ChonLichHenKH />,
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
    path: "/manageApplications",
    title: "manageApplications",
    name: "Phiếu Đăng Ký Chờ Duyệt",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <PhieuDangKyList />,
  },
  {
    path: "/calendarApplications",
    title: "calendarApplications",
    name: "Danh sách đã duyệt",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <DanhSachKyKetList />,
  },
  {
    path: "/nhanvien/NV_TiepNhanTuVan",
    title: "tiepNhanTuVan",
    name: "Tiếp nhận tư vấn",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <NV_TiepNhanTuVan />,
  },
  {
    path: "/nhanvien/NV_LichHenCuaToi",
    title: "NV_LichHenCuaToi",
    name: "Lịch hẹn của tôi",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <NV_LichHenCuaToi />,
  },
  {
    path: "/nhanvien/NV_LichSuGapKhachHang",
    title: "NV_LichSuGapKhachHang",
    name: "Lịch sử gặp khách hàng",
    icon: BookmarkIcon,
    showInMenu: true,
    component: <NV_LichSuGapKhachHang />,
  },
];

export const routers = [...appRouters_nv];

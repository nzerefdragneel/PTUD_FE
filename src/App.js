import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import userService from "./services/user.service";
import AuthVerify from "./common/authVerify";
import { Routes, BrowserRouter, Navigate, Route, Link } from "react-router-dom";
import { SidesMenu } from "./components/sidebar.component";
import { SidesMenu_nv } from "./components/sidebar_nv.component";
import { SidesMenu_QTV } from "./components/sidebar_qtv.component";
import { SidesMenu_TC } from "./components/sidebar_taiChinh.component";
import LoginScreen from "./screen/loginScreen";
// Dong phi: import DongPhiScreen from "./screen/dongPhiScreen";
import DongPhi from "./components/dongPhi.component";
import XemGoiBaoHiemScreen from "./screen/xemGoiBaoHiemScreen";
import CongTyScreen from "./screen/congTyScreen";
import Home from "./components/home.component";
import Lading from "./components/lading.component";
import Signup from "./components/signup.component";
import EditUser from "./components/edituser.component";
import Profile from "./components/profile.component";
import SimpleFooter from "./components/footer.component";
import ChiTietDongPhi from "./components/chiTietDongPhi.component";
import Bus from "./common/bus";
import SignupScreen from "./screen/signupScreen";
import AddRegister from "./components/register.component";
import User_Profile from "./components/user_profile.component";
import EditAccount from "./components/editAccount.component";
import Health_Declaration from "./components/health_declaration.component";
import ChiTietGoiBaoHiem from "./components/chiTietGoiBaoHiem.component";
import YeuCauChiTra from "./components/yeuCauChiTra.component";
import YeuCauTuVan from "./components/yeuCauTuVan.component";
import GoiBaoHiemCuaToi from "./components/goiBaoHiemCuaToi.component";
import ChiTietGoiBaoHiemCuaToi from "./components/chiTietGoiBaoHiemCuaToi.component";
// Tinh trang don dang ky: import Status_Register from "./components/status_register.component";
import NV_ds_GoiBaoHiem from "./components/nv_ds_GoiBaoHiem.component";
// import ChinhSuaGoiBaoHiem from "./components/nv_chinhSuaGoiBaoHiem.component";
import PhatHanhGoiBaoHiem from "./components/nv_phatHanhGBH.component";
import NV_ChiTietGoiBaoHiem from "./components/nv_chiTietGoiBaoHiem.component";
import NV_chonLichTuVan from "./components/nv_chonLichTuVan.component";
import NV_chonLichKiHopDong from "./components/nv_chonLichKiHopDong.component";
import NV_ds_chinhSach from "./components/nv_ds_chinhSach.component";
import NV_ds_GBH from "./components/nv_ds_GBH.component";
import TC_QuanLiThanhToan from "./components/tc_quanLyThanhToan.component";
import NV_TiepNhanTuVan from "./components/nv_tiepNhanTuVan.component";
import NV_ChonLichHenKH from "./components/nv_chonLichGapKH.component";
import NV_LichHenCuaToi from "./components/nv_lichHenCuaToi.component";
import AddCustomerComponent from "./components/addCustomer.component";
import Status_Register from "./components/status_register.component";
import Nv_ds_allCS from "./components/nv_ds_allCS.component";
import TC_xacNhanTT from "./components/tc_xacNhanThanhToan.component";
import NV_LichSuGapKhachHang from "./components/nv_lichSuGapKH.component";
import NV_LichSu_KiHopDong from "./components/nv_lichSuGapKH_kiHopDong.component";
import NV_LichSu_TuVan from "./components/nv_lichSuGapKH_tuVanBH.component";
import Nv_duyetYeuCauChiTra from "./components/nv_duyetYeuCauChiTra.component";
import PhieuDangKyList from "./components/Maganage_Application.component";
import DanhSachKyKetList from "./components/Calendar_Application.component";
import AdminAccountList from "./components/AdminAccountList.component";
import ThemNhanVienComponent from "./components/AdminAddNV.component";
import Nhanvien_Profile from "./components/NV_profile.component";
import AddNhanVien from "./components/addNhanVien.component";
import AddNhanVienTC from "./components/addNhanVienTC.component";
import AddAdmin from "./components/addAdmin.component";
import VerifyEmailComponent from "./components/verifyEmail.component";
import VerifyScreen from "./screen/verifyScreen";
import Nv_xacDinhChiPhiBaoHiem from "./components/nv_xacDinhChiPhiBaoHiem.component";
import Nv_lichSuChiTra from "./components/nv_lichSuChiTra.component";
import Nv_chinhSuaHopDong from "./components/nv_chinhSuaHopDong.component";
import { Toaster } from "react-hot-toast";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      roles: "",
      token: "",
    };
  }

  /* Tien:
       componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user !== null) {
            const roles = userService.getRoles(user.iD_TaiKhoan);
            this.setState({
                currentUser: user,
                roles: roles,
            });
        } */

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user !== null) {
      const token = user.accessToken;
      const role = user.taiKhoan.loaiTaiKhoan;
      this.setState({
        currentUser: user,
        roles: role,
        token: token,
      });
    }
    Bus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    Bus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      roles: "",
      token: "",
    });
  }

  render() {
    const currentUser = this.state.currentUser;
    const curentRole = this.state.roles;
    console.log(currentUser);
    return (
      <div className="">
        {/* headers */}
        <Toaster />
        <div className="pt-3 pb-4 px-30 flex flex-row  justify-between border-b mb-2 bg-black">
          <div className="flex flex-row flex-wrap text-balance  items-center">
            <a href="/" className="nav-link">
              <img
                src="./assets/logo_0.png"
                className="h-16 w-auto mr-2"
                alt="logo"
              />
            </a>
          </div>

          {currentUser ? (
            // Header sau khi đăng nhập

            <div className="flex flex-row gap-2 text-lg">
              <a href="/" className="nav-link">
                <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                  Trang chủ
                </div>
              </a>

              {
                <a href="/xemGoiBaoHiem" className="nav-link">
                  <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                    Danh mục sản phẩm
                  </div>
                </a> /*
              <a href="/status_user" className="nav-link">
                <div className="px-6 py-2.5 rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                  Tình trạng đăng ký 
                </div>
              </a> */
              }
              <a href="/statusRegister" className="nav-link">
                <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                  Đơn đăng kí của tôi
                </div>
              </a>
              <a href="/login" className="nav-link" onClick={this.logOut}>
                <div
                  className=" rounded-lg hover:bg-pink-400
                 hover:cursor-pointer hover:ease-linear duration-300"
                >
                  Đăng xuất
                </div>
              </a>
            </div>
          ) : (
            <div className="flex flex-row gap-2 text-lg">
              <a href="/" className="nav-link">
                <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                  Trang chủ
                </div>
              </a>
              <a href="/xemGoiBaoHiem" className="nav-link">
                <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                  Danh mục sản phẩm
                </div>
              </a>

              <Link to={"/signup"} className="nav-link">
                <div
                  className=" rounded-lg hover:bg-pink-400
                 hover:cursor-pointer hover:ease-linear duration-300"
                >
                  Đăng ký
                </div>
              </Link>
              <Link to={"/login"} className="nav-link">
                <div className=" rounded-lg hover:bg-pink-400  hover:cursor-pointer hover:ease-linear duration-300">
                  Đăng nhập
                </div>
              </Link>
            </div>
          )}
        </div>
        {/* {role==""? ( */}
        <div className="min-h-screen flex">
          <div
            className="flex-none w-64 
          "
          >
            {currentUser &&
              ((curentRole === "KH" && <SidesMenu />) ||
                (curentRole === "NV" && <SidesMenu_nv />) ||
                (curentRole === "ADMIN" && <SidesMenu_QTV />) ||
                (curentRole === "NVTC" && <SidesMenu_TC />))}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route
                  path="/xemGoiBaoHiem"
                  element={<XemGoiBaoHiemScreen />}
                />
                <Route
                  path="/chi-tiet-goi-bao-hiem/:id"
                  element={<ChiTietGoiBaoHiem />}
                />
                <Route path="/congTy" element={<CongTyScreen />} />
                <Route
                  path="/register/:idGoiBaoHiem"
                  element={<AddRegister />}
                />
                <Route
                  path="/chiTietDongPhi/:id"
                  element={<ChiTietDongPhi />}
                />
                <Route path="/yeuCauTuVan" element={<YeuCauTuVan />} />
                <Route path="/yeuCauChiTra" element={<YeuCauChiTra />} />
                {/* đóng phí */}
                <Route path="/dongPhi" element={<DongPhi />} />
                <Route path="/chiTietDongPhi" element={<ChiTietDongPhi />} />
                {/* gói bảo hiểm của tôi */}
                <Route
                  path="/goiBaoHiemCuaToi"
                  element={<GoiBaoHiemCuaToi />}
                />
                <Route
                  path="/chi-tiet-goi-bao-hiem-cua-khach-hang/:id"
                  element={<ChiTietGoiBaoHiemCuaToi />}
                />
                {/* phát hành gói bảo hiểm */}
                <Route
                  path="/nhanvien/goiBaoHiem"
                  element={<NV_ds_GoiBaoHiem />}
                />
                <Route
                  path="/nhanvien/nv_xem-chi-tiet-goi-bao-hiem/:id"
                  element={<NV_ChiTietGoiBaoHiem />}
                />
                <Route
                  path="/nhanvien/phatHanhGoiBaoHiem"
                  element={<PhatHanhGoiBaoHiem />}
                />
                <Route
                  path="/nhanvien/NV_ChonLichHenKH"
                  element={<NV_ChonLichHenKH />}
                />
                <Route
                  path="/nhanvien/NV_chonLichTuVan"
                  element={<NV_chonLichTuVan />}
                />
                <Route
                  path="/nhanvien/NV_chonLichKiHopDong"
                  element={<NV_chonLichKiHopDong />}
                />
                <Route
                  path="/nhanvien/NV_TiepNhanTuVan"
                  element={<NV_TiepNhanTuVan />}
                />
                <Route
                  path="/nhanvien/NV_LichHenCuaToi"
                  element={<NV_LichHenCuaToi />}
                />
                <Route
                  path="/nhanvien/NV_LichSuGapKhachHang"
                  element={<NV_LichSuGapKhachHang />}
                />
                <Route
                  path="/nhanvien/NV_LichSu_KiHopDong"
                  element={<NV_LichSu_KiHopDong />}
                />
                <Route
                  path="/nhanvien/NV_LichSu_TuVan"
                  element={<NV_LichSu_TuVan />}
                />
                <Route path="/nhanvien/dsCSach" element={<Nv_ds_allCS />} />
                <Route
                  path="/nhanvien/duyetYCCT"
                  element={<Nv_duyetYeuCauChiTra />}
                />
                <Route
                  path="/nhanvien/csHopDong"
                  element={<Nv_chinhSuaHopDong />}
                />
                <Route
                  path="/nhanvien/xdChiPhiBH"
                  element={<Nv_xacDinhChiPhiBaoHiem />}
                />
                <Route
                  path="/nhanvien/lichSuChiTra"
                  element={<Nv_lichSuChiTra />}
                />
                {/* chỉnh sửa danh sách chính sách */}
                <Route path="/nhanvien/ds_gbh" element={<NV_ds_GBH />} />
                <Route
                  path="/nhanvien/chinh-sua-ds-chinh-sach/:id"
                  element={<NV_ds_chinhSach />}
                />
                {/* tài chính */}
                <Route
                  path="/taichinh/TC_QuanLiThanhToan"
                  element={<TC_QuanLiThanhToan />}
                />
                <Route
                  path="/taichinh/TC_xacNhanTT"
                  element={<TC_xacNhanTT />}
                />
                <Route
                  exact
                  path="/"
                  element={
                    currentUser ? <Navigate replace to="/home" /> : <Lading />
                  }
                />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/edituser"
                  element={
                    currentUser ? <EditUser /> : <Navigate replace to="/" />
                  }
                />
                {/* <Route path="/profile" element={<Profile />} /> */}{" "}
                <Route path="/register" element={<AddRegister />} />
                <Route path="/user_profile" element={<User_Profile />} />
                <Route path="/edituser" element={<EditUser />} />
                <Route path="/editAccount" element={<EditAccount />} />
                <Route path="/statusRegister" element={<Status_Register />} />
                <Route path="/addCustomer" element={<AddCustomerComponent />} />
                <Route
                  path="/manageApplications"
                  element={<PhieuDangKyList />}
                />
                <Route
                  path="/calendarApplications"
                  element={<DanhSachKyKetList />}
                />
                <Route
                  path="/healthDeclaration"
                  element={<Health_Declaration />}
                />
                <Route
                  path="/adminAccountList"
                  element={<AdminAccountList />}
                />
                <Route path="/adminAdd" element={<ThemNhanVienComponent />} />
                <Route
                  path="/nhanvien_Profile"
                  element={<Nhanvien_Profile />}
                />
                <Route path="/addNhanVien" element={<AddNhanVien />} />
                <Route path="/addNhanVienTC" element={<AddNhanVienTC />} />
                <Route path="/addAdmin" element={<AddAdmin />} />
                <Route path="/VerifyEmail" element={<VerifyScreen />} />
              </Routes>
            </div>
          </div>
        </div>
        <div className="col-md-12 flex flex-col h-48 w-full">
          <SimpleFooter></SimpleFooter>
        </div>
        <AuthVerify logOut={this.logOut} />
      </div>
    );
  }
}

export default App;

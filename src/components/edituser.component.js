import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { Component } from "react";
import UserService from "../services/user.service";
import { Navigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { isEmail } from "validator";
import customerService from "../services/customer.service";
import { toHaveAccessibleErrorMessage } from "@testing-library/jest-dom/matchers";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-error-color text-base" role="alert">
        Thông tin này không được bỏ trống !
      </div>
    );
  }
};
const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="text-error-color text-base" role="alert">
        Địa chỉ Email không hợp lệ!
      </div>
    );
  }
};

const isPhoneNumber = (value) => {
  // Sử dụng biểu thức chính quy để kiểm tra xem value có chứa chỉ chữ số và có đúng 10 ký tự không
  const phoneNumberRegex = /^[0-9]{10}$/;

  if (!phoneNumberRegex.test(value)) {
    return (
      <div className="text-error-color text-base" role="alert">
        Số điện thoại không hợp lệ! Vui lòng nhập đúng 10 chữ số ( 0-9 ) .
      </div>
    );
  }
};

const isIDCard = (value) => {
  // Sử dụng biểu thức chính quy để kiểm tra xem value có chứa chỉ chữ số và có đúng 12 ký tự không
  const idCardRegex = /^[0-9]{12}$/;

  if (!idCardRegex.test(value)) {
    return (
      <div className="text-error-color text-base" role="alert">
        Số căn cước không hợp lệ! Vui lòng nhập đúng 12 chữ số ( 0-9 )
      </div>
    );
  }
};
// Thêm User vào lần đầu tiên
export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.handleEdituser = this.handleEdituser.bind(this);
    this.onChangehoten = this.onChangehoten.bind(this);
    this.onChangecannang = this.onChangecannang.bind(this);
    this.onChangechieucao = this.onChangechieucao.bind(this);
    this.onChangechitietcongviec = this.onChangechitietcongviec.bind(this);
    this.onChangecmnd = this.onChangecmnd.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangegioitinh = this.onChangegioitinh.bind(this);
    this.onChangenganhang = this.onChangenganhang.bind(this);
    this.onChangengaysinh = this.onChangengaysinh.bind(this);
    this.onChangenghenghiep = this.onChangenghenghiep.bind(this);
    this.onChangephuongxa = this.onChangephuongxa.bind(this);
    this.onChangequanhuyen = this.onChangequanhuyen.bind(this);
    this.onChangequoctich = this.onChangequoctich.bind(this);
    this.onChangesodienthoai = this.onChangesodienthoai.bind(this);
    this.onChangesonhaTenduong = this.onChangesonhaTenduong.bind(this);
    this.onChangesotaikhoan = this.onChangesotaikhoan.bind(this);
    this.onChangethanhpho = this.onChangethanhpho.bind(this);
    this.onChangethunhap = this.onChangethunhap.bind(this);

    // this.onChangeEmail = this.onChangeEmail.bind(this);
    // this.onChangePassword = this.onChangePassword.bind(this);
    var user = authService.getCurrentUser();

    const userID = user.taiKhoan.iD_TaiKhoan;
    console.log(user);

    this.state = {
      hoten: "",
      gioitinh: "Nam",
      quoctich: "",
      //   ngaysinh: '04052002',
      chieucao: 0,
      cannang: 0,
      sonhaTenduong: "",
      phuongxa: "",
      quanhuyen: "",
      thanhpho: "",
      email: "",
      cmnd: "",
      nghenghiep: "",
      chitietcongviec: "",
      thunhap: 0,
      sotaikhoan: "",
      nganhang: "",
      sodienthoai: "",
      //   iD_CongTy: 1,
      //   iD_TaiKhoan: userID,
      //   xacthuc: 'Chưa Xác Thực',
    };
  }

  onChangehoten(e) {
    this.setState({
      hoten: e.target.value,
    });
  }

  onChangegioitinh(e) {
    this.setState({
      gioitinh: e.target.value,
    });
  }

  onChangequoctich(e) {
    this.setState({
      quoctich: e.target.value,
    });
  }
  onChangengaysinh(e) {
    this.setState({
      ngasinh: e.target.value,
    });
  }
  onChangechieucao(e) {
    this.setState({
      chieucao: e.target.value,
    });
  }
  onChangecannang(e) {
    this.setState({
      cannang: e.target.value,
    });
  }
  onChangesonhaTenduong(e) {
    this.setState({
      sonhaTenduong: e.target.value,
    });
  }
  onChangephuongxa(e) {
    this.setState({
      phuongxa: e.target.value,
    });
  }
  onChangequanhuyen(e) {
    this.setState({
      quanhuyen: e.target.value,
    });
  }
  onChangethanhpho(e) {
    this.setState({
      thanhpho: e.target.value,
    });
  }
  onChangeemail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangecmnd(e) {
    this.setState({
      cmnd: e.target.value,
    });
  }
  onChangenghenghiep(e) {
    this.setState({
      nghenghiep: e.target.value,
    });
  }
  onChangechitietcongviec(e) {
    this.setState({
      chitietcongviec: e.target.value,
    });
  }
  onChangethunhap(e) {
    this.setState({
      thunhap: e.target.value,
    });
  }
  onChangesotaikhoan(e) {
    this.setState({
      sotaikhoan: e.target.value,
    });
  }
  onChangenganhang(e) {
    this.setState({
      nganhang: e.target.value,
    });
  }
  onChangesodienthoai(e) {
    this.setState({
      sodienthoai: e.target.value,
    });
  }

  handleEdituser(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });
    const user = authService.getCurrentUser();

    const requestData = {
      hoTen: this.state.hoten,
      gioiTinh: this.state.gioitinh,
      quocTich: "Việt Nam",
      ngaySinh: "2024-01-01T09:24:22.101Z", // adjust accordingly
      chieuCao: parseInt(this.state.chieucao),
      canNang: parseInt(this.state.cannang),
      soNhaTenDuong: this.state.sonhaTenduong,
      phuongXa: this.state.phuongxa,
      quanHuyen: this.state.quanhuyen,
      thanhPho: this.state.thanhpho,
      email: this.state.email,
      cmnd: this.state.cmnd,
      ngheNghiep: this.state.nghenghiep,
      chiTietCongViec: this.state.chitietcongviec,
      thuNhap: parseInt(this.state.thunhap),
      soTaiKhoan: "901839839833222",
      nganHang: "Argibank",
      soDienThoai: this.state.sodienthoai,
    };

    customerService.addCustomer(user.taiKhoan.iD_TaiKhoan, requestData).then(
      (response) => {
        const user = authService.getCurrentUser;
        localStorage.removeItem("user");
        const user_1 = {
          taiKhoan: response.data,
          accessToken: user.accessToken,
        };
        console.log(user_1.accessToken);

        localStorage.setItem("user", JSON.stringify(user_1));
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      (error) => {
        const resMessage =
          error.response ||
          error.response.data ||
          error.response.data.message ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: error,
        });
      }
    );
  }

  render() {
    const user = authService.getCurrentUser();

    if (user == null) {
      return <Navigate replace to="/" />;
    }
    return (
      <div className="  px-2 py-2  mx-2">
        <div className="flex flex-col  w-full">
          <div className="flex flex-row text-lg justify-center">
            <h2>CẬP NHẬT THÔNG TIN</h2>
          </div>
        </div>
        <form
          id="editform"
          onSubmit={this.handleEdituser}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <>
              <div className="flex flex-col  w-full ">
                <div className="border-b border-gray-900/10">
                  <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-3 ">
                    {/* Button   */}
                    <div className=" flex items-center justify-end gap-x-6">
                      {/* Button - Cancel  */}
                      <Link
                        to={"/user_profile"}
                        className=" text-gray-900 hover:none"
                      >
                        <button className="rounded-md text-gray-900 bg-gray-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Huỷ
                        </button>
                      </Link>
                      {/* Button - Save  */}
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Lưu
                      </button>
                    </div>
                    {/* Cập nhật tt cá nhân */}

                    <div className="sm:col-span-4 py-3">
                      <h4> Thông tin cá nhân </h4>
                      {/*Cập nhật họ tên */}
                      <label
                        htmlFor="HoTen"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
                      >
                        Họ và tên
                      </label>
                      <div className="mt-2">
                        <input
                          id="HoTen"
                          name="HoTen"
                          type="HoTen"
                          autoComplete="off"
                          value={this.state.hoten}
                          onChange={this.onChangehoten}
                          //   validations={required}
                          placeholder="Nhập họ và tên"
                          className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {/* Cập nhật email */}

                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Địa chỉ email
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="off"
                          value={this.state.email}
                          onChange={this.onChangeemail}
                          //   validations={[required, vemail]}
                          placeholder="Nhập Email cá nhân"
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {/* Cập nhật sdt */}

                      <label
                        htmlFor="SoDienThoai"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Số điện thoại
                      </label>
                      <div className="mt-2">
                        <input
                          id="SoDienThoai"
                          name="SoDienThoai"
                          type="text"
                          pattern="[0-9]{10}"
                          autoComplete="off"
                          //   validations={[required, isPhoneNumber]}
                          placeholder="Nhập Số điện thoại"
                          value={this.state.sodienthoai}
                          onChange={this.onChangesodienthoai}
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>

                      {/* Cập nhật CMND */}

                      <label
                        htmlFor="CMND"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Chứng minh nhân dân
                      </label>
                      <div className="mt-2">
                        <input
                          id="CMND"
                          name="CMND"
                          type="text"
                          autoComplete="off"
                          //   validations={[required, isIDCard]}
                          placeholder="Nhập CMND"
                          value={this.state.cmnd}
                          onChange={this.onChangecmnd}
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    {/*Cập nhật thể chất */}

                    <div className="sm:col-span-4 pb-3">
                      <h4> Thông tin thể chất </h4>

                      <div className="flex pt-3 ">
                        {/* Cập nhật giới tính */}
                        <div className="sm:col-span-4 pr-5 ">
                          <label
                            htmlFor="GioiTinh"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Giới tính
                          </label>
                          <div className="mt-2">
                            <select
                              name="GioiTinh"
                              id="GioiTinh"
                              form="editform"
                              value={this.state.gioitinh}
                              onChange={this.onChangegioitinh}
                              className="block w-10% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                            </select>
                          </div>
                        </div>
                        {/* Cập nhật sinh nhật */}
                        {/* <div className="sm:col-span-4 px-5 ">
                          <label htmlFor="NgaySinh" className="block text-sm font-medium leading-6 text-gray-900">
                            Ngày sinh
                          </label>
                          <div className="mt-2">
                            <input
                              id="NgaySinh"
                              name="NgaySinh"
                              type="date"
                              autoComplete="off"
                              validations={required}
                              value={this.state.ngaysinh}
                              //   onChange={this.onChangengaysinh}
                              className="block w-20% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div> */}
                        {/* Cập nhật thể trạng - cân nặng */}
                        <div className="sm:col-span-4 px-5">
                          <label
                            htmlFor="CanNang"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cân nặng
                          </label>
                          <div className="mt-2">
                            <input
                              id="CanNang"
                              name="CanNang"
                              type="number"
                              min="0"
                              max="300"
                              autoComplete="off"
                              value={this.state.cannang}
                              onChange={this.onChangecannang}
                              //   validations={required}
                              className="block w-10% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        {/* Cập nhật thể trạng - chiều cao*/}
                        <div className="sm:col-span-4 px-5 ">
                          <label
                            htmlFor="ChieuCao"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Chiều cao
                          </label>
                          <div className="mt-2">
                            <input
                              id="ChieuCao"
                              name="ChieuCao"
                              type="number"
                              min="10"
                              max="200"
                              autoComplete="off"
                              value={this.state.chieucao}
                              onChange={this.onChangechieucao}
                              //   validations={required}
                              className=" block w-10% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>{" "}
                      </div>
                    </div>

                    {/*Cập nhật địa chỉ  */}
                    <div className="sm:col-span-4 py-3">
                      <h4> Thông tin lưu trú </h4>

                      <label
                        htmlFor="SoNhaTenDuong"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Số nhà-Tên Đường
                      </label>
                      <div className="mt-2">
                        <input
                          id="SoNhaTenDuong"
                          name="SoNhaTenDuong"
                          type="text"
                          autoComplete="off"
                          // value="A"
                          value={this.state.sonhaTenduong}
                          onChange={this.onChangesonhaTenduong}
                          //   validations={required}
                          placeholder="Nhập số nhà,tên đường "
                          className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <label
                        htmlFor="PhuongXa"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Phường/ Xã
                      </label>
                      <div className="mt-2">
                        <input
                          id="PhuongXa"
                          name="PhuongXa"
                          type="text"
                          autoComplete="off"
                          // value="A"
                          value={this.state.phuongxa}
                          onChange={this.onChangephuongxa}
                          //   validations={required}
                          placeholder="Nhập phường/ xã "
                          className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <label
                        htmlFor="QuanHuyen"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Quận/ Huyện
                      </label>
                      <div className="mt-2">
                        <input
                          id="QuanHuyen"
                          name="QuanHuyen"
                          type="text"
                          autoComplete="off"
                          // value="A"
                          value={this.state.quanhuyen}
                          onChange={this.onChangequanhuyen}
                          //   validations={required}
                          placeholder="Nhập Quận/ Huyện "
                          className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <label
                        htmlFor="ThanhPho"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Tỉnh / Thành Phố
                      </label>
                      <div className="mt-2">
                        <input
                          id="ThanhPho"
                          name="ThanhPho"
                          type="text"
                          autoComplete="off"
                          // value="A"
                          value={this.state.thanhpho}
                          onChange={this.onChangethanhpho}
                          //   validations={required}
                          placeholder="Nhập Thành phố/ Tỉnh   "
                          className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    {/*Cập nhật công việc */}
                    <div className="sm:col-span-4 py-3">
                      <h4> Công việc / Tài chính </h4>
                      {/*Nghề nghiệp */}
                      <label
                        htmlFor="NgheNghiep"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
                      >
                        Nghề nghiệp
                      </label>
                      <div className="mt-2">
                        <input
                          id="NgheNghiep"
                          name="NgheNghiep"
                          type="text"
                          autoComplete="off"
                          // value="A"
                          value={this.state.nghenghiep}
                          onChange={this.onChangenghenghiep}
                          //   validations={required}
                          placeholder="Nhập nghề nghiệp"
                          className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>

                      {/* Cập nhật công việc cụ thể */}

                      <label
                        htmlFor="ChiTietCongViec"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Công việc/ Chức vụ cụ thể
                      </label>
                      <div className="mt-2">
                        <input
                          id="ChiTietCongViec"
                          name="ChiTietCongViec"
                          type="text"
                          autoComplete="off"
                          value={this.state.chitietcongviec}
                          onChange={this.onChangechitietcongviec}
                          //   validations={[required]}
                          placeholder="Nhập Công việc/ Chức vụ cụ thể "
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>

                      {/* Cập nhật Công ty */}

                      {/* <label htmlFor="CongTy" className="block text-sm font-medium leading-6 text-gray-900 pt-2">
                        Công Ty
                      </label>
                      <div className="mt-2">
                        <input
                          id="CongTy"
                          name="CongTy"
                          type="text"
                          autoComplete="off"
                          validations={[required]}
                          placeholder="Nhập Công ty"
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div> */}
                      <label
                        htmlFor="ThuNhap"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Thu Nhập / Tháng
                      </label>
                      <div className="mt-2">
                        <input
                          id="ThuNhap"
                          name="ThuNhap"
                          type="number"
                          autoComplete="off"
                          //   validations={required}
                          value={this.state.thuhap}
                          onChange={this.onChangethunhap}
                          placeholder="Nhập thu thập/ tháng"
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

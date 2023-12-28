import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { Component } from "react";
import UserService from "../services/user.service";
import { Navigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { isEmail } from "validator";

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
export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.handleEdituser = this.handleEdituser.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    var user = authService.getCurrentUser();
    this.state = {
      userId: user.id,
      username: user.username,
      email: user.email,
      password: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleEdituser(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });

    UserService.EditUser(
      this.state.userId,
      this.state.username,
      this.state.email,
      this.state.password
    ).then(
      (response) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data));
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage,
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
              <div className=" flex items-center justify-start gap-x-6">
                {/* Button - Cancel  */}
                <Link to={"/user_profile"} className=" text-gray-900 hover:none">
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
                          // value="A"
                          validations={required}
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
                          autoComplete="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          validations={[required, vemail]}
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
                          validations={[required, isPhoneNumber]}
                          placeholder="Nhập Số điện thoại"
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
                          validations={[required, isIDCard]}
                          placeholder="Nhập CMND"
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
                              className="block w-10% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                            </select>
                          </div>
                        </div>
                        {/* Cập nhật sinh nhật */}
                        <div className="sm:col-span-4 px-5 ">
                          <label
                            htmlFor="NgaySinh"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Ngày sinh
                          </label>
                          <div className="mt-2">
                            <input
                              id="NgaySinh"
                              name="NgaySinh"
                              type="date"
                              autoComplete="off"
                              validations={required}
                              className="block w-20% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
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
                              validations={required}
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
                              validations={required}
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
                          validations={required}
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
                          validations={required}
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
                          validations={required}
                          placeholder="Nhập Quận/ Huyện "
                          className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <label
                        htmlFor="ThanhPho"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Quận/ Huyện
                      </label>
                      <div className="mt-2">
                        <input
                          id="ThanhPho"
                          name="ThanhPho"
                          type="text"
                          autoComplete="off"
                          // value="A"
                          validations={required}
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
                          validations={required}
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
                          validations={[required]}
                          placeholder="Nhập Công việc/ Chức vụ cụ thể "
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>

                      {/* Cập nhật Công ty */}

                      <label
                        htmlFor="CongTy"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
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
                      </div>
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
                          validations={required}
                          placeholder="Nhập thu thập/ tháng"
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4 py-3">
                       {/* Cập nhật username */}
                       <h4> Thông tin tài khoản </h4>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <div className="mt-2">
                        <input
                          id="username"
                          name="username"
                          type="username"
                          readOnly="true"
                          autoComplete="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          placeholder="username"
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                       {/* Đổi mật khẩu  */}
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="password"
                          placeholder="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
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

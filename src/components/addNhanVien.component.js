import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import { withRouter } from "../common/with-router";
import { Navigate, Link } from "react-router-dom";
import NhanVienService from "../services/nhanVien.service";
import { isEmail } from "validator";
import { toHaveAccessibleErrorMessage } from "@testing-library/jest-dom/matchers";
import { getColorClass } from "../utils/colorultils";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
const required = (value) => {
  if (!value) {
    return (
      <div className="text-error-color text-base" role="alert">
        Vui lòng cung cấp không bỏ trống !
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

const vPhonenumber = (value) => {
  const phoneNumberRegex = /^[0-9]{10}$/;
  if (!phoneNumberRegex.test(value)) {
    return (
      <div className="text-error-color text-base" role="alert">
        Số điện thoại phải gồm 10 chữ số ( 0- 9 )
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="text-error-color text-base" role="alert">
        Mật khẩu phải có độ dài từ 6-40 kí tư
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

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
function AddNhanVien() {
  const user = AuthService.getCurrentUser();
  const userID = user.taiKhoan.iD_TaiKhoan;

  const [hoten, sethoten] = useState("");
  const [email, setemail] = useState("");
  const [gioitinh, setgioitinh] = useState("");
  const [quoctich, setquoctich] = useState("");
  const [ngaysinh, setngaysinh] = useState("");
  const [chieucao, setchieucao] = useState("");
  const [cannang, setcannang] = useState("");
  const [sonhatenduong, setsonhatenduong] = useState("");
  const [phuongxa, setphuongxa] = useState("");
  const [quanhuyen, setquanhuyen] = useState("");
  const [thanhpho, setthanhpho] = useState("");
  const [cmnd, setcmnd] = useState("");
  const [nghenghiep, setnghenghiep] = useState("");
  const [chitietcongviec, setchitietcongviec] = useState("");
  const [thunhap, setthunhap] = useState("");
  const [sotaikhoan, setsotaikhoan] = useState("");
  const [nganhang, setnganhang] = useState("");
  const [sodienthoai, setsodienthoai] = useState("");

  //   const [passwor setConfirmPassword] = useState("");

  // const [email, setEmail] = useState("");
  const fref = useRef(null);
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const requestData = {};

  const handleAddCustomer = (e) => {
    e.preventDefault();

    fref.current.validateAll();
    console.log(userID);
    console.log(hoten);
    const requestData = {
      hoTen: hoten,
      gioiTinh: gioitinh,
      quocTich: quoctich,
      ngaysinh: ngaysinh,
      chieuCao: parseInt(chieucao),
      canNang: parseInt(cannang),
      soNhaTenDuong: sonhatenduong,
      phuongXa: phuongxa,
      quanHuyen: quanhuyen,
      thanhPho: thanhpho,
      email: email,
      cmnd: cmnd,
      ngheNghiep: nghenghiep,
      loainhanvien: "Nhân Viên",
      soTaiKhoan: sotaikhoan,
      nganHang: nganhang,
      soDienThoai: sodienthoai,
      iD_TaiKhoan: userID,
    };
    console.log(requestData);

    NhanVienService.addNhanVien(requestData).then(
      (response) => {
        setSuccess(true);
        setMessage(response.data.message);
        setIsSubmit(true);
        setIsLoading(false);
      },
      (error) => {
        const resMessage =
          error.response ||
          error.response.data ||
          error.response.data.message ||
          error.message ||
          error.toString();
        setMessage(resMessage.toString());
        setIsSubmit(true);
        setSuccess(false);
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <div className="  px-2 py-2  mx-2">
        <div className="flex flex-col  w-full">
          <div className="flex flex-row text-lg justify-center">
            <h3 className="text-green-800 ">CẬP NHẬT THÔNG TIN </h3>
          </div>
        </div>
        <Form onSubmit={handleAddCustomer} ref={fref}>
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
                validations={[required]}
                onChange={(e) => {
                  sethoten(e.target.value);
                }}
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
                onChange={(e) => {
                  setemail(e.target.value);
                }}
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
                placeholder="Nhập Số điện thoại"
                validations={[required, vPhonenumber]}
                onChange={(e) => {
                  setsodienthoai(e.target.value);
                }}
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
                onChange={(e) => {
                  setcmnd(e.target.value);
                }}
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
                    validations={[required]}
                    onChange={(e) => {
                      setgioitinh(e.target.value);
                    }}
                    className="block w-10% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="None">Chọn giới tính</option>
                    validations={[required]}
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
                    onChange={(e) => {
                      setngaysinh(e.target.value);
                    }}
                    validations={required}
                    //   onChange={this.onChangengaysinh}
                    className="block w-20% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Cập nhật thể trạng - cân nặng */}
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
                validations={[required]}
                name="SoNhaTenDuong"
                type="text"
                autoComplete="off"
                // value="A"
                onChange={(e) => {
                  setsonhatenduong(e.target.value);
                }} //   validations={required}
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
                validations={[required]}
                // value="A"
                onChange={(e) => {
                  setphuongxa(e.target.value);
                }} //   validations={required}
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
                validations={[required]}
                autoComplete="off"
                // value="A"
                onChange={(e) => {
                  setquanhuyen(e.target.value);
                }} //   validations={required}
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
                validations={[required]}
                type="text"
                autoComplete="off"
                // value="A"
                onChange={(e) => {
                  setthanhpho(e.target.value);
                }} //   validations={required}
                placeholder="Nhập Thành phố/ Tỉnh   "
                className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/*Cập nhật công việc */}
          <div className="sm:col-span-4 py-3">
            <h4> Tài chính </h4>

            <label
              htmlFor="NganHang"
              className="block text-sm font-medium leading-6 text-gray-900 pt-2"
            >
              Tên Ngân Hàng
            </label>
            <div className="mt-2">
              <input
                id="NganHang"
                validations={[required]}
                name="NganHang"
                type="text"
                autoComplete="off"
                //   validations={required}
                onChange={(e) => {
                  setnganhang(e.target.value);
                }}
                placeholder="Nhập tên ngân hàng"
                className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <label
              htmlFor="sotaikhoan"
              className="block text-sm font-medium leading-6 text-gray-900 pt-2"
            >
              Số Tài Khoản
            </label>
            <div className="mt-2">
              <input
                id="sotaikhoan"
                validations={[required]}
                name="sotaikhoan"
                type="text"
                autoComplete="off"
                //   validations={required}
                onChange={(e) => {
                  setsotaikhoan(e.target.value);
                }}
                placeholder="Nhập số tài khoản ngân hàng"
                className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="form-group">
              <button
                className="my-4 
                rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  setIsLoading(true);
                }}
              >
                {isLoading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Lưu thông tin
              </button>
            </div>
          </div>
        </Form>
        {isSubmit && !isSuccess && (
          <div className="text-error-color text-base">{message}</div>
        )}
        {isSubmit && isSuccess && (
          <div className="alert alert-success text-base">
            Cập nhật thành công{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default withRouter(AddNhanVien);

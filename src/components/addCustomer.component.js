import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import UserService from "../services/user.service";
import { withRouter } from "../common/with-router";

import { Navigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { isEmail } from "validator";
import customerService from "../services/customer.service";
import { toHaveAccessibleErrorMessage } from "@testing-library/jest-dom/matchers";
import { getColorClass } from "../utils/colorultils";
import AuthService from "../services/auth.service";
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
function AddCustomer() {
  const user = authService.getCurrentUser();
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

    customerService.addCustomer(userID, requestData).then(
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
            <h3 className="text-green-800 ">CẬP NHẬT THÔNG TIN</h3>
          </div>
        </div>
        <form onSubmit={handleAddCustomer} ref={fref}></form>
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

export default withRouter(AddCustomer);

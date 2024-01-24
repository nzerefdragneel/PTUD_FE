import React, { useRef, useState } from "react";
import { withRouter } from "../common/with-router";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import UserService from "../services/user.service";
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
function ThemNhanVienComponent() {
  const [tenDangNhap, setUsername] = useState("");
  const [matKhau, setPassword] = useState("");
  //   const [passwor setConfirmPassword] = useState("");

  // const [email, setEmail] = useState("");
  const fref = useRef(null);
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    fref.current.validateAll();

    UserService.ThemNhanVienByADMIN(tenDangNhap, matKhau).then(
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
    <div className="col-md-12">
      <h1 className="text-2xl font-bold mb-4">Thêm Tài Khoản Nhân Sự </h1>
      <div className="">
        <Form onSubmit={handleRegister} ref={fref}>
          <div>
            <div className="form-group">
              <label htmlFor="username" className="font-semibold mb-2">
                Tên đăng nhập
              </label>
              <Input
                type="text"
                className="form-control p-3 rounded required"
                name="username"
                placeholder="Nhập số điện thoại"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                validations={[required, vPhonenumber]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="font-semibold mb-2 mt-2">
                Mật khẩu
              </label>
              <Input
                type="password"
                className="form-control p-3 rounded"
                name="password"
                placeholder="Nhập mật khẩu"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                validations={[required, vpassword]}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="confirmPassword" className="font-semibold mb-2 mt-2">
                Nhập lại mật khẩu Mật khẩu
              </label>
              <Input
                type="password"
                className="form-control p-3 rounded"
                name="confirmPassword"
                placeholder="Nhập mật khẩu"
                onChange={(e) => {
                //   setConfirmPassword(e.target.value);
                
                }}
                validations={[required]}
              />
            </div>
            */}
            <div className="form-group">
              <button
                className="w-full py-2.5 text-white bg-dark-green rounded-lg text-sm mt-3"
                onClick={() => {
                  setIsLoading(true);
                }}
              >
                {isLoading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Đăng ký
              </button>
            </div>
          </div>
        </Form>

        {isSubmit && !isSuccess && (
          <div className="text-error-color text-base">{message}</div>
        )}
        {isSubmit && isSuccess && (
          <div className="alert alert-success text-base">
            Thêm nhân viên thành công{" "}
          </div>
        )}
      </div>
      <Link to={"/adminAccountList"} className=" text-gray-900 hover:none">
        <button className="rounded-md bg-red-500 px-3 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Xem danh sách tài khoản
        </button>
      </Link>
    </div>
  );
}

export default withRouter(ThemNhanVienComponent);

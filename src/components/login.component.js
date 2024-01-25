import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { withRouter } from "../common/with-router";
import { Navigate } from "react-router-dom";
import CustomerService from "../services/customer.service";
import NhanvienService from "../services/nhanVien.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      rememberMe: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeRememberMe = () => {
    this.setState({
      rememberMe: !this.state.rememberMe,
    });
  };

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        (response) => {
          if (response.data.accessToken && response.data.taiKhoan) {
            const userID = response.data.taiKhoan.iD_TaiKhoan;
            const userRole = response.data.taiKhoan.loaiTaiKhoan;
            const message =
              "Tài khoản mới cần được cập nhật thông tin, ấn OK để chuyển đến trang cập nhật thông tin";

            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data);

            if (userRole === "KH") {
              // Handling for customer role
              CustomerService.getCustomer(userID)
                .then((customerResponse) => {
                  const customerData = customerResponse.data;

                  if (customerData) {
                    localStorage.setItem(
                      "customer",
                      JSON.stringify(customerData)
                    );
                    this.props.router.navigate("/home");
                  } else {
                    this.props.router.navigate("");
                  }
                })
                .catch((customerError) => {
                  console.error(
                    "Error fetching customer information:",
                    customerError
                  );

                  alert(message);
                  this.props.router.navigate("/addCustomer");
                })
                .finally(() => {
                  window.location.reload();
                });
            }
            if (userRole === "NV") {
              // Handling for customer role
              NhanvienService.getNhanVien(userID)
                .then((nhanVienResponse) => {
                  const nhanVienData = nhanVienResponse.data;

                  if (nhanVienData) {
                    localStorage.setItem(
                      "nhanvien",
                      JSON.stringify(nhanVienData)
                    );
                    this.props.router.navigate("/home");
                  } else {
                    this.props.router.navigate("/addNhanVien");
                  }
                })
                .catch((customerError) => {
                  console.error(
                    "Error fetching customer information:",
                    customerError
                  );

                  alert(message);
                  this.props.router.navigate("/addNhanVien");
                })
                .finally(() => {
                  window.location.reload();
                });
            }
            if (userRole === "NVTC") {
              // Handling for customer role
              NhanvienService.getNhanVien(userID)
                .then((nhanVienResponse) => {
                  const nhanVienData = nhanVienResponse.data;

                  if (nhanVienData) {
                    localStorage.setItem(
                      "nhanvien",
                      JSON.stringify(nhanVienData)
                    );
                    this.props.router.navigate("/home");
                  } else {
                    this.props.router.navigate("/addNhanVienTC");
                  }
                })
                .catch((customerError) => {
                  console.error(
                    "Error fetching customer information:",
                    customerError
                  );

                  alert(message);
                  this.props.router.navigate("/addNhanVienTC");
                })
                .finally(() => {
                  window.location.reload();
                });
            }
            if (userRole === "ADMIN") {
              NhanvienService.getNhanVien(userID)
                .then((nhanVienResponse) => {
                  const nhanVienData = nhanVienResponse.data;

                  if (nhanVienData) {
                    localStorage.setItem(
                      "nhanvien",
                      JSON.stringify(nhanVienData)
                    );
                    this.props.router.navigate("/home");
                  } else {
                    this.props.router.navigate("/addAdmin");
                  }
                })
                .catch((nhanvienError) => {
                  console.error(
                    "Error fetching customer information:",
                    nhanvienError
                  );

                  alert(message);
                  this.props.router.navigate("/addAdmin");
                })
                .finally(() => {
                  window.location.reload();
                });
            }
          }
        },
        (error) => {
          const resMessage =
            error.response ||
            error.response.data ||
            error.response.data.message ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className="col-md-12 ">
        <div className="">
          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username" className="font-semibold mb-2">
                Số điện thoại / Username
              </label>
              <Input
                type="text"
                className="form-control"
                name="username"
                placeholder="Nhập số điện thoại"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required, vPhonenumber]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="font-semibold mb-2">
                Mật khẩu
              </label>
              <Input
                type={this.state.showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Mật khẩu"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required, vpassword]}
              />
            </div>

            <div className="form-group">
              <button
                style={{ backgroundColor: "#557C55", borderColor: "#557C55" }}
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Đăng nhập</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}

            <CheckButton
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);

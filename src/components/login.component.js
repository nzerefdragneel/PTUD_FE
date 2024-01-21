
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { withRouter } from "../common/with-router";
import { Navigate } from "react-router-dom";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Vui lòng cung cấp không bỏ trống !
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
            // Lấy giá trị accessToken từ response
            const accessToken = response.data.accessToken;
            // Lấy giá trị userID
            const userID = response.data.taiKhoan.iD_TaiKhoan;

            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data);
            customerService
              .getCustomer(userID)
              .then((customerResponse) => {
                const customerData = customerResponse.data;

                if (customerData) {
                  // Nếu có tồn tại ID_KhachHang
                  localStorage.setItem(
                    "customer",
                    JSON.stringify(customerData)
                  );
                  this.props.router.navigate("/home");
                } else {
                  // Nếu không tồn tại ID_KhachHang
                  this.props.router.navigate("/addCustomer");
                }
              })
              .catch((customerError) => {
                console.error(
                  "Lỗi khi lấy thông tin khách hàng:",
                  customerError
                );

                // Xử lý lỗi nếu cần
                // ...

                // Chuyển hướng vào /createProfile khi có lỗi
                const message =
                  "Tài khoản mới hoặc chưa có hồ sơ người dùng. Vui lòng tạo hồ sơ người dùng để tiếp tục trải nghiệm dịch vụ của chúng tôi";
                alert(message);
                this.props.router.navigate("/addCustomer");
              })
              .finally(() => {
                // Refresh trang sau khi xử lý xong
                window.location.reload();
              });
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
            message: '',
            rememberMe: false,
        };
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
                Số điện thoại
              </label>
              <Input
                type="text"
                className="form-control"
                name="username"
                placeholder="Nhập số điện thoại"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
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
                validations={[required]}
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
            message: '',
            loading: true,
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                (response) => {
                    if (response.data.id) {
                        localStorage.setItem('user', JSON.stringify(response.data));
                        this.props.router.navigate('/home');
                    }
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage,
                    });
                },
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
                                Tên đăng nhập
                            </label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Tên đăng nhập"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="font-semibold mb-2">
                                Mật khẩu
                            </label>
                            <Input
                                type={this.state.showPassword ? 'text' : 'password'}
                                className="form-control"
                                name="password"
                                placeholder="Mật khẩu"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                style={{ backgroundColor: '#557C55', borderColor: '#557C55' }}
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && <span className="spinner-border spinner-border-sm"></span>}
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

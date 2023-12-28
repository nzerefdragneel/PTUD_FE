import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { Component } from "react";
import UserService from "../services/user.service";
import { Navigate, Link } from "react-router-dom";
import authService from "../services/auth.service";

export default class EditAccount extends Component {
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
            <h2>CẬP NHẬT TÀI KHOẢN</h2>
          </div>
        </div>
        <form
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
                  <div className="sm:col-span-4 py-3">
                       {/* Cập nhật username */}
                       <h4> Thông tin đăng nhập </h4>

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

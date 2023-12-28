import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { Component } from "react";
import UserService from "../services/user.service";
import { Navigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { withRouter } from "../common/with-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
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

export default class Update_Profile extends Component {
  render(){
    const user=authService.getCurrentUser();

    if (user==null){
      return(
          <Navigate replace to="/" />
      )
    }
    return (
      <>
        <div class="bg-white overflow-hidden shadow rounded-lg border ">
          <div className=" px-2 py-2  mx-2">
            <div className="flex flex-col  w-full">
              <div className="flex flex-row justify-center text-lg">
                <h3> Cập nhật thông tin người dùng </h3>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 bg-red-500 ">
            <div className="sm:col-span-4 mx-1 px-1 py-1 my-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  
                  // value={this.state.email}
                  // onChange={this.onChangeEmail}
                  placeholder="Nhập địa chỉ Email cá nhân"
                  className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  validations={[required, vemail]}

                />
              </div>
            </div>
          </div>
  
          {/* Button Save  */}
          <div class="flex justify-center py-3 ">
            <button
              type="submit"
              class="text-white bg-green-900  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Save
            </button>
          </div>
        </div>
      </>
    );

}
}


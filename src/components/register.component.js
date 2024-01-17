import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { Component } from "react";
import UserService from "../services/user.service";
import { Navigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { isEmail } from "validator";
import customerService from "../services/customer.service";

export default class Register_Insurance extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.taiKhoan.iD_TaiKhoan;
    customerService.getCustomer(userId).then(
      (response) => {
        alert(JSON.stringify(response.data));
        localStorage.setItem("customer", JSON.stringify(response.data));
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

    return (
      <>
        <div className=" ">ĐĂNG KÝ BẢO HIỂM</div>
        <div className=" flex items-center justify-end gap-x-6">
          <a
            href="./assets/ToKhaiSucKhoe.docx"
            download="ToKhaiSucKhoe"
            target="_blank"
            rel="noreferrer"
          >
            <button className="rounded-md bg-red-500 px-3 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Tải tờ khai sức khoẻ
            </button>{" "}
          </a>
          <Link to={"/statusRegister"} className=" text-gray-900 hover:none">
            <button className="rounded-md bg-red-500 px-3 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Đăng ký của tôi
            </button>
          </Link>
        </div>
      </>
    );
  }
}

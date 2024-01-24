import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { Component } from "react";
import UserService from "../services/user.service";
import { Navigate, Link, useLocation } from "react-router-dom";
import authService from "../services/auth.service";
import { isEmail } from "validator";
import customerService from "../services/customer.service";
const Register_Insurance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.taiKhoan.iD_TaiKhoan;
  const {
    state: { goiBaohiem },
  } = useLocation();
  console.log(goiBaohiem);
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
};
export default Register_Insurance;

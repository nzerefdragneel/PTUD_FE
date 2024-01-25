import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import UserService from "../services/user.service";
import React, { useRef, useState } from "react";
import { withRouter } from "../common/with-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Navigate, Link, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";
import { isEmail } from "validator";
import CustomerService from "../services/customer.service";
const required = (value) => {
  if (!value) {
    return (
      <div className="text-error-color text-base" role="alert">
        Vui lòng cung cấp không bỏ trống !
      </div>
    );
  }
};
function AddRegister() {
  const user = AuthService.getCurrentUser();
  const userID = user.taiKhoan.iD_TaiKhoan;

  const [diaDiemKiKet, setdiaDiemKiKet] = useState("");
  const [toKhaiSucKhoe, settoKhaiSucKhoe] = useState("");
  const [thoiGianKiKet, setthoiGianKiKet] = useState("");
  // const [quoctich, setquoctich] = useState("");

  const {
    state: { goiBaohiem },
  } = useLocation();

  const customer = CustomerService.getCurrentCustomer();
  console.log(customer);
  console.log(goiBaohiem);

  //   const [passwor setConfirmPassword] = useState("");

  // const [email, setEmail] = useState("");
  const fref = useRef(null);
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const requestData = {};

  const handleRegister = (e) => {
    e.preventDefault();
    fref.current.validateAll();
    console.log(customer.iD_KhachHang);
  };

  return (
    <>
      <div className=" flex items-center justify-end gap-x-6">
        {" "}
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
      <div className="  px-2 py-2  mx-2">
        <div className="flex flex-col  w-full">
          <div className="flex flex-row text-lg justify-center">
            <h3 className="text-green-800 ">ĐĂNG KÝ BẢO HIỂM</h3>
          </div>
        </div>
        <Form onSubmit={handleRegister} ref={fref}>
          <label
            htmlFor="diadiem"
            className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
          >
            Địa điểm ký kết
          </label>
          <div className="mt-2">
            <input
              id="Diadiem"
              name="Diadiem"
              type="text"
              autoComplete="off"
              validations={[required]}
              onChange={(e) => {
                setdiaDiemKiKet(e.target.value);
              }}
              placeholder="Nhập địa điểm "
              className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </Form>
      </div>
    </>
  );
}

export default withRouter(AddRegister);

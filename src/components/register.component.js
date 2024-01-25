import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import UserService from "../services/user.service";
import React, { useRef, useState } from "react";
import { withRouter } from "../common/with-router";

import { Navigate, Link, useLocation } from "react-router-dom";
import authService from "../services/auth.service";
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
  const user = authService.getCurrentUser();
  const userID = user.taiKhoan.iD_TaiKhoan;

  // const [hoten, sethoten] = useState("");
  // const [email, setemail] = useState("");
  // const [gioitinh, setgioitinh] = useState("");
  // const [quoctich, setquoctich] = useState("");

  const {
    state: { goiBaohiem },
  } = useLocation();
  console.log(goiBaohiem.iD_GoiBaoHiem);
  console.log(userID);
  const customer = CustomerService.getCurrentCustomer();

  //   const [passwor setConfirmPassword] = useState("");

  // const [email, setEmail] = useState("");
  const fref = useRef(null);
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const requestData = {};

  // const handleAddCustomer = (e) => {
  //   e.preventDefault();

  //   fref.current.validateAll();
  //   console.log(userID);
  //   console.log(hoten);
  //   const requestData = {

  //   };
  //   console.log(requestData);

  //   customerService.addCustomer(userID, requestData).then(
  //     (response) => {
  //       setSuccess(true);
  //       setMessage(response.data.message);
  //       setIsSubmit(true);
  //       setIsLoading(false);
  //     },
  //     (error) => {
  //       const resMessage =
  //         error.response ||
  //         error.response.data ||
  //         error.response.data.message ||
  //         error.message ||
  //         error.toString();
  //       setMessage(resMessage.toString());
  //       setIsSubmit(true);
  //       setSuccess(false);
  //       setIsLoading(false);
  //     }
  //   );
  // };

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
      </div>
    </>
  );
}

export default withRouter(AddRegister);

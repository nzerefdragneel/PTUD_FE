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
import RegisterInsuranceService from "../services/registerInsurance.service";
import { ImageFilterFrames } from "material-ui/svg-icons";
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

  const customerID = customer.iD_KhachHang;
  console.log(goiBaohiem);
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
    setIsLoading(false);
    const requestData = {
      diaDiemKiKet: diaDiemKiKet,
      thoiGianKiKet: thoiGianKiKet,
      toKhaiSucKhoe: toKhaiSucKhoe,
      iD_KhachHang: customerID,
      iD_GoiBaoHiem: goiBaohiem.iD_GoiBaoHiem,
    };
    console.log(requestData);
    if (diaDiemKiKet === "" || toKhaiSucKhoe === "" || thoiGianKiKet === "") {
      setIsSubmit(true);
      setSuccess(false);
    } else {
      RegisterInsuranceService.dangKyBaoHiem(requestData).then(
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
    }
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
          <h3 className="text-green-800 ">ĐĂNG KÝ SỬ DỤNG DỊCH VỤ BẢO HIỂM</h3>
        </div>
        <Form onSubmit={handleRegister} ref={fref}>
          <label
            htmlFor="Tokhai"
            className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
          >
            Đường dẫn đến tờ khai sức khoẻ
          </label>
          <div className="mt-2">
            <input
              id="Tokhai"
              name="Tokhai"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                settoKhaiSucKhoe(e.target.value);
              }}
              validations={required}
              placeholder="Nhập đường dẫn tờ khai (GG drive,Cloud,...) "
              className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
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

          <label
            htmlFor="thoigiankiket"
            className="block text-sm font-medium leading-6 text-gray-900 py-1"
          >
            Thời gian dự kiến quý khách có thể kí kết hợp đồng:
          </label>
          <div className="mt-2">
            <input
              id="thoigiankiket"
              name="thoigiankiket"
              type="date"
              autoComplete="off"
              onChange={(e) => {
                setthoiGianKiKet(e.target.value);
              }}
              validations={required}
              //   onChange={this.onChangengaysinh}
              className="block w-20% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="form-group">
              <button
                className="my-4 
                rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  setIsLoading(true);
                }}
              >
                {isLoading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Gửi thông tin
              </button>
            </div>
          </div>
        </Form>
        {isSubmit && !isSuccess && (
          <div className="text-error-color text-base">
            Có lỗi. Hãy kiểm tra lại{" "}
          </div>
        )}
        {isSubmit && isSuccess && (
          <div className="alert alert-success text-base">
            Đăng ký thành công{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default withRouter(AddRegister);

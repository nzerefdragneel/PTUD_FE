import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import UserService from "../services/user.service";
import { Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import CustomerService from "../services/customer.service";
import { withRouter } from "../common/with-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import SendEmailVerifyService from "../services/sendEmailVerify.service";
function EditAccount() {
  const [email, setEmail] = useState("");

  // const [email, setEmail] = useState("");
  const fref = useRef(null);
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = AuthService.getCurrentUser();
  const userID = user.taiKhoan.iD_TaiKhoan;
  CustomerService.getCustomer(userID).then((customerResponse) => {
    const customerData = customerResponse.data;
    localStorage.setItem("customer", JSON.stringify(customerData));
  });

  const customer = CustomerService.getCurrentCustomer();
  const customerID = customer.iD_KhachHang;

  const handleRegister = (e) => {
    e.preventDefault();

    fref.current.validateAll();

    CustomerService.updateEmail(customerID, email).then(
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
        setMessage(error.response.data);
        setIsSubmit(true);
        setSuccess(false);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="  px-2 py-2  mx-2">
      <div className="flex flex-col  w-full">
        <div className="flex flex-row text-lg justify-center">
          <h2>CẬP NHẬT EMAIL</h2>
        </div>
      </div>
      <Form onSubmit={handleRegister} ref={fref}>
        <div className="flex flex-col  w-full ">
          <div className="border-b border-gray-900/10">
            <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-3 ">
              <div className="sm:col-span-4 py-3">
                {/* Cập nhật username */}

                <div className="sm:col-span-4">
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
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Nhập email mới"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        className="block w-full rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex items-center justify-start gap-x-6">
                {/* Button - Cancel  */}
                <Link
                  to={"/user_profile"}
                  className=" text-gray-900 hover:none"
                >
                  <button className="rounded-md text-gray-900 bg-gray-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Huỷ
                  </button>
                </Link>
                {/* Button - Save  */}
                <button
                  className="rounded-md text-gray-900 bg-purple-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  Huỷ
                  onClick={() => {
                    setIsLoading(true);
                  }}
                >
                  {isLoading && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>

      {isSubmit && !isSuccess && (
        <div className="text-error-color text-base">Lỗi: {message}</div>
      )}
      {isSubmit && isSuccess && (
        <div className="alert alert-success text-base">Đăng ký thành công </div>
      )}
    </div>
  );
}

export default withRouter(EditAccount);

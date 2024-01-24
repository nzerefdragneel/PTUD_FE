import { Navigate, Link } from "react-router-dom";
import UserService from "../services/user.service";
import authService from "../services/auth.service";
import React, { Component, useState, useEffect } from "react";
import { getColorClass } from "../utils/colorultils";
import CustomerService from "../services/customer.service";
import SendEmailVerifyService from "../services/sendEmailVerify.service";
const User_Profile = () => {
  const user = authService.getCurrentUser();
  const userID = user.taiKhoan.iD_TaiKhoan;

  CustomerService.getCustomer(userID)
    .then((customerResponse) => {
      const customerData = customerResponse.data;
      localStorage.setItem("customer", JSON.stringify(customerData));
    })
    .catch((customerError) => {
      console.error("Lỗi khi lấy thông tin khách hàng:", customerError);

      // Chuyển hướng vào /createProfile khi có lỗi
      const message =
        "Tài khoản mới hoặc chưa có hồ sơ người dùng. Vui lòng tạo hồ sơ người dùng để tiếp tục trải nghiệm dịch vụ của chúng tôi";
      alert(message);
      this.props.router.navigate("/addCustomer");
    });
  const customer = CustomerService.getCurrentCustomer();

  const colorClass = getColorClass(customer?.xacThuc); // Thêm kiểm tra customer không null trước khi truy cập thuộc tính
  const ngaysinh = new Date(customer.ngaySinh).toLocaleDateString("vi-VN");

  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg border p-2">
        <div className="flex items-center justify-end gap-x-6 pt-3 ">
          {/*place-items-center content-center*/}
          <Link to={"/edituser"} className="text-black hover:none">
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Cập nhật thông tin
            </button>
          </Link>
          <Link to={"/editAccount"} className="text-black hover:none">
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Cài đặt email
            </button>
          </Link>
          <button
            onClick={() => {
              // Gửi lại email xác thực khi nhấn nút
              SendEmailVerifyService.SendEmail(
                customer.iD_KhachHang,
                customer.email
              ).then(alert("Email xác thức đã được gửi vào email của bạn"));
            }}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Gửi lại Email Xác thực
          </button>
        </div>
        <div className="px-4 py-3 sm:px-6">
          <h1 className="font-semibold leading-6 text-lg text-gray-900">
            THÔNG TIN CƠ BẢN
          </h1>
        </div>
        <div className="border-t border-gray-200 px-4 py-3 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.hoTen}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Địa chỉ Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.email}{" "}
                <span className={`text-sm font-bold ${colorClass}`}>
                  {" "}
                  {customer.xacthuc}
                </span>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Số điện thoại
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.soDienThoai}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Địa chỉ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.soNhaTenDuong}, {customer.phuongXa}.{" "}
                {customer.quanHuyen}, {customer.thanhPho}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Số chứng minh nhân dân
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.cmnd}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Quốc tịch</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.quocTich}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ngày Sinh</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ngaysinh}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Chiều Cao</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.chieuCao} {"cm"}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Cân Nặng</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.canNang}
                {"kg"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-3 sm:px-6">
          <h1 className="font-semibold leading-6 text-lg text-gray-900">
            THÔNG TIN NGHỀ NGHIỆP
          </h1>
        </div>
        <div className="border-t border-gray-200 px-4 py-3 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nghề nghiệp</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.ngheNghiep}
              </dd>
            </div>
            {/* <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Công ty</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Value</dd>
            </div> */}
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Chuyên môn</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.chiTietCongViec}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Thu Nhập</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {" "}
                {customer.thuNhap}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-3 sm:px-6">
          <h1 className="font-semibold leading-6 text-lg text-gray-900">
            THÔNG TIN NGÂN HÀNG
          </h1>
        </div>
        <div className="border-t border-gray-200 px-4 py-3 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Loại ngân hàng{" "}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.nganHang}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Số tài khoản{" "}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.soTaiKhoan}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default User_Profile;

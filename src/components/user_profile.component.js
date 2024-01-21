import { Navigate, Link } from "react-router-dom";
import UserService from "../services/user.service";
import authService from "../services/auth.service";
import React, { Component, useState, useEffect } from "react";
import { getColorClass } from "../utils/colorultils";
import customerService from "../services/customer.service";

// const User_Profile = ({ someProp, someState }) => {
//   const user = authService.getCurrentUser();
//   const userID = user.taiKhoan.iD_TaiKhoan;

//   useEffect(() => {
//     const checkAndRemoveConstumer = () => {
//       // Kiểm tra xem 'constumer' có tồn tại trong localStorage hay không
//       if (localStorage.getItem("constumer")) {
//         // Nếu tồn tại, thì xóa nó
//         localStorage.removeItem("constumer");
//       }
//       customerService.getCustomer(userID).then(
//         (response) => {
//           localStorage.setItem("customer", JSON.stringify(response.data));
//         },
//         (error) => {
//           const resMessage =
//             error.response ||
//             error.response.data ||
//             error.response.data.message ||
//             error.message ||
//             error.toString();

//           this.setState({
//             loading: false,
//             message: resMessage,
//           });
//         }
//       );
//     };

//     // Thực hiện kiểm tra khi component được tạo ra
//     checkAndRemoveConstumer();

//     // Thực hiện kiểm tra lại khi trang được reload
//     window.onload = checkAndRemoveConstumer;

//     // Clean up để tránh memory leak
//     return () => {
//       window.onload = null;
//     };
//   }, []); // Chạy một lần khi component được tạo ra

//   const customer = customerService.getCurrentCustomer();
//   const colorClass = getColorClass(customer.xacThuc);
const User_Profile = ({ someProp, someState }) => {
  const user = authService.getCurrentUser();
  const userID = user.taiKhoan.iD_TaiKhoan;

  // Sử dụng useState để theo dõi giá trị của customer
  const [customer, setCustomer] = useState(() => {
    // Lấy dữ liệu từ localStorage khi component được tạo ra
    const storedCustomer = localStorage.getItem("customer");
    return storedCustomer ? JSON.parse(storedCustomer) : null;
  });

  useEffect(() => {
    const checkAndRemoveCustomer = () => {
      customerService.getCustomer(userID).then(
        (response) => {
          const updatedCustomer = response.data;

          // Kiểm tra xem có sự thay đổi trong thuộc tính của customer hay không
          if (!areCustomersEqual(customer, updatedCustomer)) {
            // Nếu có thay đổi, cập nhật giá trị của customer và lưu vào localStorage
            setCustomer(updatedCustomer);
            localStorage.setItem("customer", JSON.stringify(updatedCustomer));
          }
        },
        (error) => {
          // Xử lý lỗi nếu cần
        }
      );
    };

    // Thực hiện kiểm tra khi component được tạo ra và mỗi khi customer thay đổi
    checkAndRemoveCustomer();
  }, [
    customer,
    userID /* Thêm các thuộc tính của customer bạn quan tâm vào đây */,
  ]);

  // Hàm để so sánh sự giống nhau giữa hai đối tượng customer
  const areCustomersEqual = (customerA, customerB) => {
    // Bạn có thể tùy chỉnh cách so sánh dựa trên nhu cầu của mình
    // Ở đây, tôi so sánh dựa trên một vài thuộc tính quan trọng
    return (
      customerA &&
      customerB &&
      customerA.hoTen === customerB.hoTen &&
      customerA.email === customerB.email &&
      // Thêm các thuộc tính khác bạn muốn so sánh
      customerA.soDienThoai === customerB.soDienThoai &&
      customerA.soNhaTenDuong === customerB.soNhaTenDuong &&
      customerA.phuongXa === customerB.phuongXa &&
      customerA.quanHuyen === customerB.quanHuyen &&
      customerA.thanhPho === customerB.thanhPho &&
      customerA.cmnd === customerB.cmnd &&
      customerA.ngheNghiep === customerB.ngheNghiep &&
      customerA.chiTietCongViec === customerB.chiTietCongViec &&
      customerA.thuNhap === customerB.thuNhap &&
      customerA.nganHang === customerB.nganHang &&
      customerA.soTaiKhoan === customerB.soTaiKhoan &&
      customerA.xacThuc === customerB.xacThuc
    );
  };

  const colorClass = getColorClass(customer?.xacThuc); // Thêm kiểm tra customer không null trước khi truy cập thuộc tính

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
              Đổi mật khẩu
            </button>
          </Link>
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

      {/* </div> */}
    </>
  );
};

export default User_Profile;

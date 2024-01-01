import { Navigate, Link } from 'react-router-dom';
import UserService from '../services/user.service';
import authService from '../services/auth.service';
import React, { Component, useState, useEffect } from 'react';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  List,
  Button,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import { SimpleNavbar } from './simplenavbar.component';
import customerService from '../services/customer.service';

export function SimpleCard() {
  return (
    <Card className="mt-6 w-96 h-auto">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where
          you can enjoy the main night life in Barcelona.
        </Typography>
      </CardBody>
    </Card>
  );
}

export function SimpleSidebar() {
  return (
    <Card className="min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <Link to={'/'} className=" text-gray-900 ">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
        </Link>
        <Link to={'/profile'} className=" text-gray-900 rounded-2xl bg-slate-200">
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}

const User_Profile = () => {
  const [customer, setCustomer] = useState(null); // State để lưu thông tin của Customer

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const user = authService.getCurrentUser();
        const userID = user.taiKhoan.iD_TaiKhoan;
        const customerData = await customerService.getCustomer(userID);
        setCustomer(customerData);

        // Lưu thông tin của Customer vào state
      } catch (error) {
        // Xử lý lỗi nếu cần thiết
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData(); // Gọi hàm fetchCustomerData khi component được mount
  }, []); // Dùng mảng rỗng để chỉ gọi một lần khi component mount

  if (!customer) {
    // Nếu không có thông tin customer, có thể hiển thị một loading spinner hoặc thông báo khác
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-3 sm:px-6">
          <h1 className="font-semibold leading-6 text-lg text-gray-900">THÔNG TIN CƠ BẢN</h1>
        </div>
        <div className="border-t border-gray-200 px-4 py-3 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.hoTen}</dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Địa chỉ Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.email}</dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.soDienThoai}</dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Địa chỉ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.soNhaTenDuong}, {customer.phuongXa}. {customer.quanHuyen}, {customer.thanhPho}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Số chứng minh nhân dân</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.cmnd}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-3 sm:px-6">
          <h1 className="font-semibold leading-6 text-lg text-gray-900">THÔNG TIN NGHỀ NGHIỆP</h1>
        </div>
        <div className="border-t border-gray-200 px-4 py-3 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nghề nghiệp</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.ngheNghiep}</dd>
            </div>
            {/* <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Công ty</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Value</dd>
            </div> */}
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Chuyên môn</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.chiTietCongViec}</dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Thu Nhập</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {customer.thuNhap}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-3 sm:px-6">
          <h1 className="font-semibold leading-6 text-lg text-gray-900">THÔNG TIN NGÂN HÀNG</h1>
        </div>
        <div className="border-t border-gray-200 px-4 py-3 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Loại ngân hàng </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.nganHang}</dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Số tài khoản </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{customer.soTaiKhoan}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex items-center justify-start gap-x-6 pt-3 ">
        {/*place-items-center content-center*/}
        <Link to={'/edituser'} className="text-black hover:none">
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Chỉnh sửa thông tin
          </button>
        </Link>
        <Link to={'/editAccount'} className="text-black hover:none">
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Đổi mật khẩu
          </button>
        </Link>
      </div>
      {/* </div> */}
    </>
  );
};
export default User_Profile;

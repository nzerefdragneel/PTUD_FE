import { Navigate, Link } from "react-router-dom";
import UserService from "../services/user.service";
import authService from "../services/auth.service";
import React, { Component, useState, useEffect } from "react";
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
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { SimpleNavbar } from "./simplenavbar.component";
import customerService from "../services/customer.service";
import registerInsuranceService from "../services/registerInsurance.service";

export function SimpleCard() {
  return (
    <Card className="mt-6 w-96 h-auto">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
    </Card>
  );
}

export function SimpleSidebar() {
  return (
    <Card className="min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <Link to={"/"} className=" text-gray-900 ">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
        </Link>
        <Link
          to={"/profile"}
          className=" text-gray-900 rounded-2xl bg-slate-200"
        >
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

const Status_Register = () => {
  const [customer, setCustomer] = useState(null); // State để lưu thông tin của Customer

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const user = authService.getCurrentUser();
        const user_1 = {
          taiKhoan: user.taiKhoan,
          accessToken: user.accessToken,
        };

        const userID = user_1.taiKhoan.iD_TaiKhoan;

        const customerData = await customerService.getCustomer(userID);
        setCustomer(customerData);
        const myrequest = registerInsuranceService.getPhieuDangKy(
          customer.iD_KhachHang
        );
        myrequest
          .then((responseData) => {
            // Lấy iD_PhieuDangKi từ dữ liệu phản hồi
            const iD_PhieuDangKi = responseData[0].iD_PhieuDangKi;
            const tinhTrangDuyet = responseData[0].tinhTrangDuyet;

            // Hiển thị giá trị iD_PhieuDangKi trong một thông báo alert
            alert(`iD_PhieuDangKi: ${iD_PhieuDangKi}`);
          })
          .catch((error) => {
            // Xử lý lỗi nếu có
            console.error("Error:", error);
          });
        // Lưu thông tin của Customer vào state
      } catch (error) {
        // Xử lý lỗi nếu cần thiết
        console.error("Error fetching customer data:", error);
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
      <div className="px-4 py-3 sm:px-6">
        <h1 className="font-semibold leading-6 text-lg text-gray-900">
          YÊU CẦU ĐĂNG KÝ BẢO HIỂM
        </h1>
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {/* Tên gói */}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </>
  );
};
export default Status_Register;

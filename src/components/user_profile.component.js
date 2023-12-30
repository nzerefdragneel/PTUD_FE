import React, { Component, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { SimpleNavbar } from "./simplenavbar.component";

const User_Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user == null) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-3 sm:px-6">
          <h1 class="font-semibold leading-6 text-lg text-gray-900">
            THÔNG TIN CƠ BẢN
          </h1>
        </div>
        <div class="border-t border-gray-200 px-4 py-3 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Họ và tên</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                A
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Địa chỉ Email</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                example@gmaill.com
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Số điện thoại</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                (123) 456-7890
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Địa chỉ</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Số chứng minh nhân dân
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-3 sm:px-6">
          <h1 class="font-semibold leading-6 text-lg text-gray-900">
            THÔNG TIN NGHỀ NGHIỆP
          </h1>
        </div>
        <div class="border-t border-gray-200 px-4 py-3 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Nghề nghiệp</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Value
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Công ty</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Value
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Chuyên môn</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Value
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Thu Nhập</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {" "}
                Value
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-3 sm:px-6">
          <h1 class="font-semibold leading-6 text-lg text-gray-900">
            THÔNG TIN NGÂN HÀNG
          </h1>
        </div>
        <div class="border-t border-gray-200 px-4 py-3 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Loại ngân hàng </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Value
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Số tài khoản </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Value
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex items-center justify-start gap-x-6 pt-3 ">
        {/*place-items-center content-center*/}
        <Link to={"/edituser"} className="text-black hover:none">
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Chỉnh sửa thông tin
          </button>
        </Link>
        <Link to={"/editAccount"} className="text-black hover:none">
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

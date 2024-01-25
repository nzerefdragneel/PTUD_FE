import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KhachHangService from "../services/khachHang.service";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import { Button } from "@material-tailwind/react";
import authService from "../services/auth.service";
import { useParams, useLocation } from "react-router-dom";
const ChiTietDongPhi = () => {
  const {
    state: { bHiem: baoHiem },
  } = useLocation();

  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);

  return (
    <div className="border border-black p-4">
      <h3 className="text-black font-bold mb-4 text-center">
        THANH TOÁN PHÍ BẢO HIỂM ĐỊNH KÌ
      </h3>
      <div className="mt-4 p-2 border border-black">
        <div className="flex mb-2">
          <h4 className="text-black">Tên bảo hiểm:</h4>
          <p className="ml-4">{baoHiem.tenBaoHiem}</p>
        </div>
        <div className="flex mb-2">
          <h4 className="text-black">Tên gói:</h4>
          <p className="ml-4">{baoHiem.tenGoi}</p>
        </div>
        <div className="flex mb-2 items-center">
          <h4 className="text-black">Ngày hết hạn:</h4>
          <p className="ml-4">{baoHiem.hanCuoi.toISOString().slice(0, 10)}</p>
        </div>
        <div className="flex mb-2">
          <h4 className="text-black">Số tiền cần đóng:</h4>
          <p className="ml-4 font-bold">{Math.round(baoHiem.soTien)} VNĐ</p>
        </div>
        <div className="flex">
          <h4 className="text-black">Tình trạng thanh toán:</h4>
          <p className="ml-4 text-red-600">Chưa thanh toán</p>
        </div>
      </div>
      <div className="mt-4 p-2 border border-black">
        <h3 className="text-black">Các hình thức thanh toán</h3>
        <p className="ml-4">1. Nộp trực tiếp tại các chi nhánh của công ty.</p>
        <p className="ml-4">2. Chuyển khoản qua ngân hàng</p>
        <p className="ml-4">
          {" "}
          Hãy chuyển khoản đến ngân hàng ACB, số tài khoản: 55124789, tên tài
          khoản: Health Insurance
        </p>
        <p className="ml-4"> Nội dung chuyển khoản: {baoHiem.idhd}</p>
        {/* <p className="ml-4">3. Thanh toán momo</p> */}
      </div>
    </div>
  );
};

export default ChiTietDongPhi;

import React, { Component, useEffect, useState, useCallback } from "react";
import YeuCauTuVanService from "../services/yeuCauTuVan.service";
import KhachHangService from "../services/khachHang.service";
import authService from "../services/auth.service";
import { Button, Input } from "@material-tailwind/react";
import DialogDefault from "./dialog";

const YeuCauTuVan = () => {
  //lấy idtaikhoan từ bảng tài khoản
  const user = authService.getCurrentUser();
  const iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  console.log(user);
  // const iD_TaiKhoan = 12;
  const [diaDiem, setdiaDiem] = useState(null);
  const [ngay, setngay] = useState(null);
  const [gio, setgio] = useState(null);
  const [khachHang, setkhachHang] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [noiDungMessage, setnoiDungMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await KhachHangService.getByIdTaiKhoan(iD_TaiKhoan);
        setkhachHang(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleYeuCauTuVan = async () => {
    //kiểm tra khách hàng đã xác thực hay chưa
    console.log(khachHang);
    console.log(khachHang[0].xacThuc);
    console.log(khachHang[0].iD_KhachHang);
    if (khachHang[0].xacThuc === "Chưa Xác Thực") {
      setShowMessage(true);
      setnoiDungMessage("Tài khoản chưa xác thực. Vui lòng quay lại sau!");
      return;
    }
    // Kiểm tra xem có trường thông tin nào trống không
    if (!diaDiem) {
      setShowMessage(true);
      setnoiDungMessage("Không thể bỏ trống địa điểm!");
      return;
    }
    if (!ngay) {
      setShowMessage(true);
      setnoiDungMessage("Không thể bỏ trống ngày tư vấn!");
      return;
    }
    if (!gio) {
      setShowMessage(true);
      setnoiDungMessage("Không thể bỏ trống giờ tư vấn!");
      return;
    }
    // Kiểm tra ngày có sau ngày hiện tại không
    const ngayHienTai = new Date();
    const ngayChon = new Date(`${ngay}T${gio}`);
    if (ngayChon <= ngayHienTai) {
      setShowMessage(true);
      setnoiDungMessage(
        "Vui lòng chọn ngày và giờ tư vấn sau thời điểm hiện tại!"
      );
      return;
    }

    const thoiGian = ngay + "T" + gio;
    console.log(thoiGian);
    try {
      const response = await YeuCauTuVanService.DatLichTuVan(
        khachHang[0].iD_KhachHang,
        diaDiem,
        thoiGian
      );
      console.log("YeuCauTuVan API Response:", response);
      setShowMessage(true);
      setnoiDungMessage("Gửi yêu cầu thành công!");
    } catch (error) {
      setShowMessage(true);
      setnoiDungMessage("Vui lòng kiểm tra lại thông tin!");
      console.error("Error sending YeuCauTuVan request:", error);
    }
  };
  const closeMessage = () => {
    setShowMessage(false);
  };

  return (
    <div>
      {showMessage && (
        <DialogDefault handler={closeMessage} message={noiDungMessage} />
      )}
      <div>
        <h3>Đặt lịch hẹn tư vấn</h3>
        <div>
          <div className="form-group">
            <label htmlFor="diaDiem" className="font-semibold mb-2">
              Địa điểm tư vấn mong muốn
            </label>
            <Input
              type="text"
              name="diaDiem"
              // className={`form-control ${isUsernameValid ? '' : 'border-red-500'}`}
              value={diaDiem}
              required
              onChange={(e) => setdiaDiem(e.target.value)}
              autoComplete="on"
              placeholder="17 Âu Cơ, Cô Giang, quận 1, Hồ Chí Minh"
            />
          </div>
        </div>

        <div className="form-group flex gap-4">
          <div>
            <label htmlFor="ngay" className="font-semibold mb-2 block">
              Ngày tư vấn
            </label>
            <input
              id="ngay"
              name="ngay"
              type="date"
              required
              autoComplete="off"
              onInput={(e) => setngay(e.target.value)}
              className="rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label htmlFor="gio" className="font-semibold mb-2 block">
              Giờ tư vấn
            </label>
            <input
              id="gio"
              name="gio"
              type="time"
              required
              autoComplete="off"
              onInput={(e) => setgio(e.target.value)}
              className="rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <Button
        onClick={handleYeuCauTuVan}
        className="bg-blue-500 text-white px-4 py-2"
      >
        GỬI YÊU CẦU
      </Button>
    </div>
  );
};

export default YeuCauTuVan;

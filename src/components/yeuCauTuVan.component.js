import React, { Component, useEffect, useState, useCallback } from "react";
import YeuCauTuVanService from "../services/yeuCauTuVan.service";
import KhachHangService from "../services/khachHang.service";
import authService from "../services/auth.service";
import { Button, Input } from "@material-tailwind/react";
import DialogDefault from "./dialog";
import { useNavigate } from "react-router-dom";
const YeuCauTuVan = () => {
  //lấy idtaikhoan từ bảng tài khoản
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  console.log(user);
  console.log(user.taiKhoan.iD_TaiKhoan);
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  console.log(iD_TaiKhoan);
  //cờ kiểm tra nếu user gởi lại yêu cầu tư vấn
  const [daGuiYeuCau, setDaGuiYeuCau] = useState(false);
  const [diaDiem, setdiaDiem] = useState(null);
  const [ngay, setngay] = useState(null);
  const [gio, setgio] = useState(null);
  const [kiemTra, setkiemTra] = useState(false);
  const [khachHang, setkhachHang] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [noiDungMessage, setnoiDungMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await KhachHangService.getByIdTaiKhoan(iD_TaiKhoan);
        setkiemTra(true);
        setkhachHang(response.data);
        console.log(response.data.xacThuc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleYeuCauTuVan = async () => {
    // Kiểm tra xem đã gửi yêu cầu chưa
    if (daGuiYeuCau) {
      setShowMessage(true);
      setnoiDungMessage("Bạn đã gửi yêu cầu, vui lòng đợi xử lý!");
      return;
    }
    //kiểm tra khách hàng đã có thông tin và xác thực hay chưa
    if (!kiemTra) {
      alert("Vui lòng nhập thông tin cá nhân và xác thực tài khoản!");
      navigate(`/addCustomer`);
      return;
    } else {
      if (khachHang.xacThuc === "Chưa Xác Thực") {
        setShowMessage(true);
        alert("Tài khoản chưa xác thực. Vui lòng quay lại sau!");
        return;
      }
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
    const chiChuaKhoangTrang = (dc) => {
      const addressRegex = /^\s+$/;

      return addressRegex.test(dc);
    };
    //kiểm tra thông tin trường địa chỉ
    const diaChiHopLe = (dc) => {
      const addressRegex = /^[^a-zA-Z0-9]+$/; // Biểu thức chính quy cho địa chỉ

      return addressRegex.test(dc);
    };
    //kiểm tra chỉ chứa toàn số
    const diaChiChiChuaSo = (address) => {
      const numberRegex = /^\d+$/; // Biểu thức chính quy cho chuỗi chỉ chứa số

      return numberRegex.test(address);
    };
    // Sử dụng hàm diaChiHopLe
    if (diaChiHopLe(diaDiem)) {
      setShowMessage(true);
      setnoiDungMessage("Địa điểm bạn nhập không hợp lệ!");
      return;
    }
    if (chiChuaKhoangTrang(diaDiem)) {
      setShowMessage(true);
      setnoiDungMessage("Địa điểm bạn nhập không hợp lệ!");
      return;
    }
    if (diaChiChiChuaSo(diaDiem)) {
      setShowMessage(true);
      setnoiDungMessage("Địa điểm bạn nhập không hợp lệ!");
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
    //gán cứng idkh=0 nếu tìm được kh thì gán lại kiểm tra nếu =0 thì chưa xác thực
    const thoiGian = ngay + "T" + gio;
    console.log(thoiGian);
    console.log(khachHang.iD_KhachHang);
    try {
      const response = await YeuCauTuVanService.DatLichTuVan(
        khachHang.iD_KhachHang,
        diaDiem,
        thoiGian
      );
      setDaGuiYeuCau(true);
      console.log("YeuCauTuVan API Response:", response);
      setShowMessage(true);
      setnoiDungMessage("Gửi yêu cầu thành công!");
    } catch (error) {
      setShowMessage(true);
      setDaGuiYeuCau(false);
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
              maxLength="100"
              // className={`form-control ${isUsernameValid ? '' : 'border-red-500'}`}
              value={diaDiem}
              required
              onChange={(e) => setdiaDiem(e.target.value)}
              autoComplete="on"
              placeholder="ví dụ: 17 Âu Cơ, Cô Giang, quận 1, Hồ Chí Minh"
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

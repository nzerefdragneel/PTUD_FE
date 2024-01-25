import React, { Component, useEffect, useState, useCallback } from "react";
import authService from "../services/auth.service";
import { Button, Input } from "@material-tailwind/react";
import DialogDefault from "./dialog";
import { useNavigate, useLocation } from "react-router-dom";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import ChiTietChinhSachService from "../services/ChiTietChinhSach.service";
import ChinhSachService from "../services/ChinhSach.service";

const ChinhSuaGoiBaoHiem = () => {
  const {
    state: { goiSanPham: goiBaohiem },
  } = useLocation();
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [danhSachChinhSach, setDanhSachChinhSach] = useState([]);
  const [danhSachDaLay, setDanhSachDaLay] = useState([]);
  const [tenBaoHiem, settenBaoHiem] = useState(null);
  const [tenGoi, settenGoi] = useState(null);
  const [giaTien, setgiaTien] = useState(null);
  const [thoiHan, setthoiHan] = useState(null);
  const [moTa, setmoTa] = useState(null);
  const [ngayPhatHanh, setngayPhatHanh] = useState(null);
  const [hinhAnh, sethinhAnh] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [noiDungMessage, setnoiDungMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ChiTietChinhSachService.getChiTietChinhSach(
          goiBaohiem.iD_GoiBaoHiem
        );
        const [result1, result2] = await Promise.all([
          ChiTietChinhSachService.getChiTietChinhSach(goiBaohiem.iD_GoiBaoHiem),
          ChiTietChinhSachService.getChiTietChinhSach(goiBaohiem.iD_GoiBaoHiem),
        ]);
        const data = response.data;
        const goiChuaLay = data.filter(
          (goi) => !danhSachDaLay.includes(goi.iD_ChinhSach)
        );

        setDanhSachChinhSach((prevGoiSanPham) => [
          ...prevGoiSanPham,
          ...goiChuaLay,
        ]);
        setDanhSachDaLay((prevDanhSachDaLay) => [
          ...prevDanhSachDaLay,
          ...goiChuaLay.map((goi) => goi.iD_ChinhSach),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleLuu = async () => {
    // Kiểm tra xem có trường thông tin nào trống không
    if (!tenBaoHiem) {
      setShowMessage(true);
      setnoiDungMessage("Không thể bỏ trống tên bảo hiểm!");
      return;
    }
    if (!tenGoi) {
      setShowMessage(true);
      setnoiDungMessage("Không thể bỏ trống tên gói!");
      return;
    }
    if (!giaTien) {
      setShowMessage(true);
      setnoiDungMessage("Không thể bỏ trống giá tiền!");
      return;
    }
    if (!thoiHan) {
      setShowMessage(true);
      setnoiDungMessage("Không thể bỏ trống thời hạn!");
      return;
    }
    if (!moTa) {
      setShowMessage(true);
      setnoiDungMessage("Không thể bỏ trống mô tả!");
      return;
    }

    const ngay_phat_hanh = new Date();
    console.log(ngay_phat_hanh);
    const tinhTrang = "Đang phát hành";
    try {
      const response = await GoiBaoHiemService.capNhatGBH(
        goiBaohiem.iD_GoiBaoHiem,
        goiBaohiem.iD_GoiBaoHiem,
        tenBaoHiem,
        tenGoi,
        giaTien,
        thoiHan,
        moTa,
        ngayPhatHanh,
        tinhTrang,
        hinhAnh
      );
      console.log("CapNhatGBH API Response:", response);
      setShowMessage(true);
      setnoiDungMessage("Chỉnh sửa thành công!");
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
        <div>
          <div className="form-group">
            <label htmlFor="tenBaoHiem" className="font-semibold mb-2">
              Tên bảo hiểm:
            </label>
            <Input
              type="text"
              name="tenBaoHiem"
              value={goiBaohiem.tenBaoHiem}
              required
              onChange={(e) => settenBaoHiem(e.target.value)}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tenGoi" className="font-semibold mb-2">
              Tên gói:
            </label>
            <Input
              type="text"
              name="tenGoi"
              value={goiBaohiem.tenGoi}
              required
              onChange={(e) => settenGoi(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="giaTien" className="font-semibold mb-2">
              Giá tiền:
            </label>
            <Input
              type="text"
              name="giaTien"
              value={goiBaohiem.giaTien}
              required
              onChange={(e) => setgiaTien(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="thoiHan" className="font-semibold mb-2">
              Thời hạn:
            </label>
            <Input
              type="text"
              name="thoiHan"
              value={goiBaohiem.thoiHan}
              required
              onChange={(e) => setthoiHan(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ngayPhatHanh" className="font-semibold mb-2">
              Ngày phát hành:
            </label>
            <Input
              type="text"
              name="ngayPhatHanh"
              value={goiBaohiem.ngayPhatHanh}
              required
              onChange={(e) => setngayPhatHanh(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hinhAnh" className="font-semibold mb-2">
              Ngày phát hành:
            </label>
            <Input
              type="text"
              name="hinhAnh"
              value={goiBaohiem.hinhAnh}
              required
              onChange={(e) => sethinhAnh(e.target.value)}
            />
          </div>
          <textarea
            value={goiBaohiem.moTa}
            onChange={(e) => setmoTa(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <Button onClick={handleLuu} className="bg-blue-500 text-white px-4 py-2">
        LƯU
      </Button>
    </div>
  );
};

export default ChinhSuaGoiBaoHiem;

import React, { Component, useEffect, useState, useCallback } from "react";
import { Button, Input } from "@material-tailwind/react";
import DialogDefault from "./dialog";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
const PhatHanhGoiBaoHiem = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [tenBaoHiem, settenBaoHiem] = useState(null);
  const [tenGoi, settenGoi] = useState(null);
  const [giaTien, setgiaTien] = useState(null);
  const [thoiHan, setthoiHan] = useState(null);
  const [moTa, setmoTa] = useState(null);
  const [hinhAnh, sethinhAnh] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [noiDungMessage, setnoiDungMessage] = useState(null);

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
    //kiểm tra hợp lệ

    const ngayPhatHanh = new Date();
    console.log(ngayPhatHanh);
    const tinhTrang = "Đang phát hành";
    const iD_GoiBaoHiem = 1; //dưới api đã cho nó tăng tự động
    try {
      const response = await GoiBaoHiemService.ThemGoiBaoHiem(
        iD_GoiBaoHiem,
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
              value={tenBaoHiem}
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
              value={tenGoi}
              required
              onChange={(e) => settenGoi(e.target.value)}
              list="tenGoiList"
            />
            <datalist id="tenGoiList">
              <option value="Bronze" />
              <option value="Siver" />
              <option value="Gold" />
              <option value="Platinum" />
            </datalist>
          </div>
          <div className="form-group">
            <label htmlFor="giaTien" className="font-semibold mb-2">
              Giá tiền:
            </label>
            <Input
              type="text"
              name="giaTien"
              value={giaTien}
              required
              onChange={(e) => setgiaTien(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="thoiHan" className="font-semibold mb-2">
              Thời hạn (tháng):
            </label>
            <Input
              type="text"
              name="thoiHan"
              value={thoiHan}
              required
              onChange={(e) => setthoiHan(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hinhAnh" className="font-semibold mb-2">
              Hình ảnh:
            </label>
            <Input
              type="text"
              name="hinhAnh"
              value={hinhAnh}
              required={true}
              onChange={(e) => sethinhAnh(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="moTa" className="font-semibold mb-2">
              Mô tả:
            </label>
            <textarea
              value={moTa}
              onChange={(e) => setmoTa(e.target.value)}
              placeholder="Mô tả"
              className="w-full p-2 border border-gray-300 rounded h-100"
            />
          </div>
        </div>
      </div>
      <Button onClick={handleLuu} className="bg-blue-500 text-white px-4 py-2">
        LƯU
      </Button>
    </div>
  );
};

export default PhatHanhGoiBaoHiem;

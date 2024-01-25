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
    const chiChuaKhoangTrang = (dc) => {
      const addressRegex = /^\s+$/;

      return addressRegex.test(dc);
    };
    const diaChiHopLe = (dc) => {
      const addressRegex = /^[^a-zA-Z0-9]+$/; // Biểu thức chính quy cho địa chỉ

      return addressRegex.test(dc);
    };
    const ChiChuaSo = (address) => {
      const numberRegex = /^\d+$/; // Biểu thức chính quy cho chuỗi chỉ chứa số

      return numberRegex.test(address);
    };
    function soTienHopLe(t) {
      // Biểu thức chính quy kiểm tra số tiền
      const amountRegex = /^\d+(\.\d{1,2})?$/;
      return amountRegex.test(t);
    }
    if (diaChiHopLe(tenBaoHiem)) {
      alert("Tên bảo hiểm không hợp lệ");
      return;
    }
    if (chiChuaKhoangTrang(tenBaoHiem)) {
      alert("Tên bảo hiểm không hợp lệ");
      return;
    }
    if (ChiChuaSo(tenBaoHiem)) {
      alert("Tên bảo hiểm không hợp lệ");
      return;
    }

    if (
      tenGoi !== "Gold" &&
      tenGoi !== "Siver" &&
      tenGoi !== "Platinum" &&
      tenGoi !== "Bronze"
    ) {
      alert("Tên gói không hợp lệ");
      return;
    }
    if (!soTienHopLe(giaTien)) {
      alert("Giá tiền không hợp lệ");
      return;
    }

    if (!isNaN(thoiHan)) {
      if (thoiHan % 12 !== 0) {
        alert("Thời hạn phải chia hết cho 12");
        return;
      }
    } else {
      alert("Thời hạn không hợp lệ");
      return;
    }
    if (diaChiHopLe(moTa)) {
      alert("Mô tả không hợp lệ");
      return;
    }
    if (chiChuaKhoangTrang(moTa)) {
      alert("Mô tả không hợp lệ");
      return;
    }
    if (ChiChuaSo(moTa)) {
      alert("Mô tả không hợp lệ");
      return;
    }
    if (chiChuaKhoangTrang(hinhAnh)) {
      alert("Hình ảnh không hợp lệ");
      return;
    }
    if (ChiChuaSo(hinhAnh)) {
      alert("Hình ảnh không hợp lệ");
      return;
    }

    //
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
      console.log(giaTien / 10);
      alert("Thêm bảo hiểm thành công!");
    } catch (error) {
      alert("Vui lòng kiểm tra lại thông tin!");
      console.error("Error sending  request:", error);
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
              maxLength="30"
              placeholder="ví dụ: bảo hiểm sức khỏe"
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
              maxLength="10"
              placeholder="chọn trong các gói có sẵn"
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
              maxLength="21"
              placeholder=" ví dụ: 15000.02  --sử dụng dấu . để biểu thị số sau thập phân, tối đa 2 số phần thập phân"
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
              placeholder="thời hạn chia hết cho 12 (bội của năm)"
              value={thoiHan}
              required
              onChange={(e) => setthoiHan(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hinhAnh" className="font-semibold mb-2">
              Link hình ảnh:
            </label>
            <Input
              type="text"
              name="hinhAnh"
              placeholder="link ảnh bảo hiểm"
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
              maxLength="50"
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

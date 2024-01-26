import React, { Component, useEffect, useState, useCallback } from "react";
import { Button, Input } from "@material-tailwind/react";
import DialogDefault from "./dialog";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import HopDongService from "../services/hopDong.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import PhieuThanhToanBaoHiemService from "../services/phieuThanhToanBaoHiem.service";
const TC_xacNhanTT = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);

  const [ngayThanhToan, setngayThanhToan] = useState(null);
  const [hinhThucThanhToan, sethinhThucThanhToan] = useState(null);
  const [soTien, setsoTien] = useState(null);
  const [kiemTra, setkiemTra] = useState(false);
  const [soHopDong, setsoHopDong] = useState(null);
  const [iD_HopDong, setiD_HopDong] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [noiDungMessage, setnoiDungMessage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const response = await HopDongService.getByIdHopDong();

      //   setsoHopDong(response.data.length);
      //   console.log(response.data.length);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
      try {
        const response = await HopDongService.getAll();

        setsoHopDong(response.data.length);
        console.log(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const TimHopDong = async (iD_HopDong) => {
    try {
      const hopD = await HopDongService.getByIdHopDong(iD_HopDong);
      if (hopD.data.trangThai === "Hiệu Lực") {
        try {
          const res = await PhieuThanhToanBaoHiemService.getByIdHopDong(
            iD_HopDong
          );
          if (res.data.length === hopD.data.thoiHan / 12) {
            alert("Không cần đóng phí");
            return;
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        try {
          const response = await GoiBaoHiemService.getByID(
            hopD.data.iD_GoiBaoHiem
          );
          const giaTien = response.data.giaTien;
          const nam = hopD.data.thoiHan / 12;
          const tienCanDong = giaTien / nam;
          setsoTien(tienCanDong.toFixed(2));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setkiemTra(true);
      }
    } catch (error) {
      alert("không tìm thấy hợp đồng khách hàng");
      console.error("Error fetching data:", error);
    }
  };
  const handleTao = async () => {
    if (soHopDong === null) {
      // setShowMessage(true);
      alert("Hiện không có hợp đồng nào!");
      navigate(`/taichinh/TC_QuanLiThanhToan`);
      return;
    } else {
      if (!iD_HopDong) {
        // setShowMessage(true);
        alert("Không thể bỏ trống iD_HopDong!");
        return;
      }
      if (!isNaN(iD_HopDong)) {
        if (iD_HopDong < 1 || iD_HopDong > soHopDong) {
          alert("iD_HopDong không tồn tại");
          return;
        }
      } else {
        alert("iD_HopDong không hợp lệ");
        return;
      }
    }
    console.log(soHopDong);
    // Kiểm tra xem có trường thông tin nào trống không
    if (!ngayThanhToan) {
      // setShowMessage(true);
      alert("Không thể bỏ trống ngày thanh toán!");
      return;
    }
    // Kiểm tra ngày có sau ngày hiện tại không
    const ngayHienTai = new Date();
    const ngayTT = new Date(ngayThanhToan);
    if (ngayTT > ngayHienTai) {
      setShowMessage(true);
      setnoiDungMessage("Thời gian thanh toán không hợp lệ");
      return;
    }
    if (!hinhThucThanhToan) {
      // setShowMessage(true);
      alert("Không thể bỏ trống hình thức thanh toán!");
      return;
    }
    if (!soTien) {
      // setShowMessage(true);
      alert("Không thể bỏ trống số tiền!");
      return;
    }

    //kiểm tra hợp lệ

    function soTienHopLe(t) {
      // Biểu thức chính quy kiểm tra số tiền
      const amountRegex = /^\d+(\.\d{1,2})?$/;
      return amountRegex.test(t);
    }

    if (
      hinhThucThanhToan !== "Tiền Mặt" &&
      hinhThucThanhToan !== "Chuyển Khoản"
    ) {
      alert(" Hình thức thanh toán không hợp lệ");
      return;
    }
    if (!soTienHopLe(soTien)) {
      alert("Số tiền không hợp lệ");
      return;
    }
    try {
      // let dem = 0;
      const res = await PhieuThanhToanBaoHiemService.getByIdHopDong(iD_HopDong);
      console.log(res.data);
      const phieuMoiTao = res.data.filter((ptt) => {
        const ngayTTDotNay = new Date(ptt.ngayThanhToan.slice(0, 10));
        // console.log(ngayThanhToan - ngayTTDotNay);
        const ntt = new Date(ngayThanhToan);
        return (
          ntt.getTime() - ngayTTDotNay.getTime() < 11 * 30 * 24 * 60 * 60 * 1000
        ); // Số mili giây 11 tháng
      });

      console.log(phieuMoiTao.length);
      if (phieuMoiTao.length !== 0) {
        //không cho thêm nữa
        alert(
          "Đã tạo phiếu thanh toán cho hợp đồng này trong đợt đóng phí này!"
        );
        return;
      } else {
        try {
          const response =
            await PhieuThanhToanBaoHiemService.ThemPhieuThanhToanBaoHiem(
              ngayThanhToan,
              hinhThucThanhToan,
              soTien,
              iD_HopDong
            );
          console.log("PhieuThanhToanBaoHiemService API Response:", response);
          //cập nhật lại trạng thái
          // console.log(phieuMoiTao[0].iD_PhieuThanhToan);
          try {
            const layIDPhieuTT =
              await PhieuThanhToanBaoHiemService.getByIdHopDong(iD_HopDong);
            const IDPhieuTTMoiTao = layIDPhieuTT.data.find(
              (ptt) => ptt.ngayThanhToan.slice(0, 10) === ngayThanhToan
            );
            try {
              const tinhTrangDuyet = "Đã Duyệt";
              const capNhatTinhTrang =
                await PhieuThanhToanBaoHiemService.XetDuyetPhieuThanhToan(
                  IDPhieuTTMoiTao.iD_PhieuThanhToan,
                  tinhTrangDuyet
                );
              alert("Tạo phiếu thanh toán thành công!");
            } catch (error) {
              alert("Thêm không thành công !");
              console.error("Error sending  request:", error);
            }
            console.log("PhieuThanhToanBaoHiemService API Response:", response);
          } catch (error) {
            alert("Thêm không thành công !");
            console.error("Error sending  request:", error);
          }
          console.log("PhieuThanhToanBaoHiemService API Response:", response);
        } catch (error) {
          alert("Vui lòng kiểm tra lại thông tin!");
          console.error("Error sending  request:", error);
        }
      }
    } catch (error) {
      try {
        const response =
          await PhieuThanhToanBaoHiemService.ThemPhieuThanhToanBaoHiem(
            ngayThanhToan,
            hinhThucThanhToan,
            soTien,
            iD_HopDong
          );
        console.log("PhieuThanhToanBaoHiemService API Response:", response);
        //cập nhật lại trạng thái
        // console.log(phieuMoiTao[0].iD_PhieuThanhToan);
        try {
          const layIDPhieuTT =
            await PhieuThanhToanBaoHiemService.getByIdHopDong(iD_HopDong);
          const IDPhieuTTMoiTao = layIDPhieuTT.data.find(
            (ptt) => ptt.ngayThanhToan.slice(0, 10) === ngayThanhToan
          );
          try {
            const tinhTrangDuyet = "Đã Duyệt";
            const capNhatTinhTrang =
              await PhieuThanhToanBaoHiemService.XetDuyetPhieuThanhToan(
                IDPhieuTTMoiTao.iD_PhieuThanhToan,
                tinhTrangDuyet
              );
            alert("Tạo phiếu thanh toán thành công!");
          } catch (error) {
            alert("Thêm không thành công !");
            console.error("Error sending  request:", error);
          }
          console.log("PhieuThanhToanBaoHiemService API Response:", response);
        } catch (error) {
          alert("Thêm không thành công !");
          console.error("Error sending  request:", error);
        }
        console.log("PhieuThanhToanBaoHiemService API Response:", response);
      } catch (error) {
        alert("Vui lòng kiểm tra lại thông tin!");
        console.error("Error sending  request:", error);
      }
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
        <div className="form-group">
          <label htmlFor="iD_HopDong" className="font-semibold mb-2">
            iD_HopDong:
          </label>
          <Input
            type="text"
            name="iD_HopDong"
            value={iD_HopDong}
            required
            onChange={(e) => setiD_HopDong(e.target.value)}
          />
        </div>
        <Button
          onClick={() => TimHopDong(iD_HopDong)}
          className="bg-blue-500 text-white px-4 py-2 mb-10"
        >
          Tìm hợp đồng
        </Button>
      </div>
      {kiemTra === true && (
        <div>
          {" "}
          <div>
            <div>
              <div>
                <strong className="mb-5 text-red-500">Số tiền:</strong>{" "}
                {soTien ? soTien : "N/A"} {" VNĐ"}
              </div>
              <div className="form-group flex gap-4">
                <div>
                  <label
                    htmlFor="ngayThanhToan"
                    className="font-semibold mb-2 block"
                  >
                    Ngày thanh toán
                  </label>
                  <input
                    id="ngayThanhToan"
                    name="ngayThanhToan"
                    type="date"
                    required
                    autoComplete="off"
                    onInput={(e) => setngayThanhToan(e.target.value)}
                    className="rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  htmlFor="hinhThucThanhToan"
                  className="font-semibold mb-2"
                >
                  Hình thức thanh toán
                </label>

                <select
                  name="hinhThucThanhToan"
                  value={hinhThucThanhToan}
                  id="hinhThucThanhToan"
                  form="healthDeclaration"
                  className="block w-10% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => sethinhThucThanhToan(e.target.value)}
                >
                  <option value=""> -- Chọn -- </option>
                  <option value="Tiền Mặt"> Tiền Mặt </option>
                  <option value="Chuyển Khoản"> Chuyển Khoản </option>
                </select>
              </div>
            </div>
          </div>
          <Button
            onClick={handleTao}
            className="bg-green-500 text-white px-4 py-2"
          >
            Tạo
          </Button>
        </div>
      )}
    </div>
  );
};

export default TC_xacNhanTT;

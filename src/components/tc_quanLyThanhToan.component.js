import React, { useState, useEffect } from "react";

import NhanVienService from "../services/nhanVien.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Button } from "@material-tailwind/react";
const TC_QuanLiThanhToan = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  console.log(iD_TaiKhoan);
  const [nhanVienData, setnhanVienData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_nv = await NhanVienService.getAllNhanVien();
        const data_nv = response_nv.data;
        console.log(response_nv.data);
        const nv = data_nv.filter((nvien) => nvien.iD_TaiKhoan === iD_TaiKhoan);
        console.log(nv[0].iD_NhanVien);
        setnhanVienData(nv);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handlelapPhieuThanhToanClick = () => {
    navigate(`/taichinh/TC_xacNhanTT`);
  };
  const handleXemHopDongCanTTClick = () => {
    navigate(`/nhanvien/NV_chonLichTuVan`);
  };
  const handlePhieuThanhToanClick = () => {
    navigate(`/nhanvien/NV_chonLichTuVan`);
  };
  const handleHopDongQuaHanlick = () => {
    navigate(`/nhanvien/NV_chonLichTuVan`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Button
          onClick={() => handlelapPhieuThanhToanClick()}
          className="bg-blue-500 text-white px-4 py-2 text-lg mr-4"
        >
          Xác nhận thanh toán chi phí
        </Button>
      </div>

      {/* <div>
        <Button
          onClick={() => handleXemHopDongCanTTClick()}
          className="bg-blue-500 text-white px-4 py-2 text-lg mr-4"
        >
          Các hợp đồng gần đến hạn thanh toán
        </Button>
      </div>
      <div>
        <Button
          onClick={() => handlePhieuThanhToanClick()}
          className="bg-blue-500 text-white px-4 py-2 text-lg mr-4"
        >
          Danh sách phiếu thanh toán
        </Button>
      </div>
      <div>
        <Button
          onClick={() => handleHopDongQuaHanlick()}
          className="bg-blue-500 text-white px-4 py-2 text-lg mr-4"
        >
          Các hợp đồng quá hạn thanh toán
        </Button>
      </div> */}
    </div>
  );
};

export default TC_QuanLiThanhToan;

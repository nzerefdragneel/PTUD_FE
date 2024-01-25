import React, { useState, useEffect } from "react";
import YeuCauTuVanService from "../services/yeuCauTuVan.service";
import KhachHangService from "../services/khachHang.service";
import phieuDangKiService from "../services/phieuDangKi.service";
import NhanVienService from "../services/nhanVien.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Button } from "@material-tailwind/react";
const NV_ChonLichHenKH = () => {
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
  const handleKiHopDongClick = () => {
    navigate(`/nhanvien/NV_chonLichKiHopDong`);
  };
  const handleTuVanClick = () => {
    navigate(`/nhanvien/NV_chonLichTuVan`);
  };
  return (
    <div>
      {nhanVienData.length === 0 && (
        <h5>
          Hãy điền thông tin cá nhân để chọn lịch tư vấn và kí hợp đồng với
          khách hàng!
        </h5>
      )}
      {nhanVienData.length !== 0 && (
        <div>
          {/* <Button
            onClick={() => handleKiHopDongClick()}
            className="bg-blue-500 text-white px-4 py-2 text-lg mr-4"
          >
            Lịch kí hợp đồng
          </Button> */}
          <Button
            onClick={() => handleTuVanClick()}
            className="bg-blue-500 text-white px-4 py-2 text-lg"
          >
            Lịch tư vấn bảo hiểm
          </Button>
        </div>
      )}
    </div>
  );
};

export default NV_ChonLichHenKH;

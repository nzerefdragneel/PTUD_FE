import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import { Button } from "@material-tailwind/react";
import authService from "../services/auth.service";
const NV_ds_GBH = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [danhSachGoiSanPham, setDanhSachGoiSanPham] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GoiBaoHiemService.getAll();
        const data = response.data.filter(
          (gbh) => gbh.tinhTrang === "Đang Phát Hành"
        );
        setDanhSachGoiSanPham(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleXemChiTietClick = (goiSanPham) => {
    navigate(`/nhanvien/chinh-sua-ds-chinh-sach/${goiSanPham.iD_GoiBaoHiem}`, {
      state: { goiSanPham },
    });
  };
  return (
    <header className="wrapper mt-8 space-y-4 text-center">
      <h3 className="mb-8 mx-auto">Danh sách gói bảo hiểm đang phát hành</h3>
      <div className="grid gap-4">
        {danhSachGoiSanPham.map((goiSanPham) => (
          <div
            key={goiSanPham.iD_GoiBaoHiem}
            onClick={() => handleXemChiTietClick(goiSanPham)}
            className="goiBaoHiemItem grid grid-cols-3 gap-4 custom-border  rounded cursor-pointer "
          >
            <p className="text-black-600 mb-2 mt-2 ">
              ID_GoiBaoHiem: {goiSanPham.iD_GoiBaoHiem}
            </p>
            <p className="text-black-600 mb-2 mt-2 ">{goiSanPham.tenBaoHiem}</p>
            <p className="text-black-600 mb-2 mt-2">Gói {goiSanPham.tenGoi}</p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default NV_ds_GBH;

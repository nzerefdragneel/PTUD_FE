import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import { Button } from "@material-tailwind/react";
import authService from "../services/auth.service";
const NV_ds_GoiBaoHiem = () => {
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

        setDanhSachGoiSanPham(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [danhSachGoiSanPham]);

  const handleTaoMoiClick = () => {
    navigate(`/nhanVien/phatHanhGoiBaoHiem`);
  };

  const handleXemChiTietClick = (goiSanPham) => {
    // Chuyển hướng tới trang chi tiết và truyền dữ liệu gói bảo hiểm qua đường dẫn
    navigate(
      `/nhanvien/nv_xem-chi-tiet-goi-bao-hiem/${goiSanPham.iD_GoiBaoHiem}`,
      {
        state: { goiSanPham },
      }
    );
  };
  const handleVoHieuHoaClick = async (goiSanPham) => {
    const tinhTrang = "Ngưng Phát Hành";
    try {
      const response = await GoiBaoHiemService.capNhatGoiBaoHiem(
        goiSanPham.iD_GoiBaoHiem,

        goiSanPham.tenBaoHiem,
        goiSanPham.tenGoi,
        goiSanPham.giaTien,
        goiSanPham.thoiHan,
        goiSanPham.moTa,
        goiSanPham.ngayPhatHanh,
        tinhTrang,
        goiSanPham.hinhAnh
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleTaiSuDungClick = async (goiSanPham) => {
    const tinhTrang = "Đang Phát Hành";
    try {
      const response = await GoiBaoHiemService.capNhatGoiBaoHiem(
        goiSanPham.iD_GoiBaoHiem,

        goiSanPham.tenBaoHiem,
        goiSanPham.tenGoi,
        goiSanPham.giaTien,
        goiSanPham.thoiHan,
        goiSanPham.moTa,
        goiSanPham.ngayPhatHanh,
        tinhTrang,
        goiSanPham.hinhAnh
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <header className="wrapper mt-8 space-y-4 text-center">
      <Button
        onClick={() => handleTaoMoiClick()}
        className="bg-green-500 text-white px-4 py-2 col-span-2 text-lg"
      >
        Tạo mới
      </Button>
      <h3 className="mb-8 mx-auto">Danh sách gói bảo hiểm</h3>
      <div className="grid gap-4">
        {danhSachGoiSanPham.map((goiSanPham) => (
          <div
            key={goiSanPham.iD_GoiBaoHiem}
            className="goiBaoHiemItem grid grid-cols-6 gap-4 border border-black-500 rounded"
          >
            <p className="col-span-1 text-black-600 ml-2 mb-2 mt-2  text-left">
              ID_GoiBaoHiem: {goiSanPham.iD_GoiBaoHiem}
            </p>
            <p className="col-span-3 text-black-600 mb-2 mt-2  text-left">
              {goiSanPham.tenBaoHiem}
            </p>
            <p className="col-span-1 text-black-600 mb-2 mt-2  text-left">
              Gói {goiSanPham.tenGoi}
            </p>
            <div className="col-span-1 grid-cols-2">
              <Button
                onClick={() => handleXemChiTietClick(goiSanPham)}
                className="bg-blue-500 text-white px-2 py-1 text-xs col-span-1 mt-2 mr-2"
                style={{ minWidth: "fit-content" }}
              >
                Xem
              </Button>
              {goiSanPham.tinhTrang === "Ngưng Phát Hành" && (
                <Button
                  onClick={() => handleTaiSuDungClick(goiSanPham)}
                  className="bg-green-500 text-white px-2 py-1 text-xs col-span-1 mt-2 mr-0 "
                  style={{ minWidth: "fit-content" }}
                >
                  Tái sử dụng
                </Button>
              )}

              {goiSanPham.tinhTrang === "Đang Phát Hành" && (
                <Button
                  onClick={() => handleVoHieuHoaClick(goiSanPham)}
                  className="bg-red-500 text-white px-2 py-1 text-xs col-span-1 mt-2 mr-0"
                  style={{ minWidth: "fit-content" }}
                >
                  Vô hiệu hóa
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default NV_ds_GoiBaoHiem;

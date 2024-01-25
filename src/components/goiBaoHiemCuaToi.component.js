import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import HopDongService from "../services/hopDong.service";
import KhachHangService from "../services/khachHang.service";
import authService from "../services/auth.service";
import { Button } from "@material-tailwind/react";

const GoiBaoHiemCuaToi = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [kiemTraCoTrongBangKH, setkiemTraCoTrongBangKH] = useState(false);
  //kiểm tra có hợp đồng còn đang hiệu lực không
  const [kiemTra, setkiemTra] = useState(false);
  //kiểm tra có hợp đồng hết hạn không
  const [kiemTra2, setkiemTra2] = useState(false);
  const [baoHiemConHieuLuc, setbaoHiemConHieuLuc] = useState([]);
  const [baoHiemHetHieuLuc, setbaoHiemHetHieuLuc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const khachHangData = await KhachHangService.getByIdTaiKhoan(
          iD_TaiKhoan
        );
        setkiemTraCoTrongBangKH(true);
        try {
          const hopDongCuaKH = await HopDongService.getByIdKhachHang(
            khachHangData.data.iD_KhachHang
          );
          //lấy hợp đồng còn hiệu lực
          const hopDongConHieuLuc = hopDongCuaKH.data.filter(
            (hd) => hd.trangThai === "Hiệu Lực"
          );
          const ds_hieuLuc = [];
          for (const hd of hopDongConHieuLuc) {
            try {
              const goiBaoHiem = await GoiBaoHiemService.getByID(
                hd.iD_GoiBaoHiem
              );
              ds_hieuLuc.push({
                idHopDong: hd.iD_HopDong,
                ngayKiKet: hd.ngayKyKet,
                idGBH: goiBaoHiem.data.iD_GoiBaoHiem,
                tenBaoHiem: goiBaoHiem.data.tenBaoHiem,
                tenGoi: goiBaoHiem.data.tenGoi,
                giaTien: goiBaoHiem.data.giaTien,
                thoiHan: goiBaoHiem.data.thoiHan,
                moTa: goiBaoHiem.data.moTa,
                ngayPhatHanh: goiBaoHiem.data.ngayPhatHanh,
                tinhTrang: goiBaoHiem.data.tinhTrang,
                hinhAnh: goiBaoHiem.data.hinhAnh,
              });
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
          if (ds_hieuLuc.length !== 0) {
            setkiemTra(true);
          }
          setbaoHiemConHieuLuc(ds_hieuLuc);
          //lấy hợp đồng hết hiệu lực
          const hopDongHetHieuLuc = hopDongCuaKH.data.filter(
            (hd) => hd.trangThai === "Hết Hiệu Lực"
          );
          console.log();
          const ds_HetHieuLuc = [];
          for (const hd of hopDongHetHieuLuc) {
            try {
              const goiBaoHiem = await GoiBaoHiemService.getByID(
                hd.iD_GoiBaoHiem
              );
              console.log(hd.iD_HopDong);
              ds_HetHieuLuc.push({
                idHopDong: hd.iD_HopDong,
                ngayKiKet: hd.ngayKyKet,
                idGBH: goiBaoHiem.data.iD_GoiBaoHiem,
                tenBaoHiem: goiBaoHiem.data.tenBaoHiem,
                tenGoi: goiBaoHiem.data.tenGoi,
                giaTien: goiBaoHiem.data.giaTien,
                thoiHan: goiBaoHiem.data.thoiHan,
                moTa: goiBaoHiem.data.moTa,
                ngayPhatHanh: goiBaoHiem.data.ngayPhatHanh,
                tinhTrang: goiBaoHiem.data.tinhTrang,
                hinhAnh: goiBaoHiem.data.hinhAnh,
              });
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
          if (ds_HetHieuLuc.length !== 0) {
            setkiemTra2(true);
          }
          ds_HetHieuLuc.sort((a, b) => b.idHopDong - a.idHopDong);
          setbaoHiemHetHieuLuc(ds_HetHieuLuc);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleXemChiTietClick = (goiSanPham) => {
    // Chuyển hướng tới trang chi tiết và truyền dữ liệu gói bảo hiểm qua đường dẫn
    navigate(
      `/chi-tiet-goi-bao-hiem-cua-khach-hang/${goiSanPham.iD_GoiBaoHiem}`,
      {
        state: { goiSanPham },
      }
    );
  };

  return (
    <header className="wrapper mt-8">
      {kiemTra ? (
        <div>
          <h3>Các gói bảo hiểm đang sử dụng</h3>
          <div className="grid grid-cols-3 gap-4">
            {baoHiemConHieuLuc.map((goiSanPham) => (
              <div
                key={goiSanPham.idGBH}
                className="goiBaoHiemItem border border-solid border-teal-500 p-4"
              >
                <img
                  src={goiSanPham.hinhAnh}
                  alt="Bao Hiem Image"
                  className="anhbaohiem"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <h3 className="text-lg font-semibold mb-2">
                  {goiSanPham.tenBaoHiem}
                </h3>
                <p className="text-gray-600 mb-4"> Gói {goiSanPham.tenGoi}</p>
                <p className="text-gray-600 mb-4">
                  Ngày kí kết hợp đồng: {goiSanPham.ngayKiKet.slice(0, 10)}
                </p>

                <div>
                  <Button
                    onClick={() => handleXemChiTietClick(goiSanPham)}
                    className="bg-blue-500 text-white px-4 py-2"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>Các gói bảo hiểm đang sử dụng</h3>
          <p>không có.</p>
        </div>
      )}
      {kiemTra2 ? (
        <div>
          <h3>Các gói bảo hiểm hết hạn sử dụng</h3>
          <div className="grid grid-cols-3 gap-4">
            {baoHiemHetHieuLuc.map((goiSanPham) => (
              <div
                key={goiSanPham.idGBH}
                className="goiBaoHiemItem border border-solid border-teal-500 p-4"
              >
                <img
                  src={goiSanPham.hinhAnh}
                  alt="Bao Hiem Image"
                  className="anhbaohiem"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <h3 className="text-lg font-semibold mb-2">
                  {goiSanPham.tenBaoHiem}
                </h3>
                <p className="text-gray-600 mb-4"> Gói {goiSanPham.tenGoi}</p>
                <p className="text-gray-600 mb-4">
                  Ngày kí kết hợp đồng: {goiSanPham.ngayKiKet.slice(0, 10)}
                </p>

                <div>
                  <Button
                    onClick={() => handleXemChiTietClick(goiSanPham)}
                    className="bg-blue-500 text-white px-4 py-2"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>Các gói bảo hiểm hết hạn sử dụng</h3>
          <p>không có.</p>
        </div>
      )}
    </header>
  );
};

export default GoiBaoHiemCuaToi;

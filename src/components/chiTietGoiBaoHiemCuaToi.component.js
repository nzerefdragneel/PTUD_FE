import React, { useEffect, useState, Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import HopDongService from "../services/hopDong.service";
import ChiTietChinhSachService from "../services/ChiTietChinhSach.service";
import ChinhSachService from "../services/ChinhSach.service";
import KhachHangService from "../services/khachHang.service";
import authService from "../services/auth.service";
const ChiTietGoiBaoHiemCuaToi = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  }

  const {
    state: { goiSanPham: goiBaohiem },
  } = useLocation();
  const navigate = useNavigate();
  console.log(goiBaohiem);
  const [kiemTra, setkiemTra] = useState(false);
  const [khachHang, setkhachHang] = useState([]);
  const [danhSachChinhSach, setDanhSachChinhSach] = useState([]);
  // const [danhSachDaLay, setDanhSachDaLay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cs = await ChiTietChinhSachService.getByIdGoiBaoHiem(
          goiBaohiem.idGBH
        );
        //lấy ra những chính sách mà lúc khách hàng mua đang áp dụng
        const data = cs.data.filter(
          (gbh) => gbh.ngayBatDau <= goiBaohiem.ngayKiKet
        );
        const ds_csTruocNgayKetThuc = [];
        for (const dt of data) {
          if (dt.ngayKetThuc === "0001-01-01T00:00:00") {
            ds_csTruocNgayKetThuc.push(dt);
          } else if (dt.ngayKetThuc >= goiBaohiem.ngayKiKet) {
            ds_csTruocNgayKetThuc.push(dt);
          }
        }
        // console.log(response_kh.data[0]);
        const ds_cs = [];
        for (const dt of ds_csTruocNgayKetThuc) {
          try {
            const ds_chinhSach = await ChinhSachService.getByIdCS(
              dt.iD_ChinhSach
            );
            ds_cs.push(ds_chinhSach.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        setDanhSachChinhSach(ds_cs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      if (iD_TaiKhoan !== null) {
        try {
          const response_kh = await KhachHangService.getByIdTaiKhoan(
            iD_TaiKhoan
          );
          setkhachHang(response_kh.data[0]);
          console.log(response_kh.data[0]);
          try {
            const res = await HopDongService.getByIdKhachHang(
              response_kh.data[0].iD_KhachHang
            );
            const hd_conHieuLuc = res.data.filter(
              (hd) =>
                hd.iD_GoiBaoHiem === goiBaohiem.idGBH &&
                hd.trangThai === "Hiệu Lực"
            );
            if (hd_conHieuLuc.length !== 0) {
              setkiemTra(true);
            }
            console.log(hd_conHieuLuc.length);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const handleDangKiBaoHiemClick = async (goiBaohiem) => {
    navigate(`/register/${goiBaohiem.iD_GoiBaoHiem}`, {
      state: { goiBaohiem },
    });
  };
  return (
    <header className="wrapper mt-8">
      <div className="baoHiem border border-black p-4 mb-4">
        <div className="TieuDe flex items-center">
          <h2 className="mr-2">{goiBaohiem.tenBaoHiem}</h2>
        </div>
        <p>Gói {goiBaohiem.tenGoi}</p>
        <img
          src={goiBaohiem.hinhAnh}
          alt="Bao Hiem Image"
          className="anhbaohiem"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div className="thongtinbaohiem">
          <p>Ngày kí kết hợp đồng: {goiBaohiem.ngayKiKet.slice(0, 10)}</p>
          <p>Giá tiền: {goiBaohiem.giaTien}</p>
          <p>Thời hạn:{goiBaohiem.thoiHan} tháng</p>
          <p>Ngày phát hành: {goiBaohiem.ngayPhatHanh.slice(0, 10)}</p>
          <p>Mô tả: {goiBaohiem.moTa}</p>
        </div>
      </div>
      <div className="danhsachchinhsach flex flex-col gap-4">
        <h4>Các chính sách áp dụng</h4>
        {danhSachChinhSach.map((chinhSach) => (
          <div
            key={chinhSach.iD_ChinhSach}
            className="ChinhSachItem border border-solid border-teal-500 p-4 mb-4"
          >
            <div className="IDChinhSach mb-4">
              <h5>Chính sách {chinhSach.iD_ChinhSach}</h5>

              <p className="text-gray-600 mb-4">
                Tên chính sách: {chinhSach.tenChinhSach}
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              Hạn mức chi trả: {chinhSach.hanMucChiTra} VNĐ
            </p>
            <p className="text-gray-600 mb-4">
              Điều kiện áp dụng: {chinhSach.dieuKienApDung}
            </p>
            <p className="text-gray-600 mb-4">Mô tả: {chinhSach.mota}</p>
          </div>
        ))}
      </div>
      {kiemTra ? (
        <div className="bg-blue-500 text-white px-4 py-2">
          Gói bảo hiểm đang được sử dụng
        </div>
      ) : (
        <Button
          onClick={() => handleDangKiBaoHiemClick(goiBaohiem)}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Tái tục
        </Button>
      )}
    </header>
  );
};

export default ChiTietGoiBaoHiemCuaToi;

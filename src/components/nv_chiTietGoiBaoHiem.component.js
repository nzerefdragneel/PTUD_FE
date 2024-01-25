import React, { useEffect, useState, Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import HopDongService from "../services/hopDong.service";
import ChiTietChinhSachService from "../services/ChiTietChinhSach.service";
import ChinhSachService from "../services/ChinhSach.service";
import KhachHangService from "../services/khachHang.service";
import authService from "../services/auth.service";
const NV_ChiTietGoiBaoHiem = () => {
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
  const [kiemTraCoLaKhachHang, setkiemTraCoLaKhachHang] = useState(false);
  const [kiemTra, setkiemTra] = useState(false);
  const [khachHang, setkhachHang] = useState([]);
  const [danhSachChinhSach, setDanhSachChinhSach] = useState([]);
  if (user.taiKhoan.loaiTaiKhoan === "KH") {
    setkiemTraCoLaKhachHang(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cs = await ChiTietChinhSachService.getByIdGoiBaoHiem(
          goiBaohiem.iD_GoiBaoHiem
        );
        const data = cs.data.filter(
          (gbh) => gbh.ngayKetThuc !== "0001-01-01T00:00:00"
        );

        // console.log(response_kh.data[0]);
        const ds_cs = [];
        for (const dt of data) {
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
    };
    fetchData();
  }, []);

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
    </header>
  );
};

export default NV_ChiTietGoiBaoHiem;

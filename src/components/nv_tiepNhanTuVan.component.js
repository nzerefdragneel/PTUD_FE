import React, { useState, useEffect } from "react";
import YeuCauTuVanService from "../services/yeuCauTuVan.service";
import KhachHangService from "../services/khachHang.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const NV_TiepNhanTuVan = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [danhSachYCTV, setdanhSachYCTV] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await YeuCauTuVanService.getAll();
        const data = response.data.filter(
          (yc) => yc.tinhTrangDuyet === "Chưa Duyệt"
        );
        console.log(response.data);
        const ds_yc = [];
        for (const yc of data) {
          const response = await KhachHangService.getById(yc.iD_KhachHang);
          console.log(response.data.hoTen);
          ds_yc.push({
            iD_KhachHang: yc.iD_KhachHang,
            hoTen: response.data.hoTen,
            gioiTinh: response.data.gioiTinh,
            ngaySinh: response.data.ngaySinh,
            soNhaTenDuong: response.data.soNhaTenDuong,
            phuongXa: response.data.phuongXa,
            quanHuyen: response.data.quanHuyen,
            thanhPho: response.data.thanhPho,
            email: response.data.email,
            soDienThoai: response.data.soDienThoai,
            iD_YeuCauTuVan: yc.iD_YeuCauTuVan,
            tinhTrangDuyet: yc.tinhTrangDuyet,
            diaDiem: yc.diaDiem,
            thoiGian: yc.thoiGian,
          });
        }
        setdanhSachYCTV(ds_yc);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [danhSachYCTV]);
  const duyetClick = async (phieuYCTV) => {
    const tinhTrangDuyet = "Đã Duyệt";
    try {
      const response = await YeuCauTuVanService.UpdateTinhTrangDuyet(
        phieuYCTV.iD_YeuCauTuVan,
        tinhTrangDuyet
      );
    } catch (error) {
      alert("Không thành công!");

      console.error("Error sending YeuCauTuVan request:", error);
    }
  };
  const tuChoiClick = async (phieuYCTV) => {
    const tinhTrangDuyet = "Từ Chối";
    try {
      const response = await YeuCauTuVanService.UpdateTinhTrangDuyet(
        phieuYCTV.iD_YeuCauTuVan,
        tinhTrangDuyet
      );
    } catch (error) {
      alert("Không thành công!");

      console.error("Error sending YeuCauTuVan request:", error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Phiếu yêu cầu tư vấn chờ duyệt
      </h1>
      {danhSachYCTV.length === 0 ? (
        <p>Không có phiếu yêu cầu tư vấn nào chờ duyệt.</p>
      ) : (
        <>
          <ul>
            {danhSachYCTV.map((phieuYCTV) => (
              <li
                key={phieuYCTV.iD_YeuCauTuVan}
                className="bg-white rounded-lg shadow-md p-4 mb-4 text-sm"
              >
                <div>
                  <strong>iD_YeuCauTuVan:</strong> {phieuYCTV.iD_YeuCauTuVan}
                </div>
                <div>
                  <strong>Tình trạng duyệt:</strong> {phieuYCTV.tinhTrangDuyet}
                </div>
                <div>
                  <strong>Địa điểm:</strong> {phieuYCTV.diaDiem}
                </div>
                <div>
                  <strong>Thời gian:</strong> {phieuYCTV.thoiGian.slice(0, 10)}{" "}
                  {phieuYCTV.thoiGian.slice(-8)}
                </div>

                <div>
                  <strong>iD_KhachHang:</strong>{" "}
                  {phieuYCTV.iD_KhachHang ? phieuYCTV.iD_KhachHang : "N/A"}
                </div>
                <div>
                  <strong>Tên khách hàng:</strong>{" "}
                  {phieuYCTV.hoTen ? phieuYCTV.hoTen : "N/A"}
                </div>
                <div>
                  <strong>Giới tính:</strong>{" "}
                  {phieuYCTV.gioiTinh ? phieuYCTV.gioiTinh : "N/A"}
                </div>
                <div>
                  <strong>Ngày sinh:</strong>{" "}
                  {phieuYCTV.ngaySinh ? phieuYCTV.ngaySinh.slice(0, 10) : "N/A"}
                </div>

                <div>
                  <strong>Địa chỉ nơi ở:</strong> {phieuYCTV.soNhaTenDuong},{" "}
                  {phieuYCTV.phuongXa}, {phieuYCTV.quanHuyen},{" "}
                  {phieuYCTV.thanhPho}
                </div>
                <div>
                  <strong>email:</strong>{" "}
                  {phieuYCTV.email ? phieuYCTV.email : "N/A"}
                </div>
                <div>
                  <strong>Số điện thoại:</strong>{" "}
                  {phieuYCTV.soDienThoai ? phieuYCTV.soDienThoai : "N/A"}
                </div>
                <div className="mt-4 flex items-center">
                  <button
                    className="bg-green-500 text-white p-2 rounded mr-2"
                    onClick={() => duyetClick(phieuYCTV)}
                  >
                    Duyệt
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => tuChoiClick(phieuYCTV)}
                  >
                    Từ chối
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between">
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 1}
            >
              Trang trước
            </button>
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NV_TiepNhanTuVan;

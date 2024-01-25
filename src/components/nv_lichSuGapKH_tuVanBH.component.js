import React, { useState, useEffect } from "react";
import YeuCauTuVanService from "../services/yeuCauTuVan.service";
import KhachHangService from "../services/khachHang.service";
import phieuDangKiService from "../services/phieuDangKi.service";
import NhanVienService from "../services/nhanVien.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const NV_LichSu_TuVan = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  console.log(iD_TaiKhoan);
  const [nhanVienData, setnhanVienData] = useState([]);
  const [danhSachYCTV, setdanhSachYCTV] = useState([]);
  const [danhSachPhieuDangKi, setdanhSachPhieuDangKi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_nv = await NhanVienService.getAllNhanVien();
        const data_nv = response_nv.data;
        console.log(response_nv.data);
        const nv = data_nv.filter((nvien) => nvien.iD_TaiKhoan === iD_TaiKhoan);
        console.log(nv[0].iD_NhanVien);
        setnhanVienData(nv);
        //lấy phiếu yêu cầu tư vấn
        try {
          const response = await YeuCauTuVanService.GetByIdNhanVien(
            nv[0].iD_NhanVien
          );
          console.log(response.data);
          const data = response.data.filter((yc) => {
            const tgTuVan = new Date(yc.thoiGian);
            const hienTai = new Date();
            // So sánh với thời điểm hiện tại
            return tgTuVan < hienTai;
          });

          console.log(data);
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

          const sapXep = ds_yc.sort(
            (a, b) => new Date(a.thoiGian) - new Date(b.thoiGian)
          );
          console.log(sapXep);
          setdanhSachYCTV(sapXep);
          console.log(sapXep);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
              Lịch hẹn tư vấn bảo hiểm đã thực hiện
            </h1>
            {danhSachYCTV.length === 0 ? (
              <p>Không có.</p>
            ) : (
              <>
                <ul>
                  {danhSachYCTV.map((phieuYCTV) => (
                    <li
                      key={phieuYCTV.iD_YeuCauTuVan}
                      className="bg-white rounded-lg shadow-md p-4 mb-4 text-sm"
                    >
                      <div>
                        <strong>iD_YeuCauTuVan:</strong>{" "}
                        {phieuYCTV.iD_YeuCauTuVan}
                      </div>
                      <div>
                        <strong>Tình trạng duyệt:</strong>{" "}
                        {phieuYCTV.tinhTrangDuyet}
                      </div>
                      <div>
                        <strong>Địa điểm:</strong> {phieuYCTV.diaDiem}
                      </div>
                      <div>
                        <strong>Thời gian:</strong>{" "}
                        {phieuYCTV.thoiGian.slice(0, 10)}{" "}
                        {phieuYCTV.thoiGian.slice(-8)}
                      </div>

                      <div>
                        <strong>iD_KhachHang:</strong>{" "}
                        {phieuYCTV.iD_KhachHang
                          ? phieuYCTV.iD_KhachHang
                          : "N/A"}
                      </div>
                      <div>
                        <strong>Họ tên:</strong>{" "}
                        {phieuYCTV.hoTen ? phieuYCTV.hoTen : "N/A"}
                      </div>
                      <div>
                        <strong>Giới tính:</strong>{" "}
                        {phieuYCTV.gioiTinh ? phieuYCTV.gioiTinh : "N/A"}
                      </div>
                      <div>
                        <strong>Ngày sinh:</strong>{" "}
                        {phieuYCTV.ngaySinh
                          ? phieuYCTV.ngaySinh.slice(0, 10)
                          : "N/A"}
                      </div>

                      <div>
                        <strong>Địa chỉ nơi ở:</strong>{" "}
                        {phieuYCTV.soNhaTenDuong}, {phieuYCTV.phuongXa},{" "}
                        {phieuYCTV.quanHuyen}, {phieuYCTV.thanhPho}
                      </div>
                      <div>
                        <strong>email:</strong>{" "}
                        {phieuYCTV.email ? phieuYCTV.email : "N/A"}
                      </div>
                      <div>
                        <strong>Số điện thoại:</strong>{" "}
                        {phieuYCTV.soDienThoai ? phieuYCTV.soDienThoai : "N/A"}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between"></div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NV_LichSu_TuVan;

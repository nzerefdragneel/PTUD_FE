import React, { useState, useEffect } from "react";
import YeuCauTuVanService from "../services/yeuCauTuVan.service";
import KhachHangService from "../services/khachHang.service";
import phieuDangKiService from "../services/phieuDangKi.service";
import NhanVienService from "../services/nhanVien.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const NV_LichSu_KiHopDong = () => {
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

        //lấy phiếu đăng kí
        try {
          const response = await phieuDangKiService.GetByIdNhanVien(
            nv[0].iD_NhanVien
          );
          console.log(response.data);
          const data = response.data.filter((yc) => {
            const tgTuVan = new Date(yc.thoiGianKiKet);
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
              iD_PhieuDangKi: yc.iD_PhieuDangKi,
              tinhTrangDuyet: yc.tinhTrangDuyet,
              diaDiemKiKet: yc.diaDiemKiKet,
              thoiGianKiKet: yc.thoiGianKiKet,
              toKhaiSucKhoe: yc.toKhaiSucKhoe,
            });
          }

          const sx = ds_yc.sort(
            (a, b) => new Date(a.thoiGian) - new Date(b.thoiGian)
          );
          console.log(sx);
          setdanhSachPhieuDangKi(sx);
          console.log(sx);
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
              Lịch hẹn kí hợp đồng bảo hiểm đã thực hiện
            </h1>
            {danhSachPhieuDangKi.length === 0 ? (
              <p>Không có.</p>
            ) : (
              <>
                <ul>
                  {danhSachPhieuDangKi.map((phieuDK) => (
                    <li
                      key={phieuDK.iD_YeuCauTuVan}
                      className="bg-white rounded-lg shadow-md p-4 mb-4 text-sm"
                    >
                      <div>
                        <strong>iD_PhieuDangKi:</strong>{" "}
                        {phieuDK.iD_PhieuDangKi}
                      </div>
                      <div>
                        <strong>Tình trạng duyệt:</strong>{" "}
                        {phieuDK.tinhTrangDuyet}
                      </div>
                      <div>
                        <strong>Địa điểm:</strong> {phieuDK.diaDiemKiKet}
                      </div>
                      <div>
                        <strong>Thời gian:</strong>{" "}
                        {phieuDK.thoiGianKiKet.slice(0, 10)}{" "}
                        {phieuDK.thoiGianKiKet.slice(-8)}
                      </div>

                      <div>
                        <strong>iD_KhachHang:</strong>{" "}
                        {phieuDK.iD_KhachHang ? phieuDK.iD_KhachHang : "N/A"}
                      </div>
                      <div>
                        <strong>Họ tên:</strong>{" "}
                        {phieuDK.hoTen ? phieuDK.hoTen : "N/A"}
                      </div>
                      <div>
                        <strong>Giới tính:</strong>{" "}
                        {phieuDK.gioiTinh ? phieuDK.gioiTinh : "N/A"}
                      </div>
                      <div>
                        <strong>Ngày sinh:</strong>{" "}
                        {phieuDK.ngaySinh
                          ? phieuDK.ngaySinh.slice(0, 10)
                          : "N/A"}
                      </div>

                      <div>
                        <strong>Địa chỉ nơi ở:</strong> {phieuDK.soNhaTenDuong},{" "}
                        {phieuDK.phuongXa}, {phieuDK.quanHuyen},{" "}
                        {phieuDK.thanhPho}
                      </div>
                      <div>
                        <strong>email:</strong>{" "}
                        {phieuDK.email ? phieuDK.email : "N/A"}
                      </div>
                      <div>
                        <strong>Số điện thoại:</strong>{" "}
                        {phieuDK.soDienThoai ? phieuDK.soDienThoai : "N/A"}
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

export default NV_LichSu_KiHopDong;

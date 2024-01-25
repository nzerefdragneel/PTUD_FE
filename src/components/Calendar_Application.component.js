import React, { useState, useEffect } from "react";
import PhieuDangKiService from "../services/phieuDangKi.service";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import AuthService from "../services/auth.service";
import HopDongService from "../services/hopDong.service";
import { useNavigate } from "react-router-dom";
import NhanVienService from "../services/nhanVien.service";
const DanhSachKyKetList = () => {
  const user = AuthService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const nhanvien = NhanVienService.getCurrentNhanVien();

  const [phieudangkyList, setPhieuDangKyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusMessages, setStatusMessages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PhieuDangKiService.getAll();
        const phieudangkyData = response.data;

        const duyetPhieudangkyData = phieudangkyData.filter(
          (phieudangky) => phieudangky.tinhTrangDuyet === "Đã Duyệt"
        );

        const startIndex = (currentPage - 1) * 4;
        const endIndex = startIndex + 4;
        const currentList = duyetPhieudangkyData.slice(startIndex, endIndex);

        const updatedPhieudangkyList = await Promise.all(
          currentList.map(async (phieudangky) => {
            const goiBaoHiemResponse = await GoiBaoHiemService.getByID(
              phieudangky.iD_GoiBaoHiem
            );
            const goiBaoHiemData = goiBaoHiemResponse.data;

            return {
              ...phieudangky,
              goiBaoHiem: goiBaoHiemData,
              tenBaoHiem: goiBaoHiemData.tenBaoHiem,
            };
          })
        );

        setPhieuDangKyList(updatedPhieudangkyList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleCreateContract = async (iD_PhieuDangKi) => {
    try {
      // Gọi API tạo hợp đồng

      // Lấy iD_NhanVien từ localStorage
      console.log(nhanvien);

      const requestData = {
        iD_NhanVien: parseInt(nhanvien.iD_NhanVien),
        iD_PhieuDangKi: iD_PhieuDangKi,
      };

      // Gọi API cập nhật iD_NhanVien cho phiếu đăng ký
      await PhieuDangKiService.UpdateNhanVien(requestData);
      await HopDongService.taoHopDong(iD_PhieuDangKi);

      setStatusMessages((prevMessages) => ({
        ...prevMessages,
        [iD_PhieuDangKi]: {
          message: "Tạo hợp đồng thành công",
          type: "success",
        },
      }));
    } catch (error) {
      console.error("Error creating contract:", error);
      setStatusMessages((prevMessages) => ({
        ...prevMessages,
        [iD_PhieuDangKi]: {
          message: "Hợp đồng đã có sẵn ! ",
          type: "error",
        },
      }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Phiếu đăng ký đã duyệt </h1>
      {phieudangkyList.length === 0 ? (
        <p>Chưa có phiếu đăng ký nào đã duyệt.</p>
      ) : (
        <>
          <ul>
            {phieudangkyList.map((phieudangky) => (
              <li
                key={phieudangky.iD_PhieuDangKi}
                className="bg-white rounded-lg shadow-md p-4 mb-4 text-sm"
              >
                <div>
                  <strong>ID:</strong> {phieudangky.iD_PhieuDangKi}
                </div>

                <div>
                  <strong>Địa điểm kí kết:</strong> {phieudangky.diaDiemKiKet}
                </div>
                <div>
                  <strong>Thời gian kí kết:</strong> {phieudangky.thoiGianKiKet}
                </div>
                <div>
                  <strong>Tờ khai sức khỏe:</strong>{" "}
                  <a
                    href={phieudangky.toKhaiSucKhoe}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {phieudangky.toKhaiSucKhoe
                      ? phieudangky.toKhaiSucKhoe
                      : "N/A"}
                  </a>
                </div>
                <div>
                  <strong>Tên bảo hiểm:</strong>{" "}
                  {phieudangky.tenBaoHiem ? phieudangky.tenBaoHiem : "N/A"}
                </div>
                <div>
                  <strong>Gói bảo hiểm:</strong>{" "}
                  {phieudangky.goiBaoHiem
                    ? phieudangky.goiBaoHiem.tenGoi
                    : "N/A"}
                </div>

                <div className="mt-4 flex items-center">
                  <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() =>
                      handleCreateContract(phieudangky.iD_PhieuDangKi)
                    }
                  >
                    Nhận lịch hẹn hợp đồng
                  </button>
                  {statusMessages[phieudangky.iD_PhieuDangKi] && (
                    <div
                      className={
                        statusMessages[phieudangky.iD_PhieuDangKi].type ===
                        "success"
                          ? "ml-4 success-message"
                          : "ml-4 error-message"
                      }
                    >
                      {statusMessages[phieudangky.iD_PhieuDangKi].message}
                    </div>
                  )}
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

export default DanhSachKyKetList;

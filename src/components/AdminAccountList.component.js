import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const AdminAccountList = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [accounts, setAccounts] = useState([]);
  const [currentType, setCurrentType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getAll();
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterAccountsByType = (type) => {
    setCurrentType(type);
    setCurrentPage(1);
  };

  const toggleAccountStatus = async (iD_TaiKhoan, currentTinhTrang) => {
    try {
      // Tùy thuộc vào tình trạng hiện tại để quyết định hành động
      const newTinhTrang =
        currentTinhTrang === "Hoạt Động" ? "Đã Khóa" : "Hoạt Động";

      // Gọi API để cập nhật tình trạng tài khoản
      await UserService.chinhSuaTinhTrangHoatDong(iD_TaiKhoan, newTinhTrang);

      // Cập nhật danh sách sau khi thay đổi
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.iD_TaiKhoan === iD_TaiKhoan
            ? { ...account, tinhTrang: newTinhTrang }
            : account
        )
      );
    } catch (error) {
      console.error("Error toggling account status:", error);
    }
  };

  const filteredAccounts =
    currentType === null
      ? accounts
      : accounts.filter((account) => account.loaiTaiKhoan === currentType);

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const currentList = filteredAccounts.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Tài Khoản</h1>
      <div className="flex mb-4">
        <button
          className={`mr-2 p-2 rounded ${
            currentType === null ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => filterAccountsByType(null)}
        >
          Tất cả
        </button>
        <button
          className={`mr-2 p-2 rounded ${
            currentType === "ADMIN" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => filterAccountsByType("ADMIN")}
        >
          Admin
        </button>
        <button
          className={`mr-2 p-2 rounded ${
            currentType === "NV" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => filterAccountsByType("NV")}
        >
          Nhân viên
        </button>
        <button
          className={`mr-2 p-2 rounded ${
            currentType === "NVTC" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => filterAccountsByType("NVTC")}
        >
          Nhân viên TC
        </button>
        <button
          className={`p-2 rounded ${
            currentType === "KH" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => filterAccountsByType("KH")}
        >
          Khách hàng
        </button>
      </div>
      <ul>
        {currentList.length === 0 ? (
          <p>Chưa có tài khoản nào hiển thị.</p>
        ) : (
          currentList.map((account) => (
            <li
              key={account.iD_TaiKhoan}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <div>
                <strong>ID Tài Khoản:</strong> {account.iD_TaiKhoan}
              </div>
              <div>
                <strong>Tên Đăng Nhập:</strong> {account.tenDangNhap}
              </div>
              <div>
                <strong>Loại Tài Khoản:</strong> {account.loaiTaiKhoan}
              </div>
              <div>
                <strong>Tình Trạng Hoạt Động:</strong> {account.tinhTrang}
              </div>
              <div className="mt-2">
                {account.tinhTrang.toLowerCase().includes("hoạt động") ? (
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() =>
                      toggleAccountStatus(
                        account.iD_TaiKhoan,
                        account.tinhTrang
                      )
                    }
                  >
                    Khoá
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white p-2 rounded"
                    onClick={() =>
                      toggleAccountStatus(
                        account.iD_TaiKhoan,
                        account.tinhTrang
                      )
                    }
                  >
                    Mở khoá
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
      {/* Các nút điều chỉnh trang */}
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
    </div>
  );
};

export default AdminAccountList;

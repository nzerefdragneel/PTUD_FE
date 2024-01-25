import React, { useState, useEffect } from "react";
import PhieuDangKiService from "../services/phieuDangKi.service";
import CustomerService from "../services/customer.service";
import GoiBaoHiemService from "../services/goiBaoHiem.service";

const CustomerPhieuDangKyList = () => {
  const [phieuDangKyList, setPhieuDangKyList] = useState([]);
  const [goiBaoHiemInfo, setGoiBaoHiemInfo] = useState({});
  const [currentTab, setCurrentTab] = useState("Chưa duyệt");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(4);

  const customer = CustomerService.getCurrentCustomer();
  const customerId = customer.iD_KhachHang;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PhieuDangKiService.GetbyKH(customerId);
        const fetchedPhieuDangKyList = response.data;

        // Lặp qua danh sách phiếu đăng ký để lấy thông tin về gói bảo hiểm
        for (const phieuDangKy of fetchedPhieuDangKyList) {
          const goiBaoHiemResponse = await GoiBaoHiemService.getByID(
            phieuDangKy.iD_GoiBaoHiem
          );
          const goiBaoHiemInfo = goiBaoHiemResponse.data;

          // Lưu thông tin về gói bảo hiểm vào state
          setGoiBaoHiemInfo((prevInfo) => ({
            ...prevInfo,
            [phieuDangKy.iD_GoiBaoHiem]: goiBaoHiemInfo,
          }));
        }

        setPhieuDangKyList(fetchedPhieuDangKyList);
        setTotalPages(
          Math.ceil(
            fetchedPhieuDangKyList.filter(
              (phieu) => phieu.tinhTrangDuyet === currentTab
            ).length / itemsPerPage
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [customerId, currentTab, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeTab = (newTab) => {
    setCurrentTab(newTab);
    setCurrentPage(1);
  };

  const filteredPhieuDangKyList = phieuDangKyList.filter(
    (phieu) => phieu.tinhTrangDuyet === currentTab
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentList = filteredPhieuDangKyList.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Phiếu Đăng Ký</h1>
      <div className="mb-4">
        <button
          onClick={() => setCurrentTab("Chưa Duyệt")}
          className={`mr-2 p-2 rounded ${
            currentTab === "Chưa Duyệt"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Chưa Duyệt
        </button>
        <button
          onClick={() => setCurrentTab("Đã Duyệt")}
          className={`mr-2 p-2 rounded ${
            currentTab === "Đã Duyệt"
              ? "bg-green-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Đã Duyệt
        </button>
        <button
          onClick={() => setCurrentTab("Từ Chối")}
          className={`p-2 rounded ${
            currentTab === "Từ Chối" ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
        >
          Từ Chối
        </button>
      </div>
      <ul>
        {currentList.length === 0 ? (
          <p>Không có phiếu đăng ký nào.</p>
        ) : (
          currentList.map((phieuDangKy) => (
            <li
              key={phieuDangKy.iD_PhieuDangKi}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <div>
                <strong>ID Phiếu Đăng Ký:</strong> {phieuDangKy.iD_PhieuDangKi}
              </div>

              <div>
                <strong>Địa Điểm Kí Kết:</strong> {phieuDangKy.diaDiemKiKet}
              </div>
              <div>
                <strong>Thời Gian Kí Kết:</strong>{" "}
                {new Date(phieuDangKy.thoiGianKiKet).toLocaleDateString()}
              </div>
              <div>
                <strong>Tờ Khai Sức Khỏe:</strong> {phieuDangKy.toKhaiSucKhoe}
              </div>
              <div>
                <strong>ID Khách Hàng:</strong> {phieuDangKy.iD_KhachHang}
              </div>
              <div>
                <strong>ID Gói Bảo Hiểm:</strong> {phieuDangKy.iD_GoiBaoHiem}
              </div>
              <div>
                <strong>Tên Gói Bảo Hiểm:</strong>{" "}
                {goiBaoHiemInfo[phieuDangKy.iD_GoiBaoHiem]?.tenBaoHiem}
              </div>
              <div>
                <strong>Hạng Gói Bảo Hiểm:</strong>{" "}
                {goiBaoHiemInfo[phieuDangKy.iD_GoiBaoHiem]?.tenGoi}
              </div>
            </li>
          ))
        )}
      </ul>
      {/* Các nút điều chỉnh trang */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          className="bg-blue-500 text-white p-2 rounded"
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          className="bg-blue-500 text-white p-2 rounded"
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default CustomerPhieuDangKyList;

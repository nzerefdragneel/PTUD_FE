import React, { useState, useEffect } from "react";
import PhieuDangKiService from "../services/phieuDangKi.service";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import AuthService from "../services/auth.service";

const PhieuDangKyList = () => {
  const [phieudangkyList, setPhieuDangKyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PhieuDangKiService.getAll();
        const phieudangkyData = response.data;

        // Lọc ra những phiếu đăng ký có tinhTrangDuyet là "Chưa Duyệt"
        const chuaDuyetPhieudangkyData = phieudangkyData.filter(
          (phieudangky) => phieudangky.tinhTrangDuyet === "Chưa Duyệt"
        );

        const startIndex = (currentPage - 1) * 3;
        const endIndex = startIndex + 3;
        const currentList = chuaDuyetPhieudangkyData.slice(
          startIndex,
          endIndex
        );

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

  const handleAction = async (iD_PhieuDangKi, action) => {
    const user = AuthService.getCurrentUser();
    alert(user.taiKhoan.iD_TaiKhoan);
    try {
      let updatedPhieuDangKy;

      // Tạo updatedPhieuDangKy dựa trên loại action
      if (action === "duyet") {
        // updatedPhieuDangKy = {
        //   tinhTrangDuyet: "Đã Duyệt",
        //   diaDiemKiKet: "string", // Thay đổi địa điểm kí kết nếu cần
        //   toKhaiSucKhoe: "N/A",
        // };
        // alert(JSON.stringify(updatedPhieuDangKy));
        PhieuDangKiService.xetDuyetPhieuDangKy(iD_PhieuDangKi, "Đã Duyệt");
      } else if (action === "tuchoi") {
        updatedPhieuDangKy = {
          tinhTrangDuyet: "Từ Chối",
          diaDiemKiKet: "string", // Thay đổi địa điểm kí kết nếu cần
          toKhaiSucKhoe: "N/A",
        };
      }

      // Gọi API PUT để cập nhật phiếu đăng ký
      // const response = await PhieuDangKiService.xetDuyetPhieuDangKy(
      //   iD_PhieuDangKi,
      //   updatedPhieuDangKy
      // );

      // Xóa phần tử khỏi danh sách sau khi hành động thành công
      setPhieuDangKyList((prevList) =>
        prevList.filter((item) => item.iD_PhieuDangKi !== iD_PhieuDangKi)
      );
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Phiếu Đăng Ký Chờ Duyệt</h1>
      {phieudangkyList.length === 0 ? (
        <p>Chưa có phiếu đăng ký nào chờ duyệt.</p>
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
                  <strong>Tình trạng duyệt:</strong>{" "}
                  {phieudangky.tinhTrangDuyet}
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
                    className="bg-green-500 text-white p-2 rounded mr-2"
                    onClick={() =>
                      handleAction(phieudangky.iD_PhieuDangKi, "duyet")
                    }
                  >
                    Duyệt
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() =>
                      handleAction(phieudangky.iD_PhieuDangKi, "tuchoi")
                    }
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

export default PhieuDangKyList;

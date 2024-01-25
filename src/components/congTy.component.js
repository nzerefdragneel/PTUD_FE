import React, { useEffect, useState } from "react";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import { Button } from "@material-tailwind/react";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
const CongTy = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [companyInfo, setCompanyInfo] = useState({
    tenCongTy: "",
    diaChi: "",
    email: "",
    soDienThoai: "",
  });
  const [editable, setEditable] = useState(false); // Thêm biến trạng thái để kiểm soát tính chỉnh sửa

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GoiBaoHiemService.getCompanyInfo();
        const data = response.data;

        setCompanyInfo({
          tenCongTy: data.tenCongTy,
          diaChi: data.diaChi,
          email: data.email,
          soDienThoai: data.soDienThoai,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    if (editable) {
      const { name, value } = e.target;
      setCompanyInfo((prevCompanyInfo) => ({
        ...prevCompanyInfo,
        [name]: value,
      }));
    }
  };

  const handleUpdateButtonClick = async () => {
    try {
      // Gọi API để cập nhật thông tin
      await GoiBaoHiemService.updateCompanyInfo(companyInfo);
      // Hiển thị thông báo hoặc thực hiện các hành động khác sau khi cập nhật
      setEditable(true); // Cho phép chỉnh sửa ngay sau khi cập nhật
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div
      className={`wrapper mt-8 border border-black rounded-md p-6 relative ${
        editable ? "editable" : "not-editable"
      }`}
    >
      <div className="inner">
        <div>
          <h3>Tên công ty :</h3>
          <input
            type="text"
            name="tenCongTy"
            value={companyInfo.tenCongTy}
            onChange={handleInputChange}
            className={`text-gray-600 mb-4 p-2 border border-gray-400 ${
              editable ? "focus:border-blue-500" : ""
            } transition`}
            readOnly={!editable} // Chỉ cho phép đọc khi không ở chế độ chỉnh sửa
          />
        </div>
        <div>
          <h3>Địa chỉ :</h3>
          <textarea
            name="diaChi"
            value={companyInfo.diaChi}
            onChange={handleInputChange}
            className={`text-gray-600 mb-4 p-2 border border-gray-400 resize-none ${
              editable ? "focus:border-blue-500" : ""
            } transition`}
            readOnly={!editable} // Chỉ cho phép đọc khi không ở chế độ chỉnh sửa
          />
        </div>
        <div>
          <h3>Email :</h3>
          <input
            type="text"
            name="email"
            value={companyInfo.email}
            onChange={handleInputChange}
            className={`text-gray-600 mb-4 p-2 border border-gray-400 ${
              editable ? "focus:border-blue-500" : ""
            } transition`}
            readOnly={!editable} // Chỉ cho phép đọc khi không ở chế độ chỉnh sửa
          />
        </div>
        <div>
          <h3>Số điện thoại :</h3>
          <input
            type="text"
            name="soDienThoai"
            value={companyInfo.soDienThoai}
            onChange={handleInputChange}
            className={`text-gray-600 mb-4 p-2 border border-gray-400 ${
              editable ? "focus:border-blue-500" : ""
            } transition`}
            readOnly={!editable} // Chỉ cho phép đọc khi không ở chế độ chỉnh sửa
          />
        </div>
      </div>
      {!editable && (
        <Button
          onClick={handleUpdateButtonClick}
          className="bg-blue-500 text-white px-4 py-2 absolute bottom-0 right-0 mb-4 mr-4 text-lg fixed-update-button"
        >
          Cập nhật
        </Button>
      )}
    </div>
  );
};

export default CongTy;

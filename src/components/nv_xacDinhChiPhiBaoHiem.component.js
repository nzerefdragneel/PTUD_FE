import React, { useEffect, useState } from "react";
import HopDongService from "../services/hopDong.service";
import NhanVienService from "../services/nhanVien.service";
import khachHangService from "../services/khachHang.service";
import GoiBaoHiemService from "../services/goiBaoHiem.service";

import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";

const Nv_xacDinhChiPhiBaoHiem = () => {
  const [danhSachHopDong, setDanhSachHopDong] = useState([]);
  const [selectedHopDong, setSelectedHopDong] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contractValue, setContractValue] = useState("");
  const [errors, setErrors] = useState({ contractValue: "" });

  const fetchData = async () => {
    try {
      const response = await HopDongService.getAll();
      setDanhSachHopDong(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const capNhatGiaTriHopDong = async (iD_HopDong, giaTriHopDong) => {
    try {
      const idInt = parseInt(iD_HopDong);
      if (isNaN(idInt)) {
        throw new Error("ID hợp đồng không hợp lệ");
      }

      const priceDecimal = parseFloat(giaTriHopDong);
      if (isNaN(priceDecimal)) {
        throw new Error("Giá trị hợp đồng không hợp lệ");
      }

      await HopDongService.XacDinhGiaTriHopDong(idInt, priceDecimal);
      toast.success("Hợp đồng đã được xác định giá trị thành công!");

      // Cập nhật trạng thái danhSachHopDong để loại bỏ hợp đồng đã cập nhật
      setDanhSachHopDong(
        danhSachHopDong.filter((hopDong) => hopDong.iD_HopDong !== idInt)
      );
    } catch (error) {
      console.error("Error updating GiaTriHopDong:", error);
      toast.error("Có lỗi xảy ra: " + error.message);
    }
  };

  const handleXacDinhGiaTriHopDong = async () => {
    if (!selectedHopDong) return;

    let newErrors = { contractValue: "" };

    // Validate contractValue
    if (Number(contractValue) <= 0) {
      newErrors.contractValue = "Giá trị hợp đồng phải lớn hơn 0";
    }

    if (newErrors.contractValue) {
      setErrors(newErrors);
      return;
    }
    try {
      await capNhatGiaTriHopDong(selectedHopDong.iD_HopDong, contractValue);
      // Đóng dialog và xóa hợp đồng đang được chọn
      setSelectedHopDong(null);
      closeDialog();
    } catch (error) {
      console.error("Error updating GiaTriHopDong:", error);
    }
  };

  const getNhanVienInfo = async (id_NhanVien) => {
    try {
      const response = await NhanVienService.getNhanVienbyID(id_NhanVien);
      return response.data.hoTen; // Giả sử trả về trường hoTen
    } catch (error) {
      console.error("Error fetching NhanVien info:", error);
      return "";
    }
  };

  const getKhachHangInfo = async (id_KhachHang) => {
    try {
      const response = await khachHangService.getById(id_KhachHang);
      return response.data.hoTen; // Giả sử trả về trường hoTen
    } catch (error) {
      console.error("Error fetching KhachHang info:", error);
      return "";
    }
  };

  const getGoiBaoHiemInfo = async (id_GoiBaoHiem) => {
    try {
      const response = await GoiBaoHiemService.getByID(id_GoiBaoHiem);
      const { tenBaoHiem, tenGoi } = response.data; // Giả sử API trả về cả hai trường này
      return `${tenBaoHiem} ${tenGoi}`; // Kết hợp tenBaoHiem và tenGoi
    } catch (error) {
      console.error("Error fetching GoiBaoHiem info:", error);
      return "";
    }
  };

  const openDialog = async (hopDong) => {
    setSelectedHopDong(hopDong);
    setContractValue("");
    const hoTenNhanVien = await getNhanVienInfo(hopDong.iD_NhanVien);
    const hoTenKhachHang = await getKhachHangInfo(hopDong.iD_KhachHang);
    const tenGoiBaoHiem = await getGoiBaoHiemInfo(hopDong.iD_GoiBaoHiem);

    setSelectedHopDong({
      ...hopDong,
      iD_NhanVien: hoTenNhanVien, // Cập nhật ID thành tên
      iD_KhachHang: hoTenKhachHang, // Cập nhật ID thành tên
      iD_GoiBaoHiem: tenGoiBaoHiem,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="wrapper mt-8 px-4">
      <Typography variant="h3">
        Danh Sách Hợp Đồng Cần Xác Định Giá Trị
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {danhSachHopDong
          .filter((hopDong) => hopDong.trangThai === "Dự Thảo")
          .map((hopDong) => (
            <Card
              key={hopDong.iD_HopDong}
              className="hover:shadow-md bg-gray-100"
            >
              <CardBody className="flex flex-col items-start p-4">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Hợp đồng bảo hiểm
                </Typography>
                <Typography color="blue-gray">
                  Ngày ký kết: {formatDate(hopDong.ngayKyKet)}
                </Typography>
                <Button color="blue" onClick={() => openDialog(hopDong)}>
                  Xem chi tiết
                </Button>
              </CardBody>
            </Card>
          ))}
      </div>
      {selectedHopDong && (
        <Dialog
          // size="lg"
          open={isDialogOpen}
          toggler={closeDialog}
          className="rounded-lg"
          style={{
            maxWidth: "80vw", // Chiều rộng tối đa là 80% của viewport width
            maxHeight: "80vh", // Chiều cao tối đa là 80% của viewport height
            width: "1200", // Chiều rộng tự động dựa vào nội dung
            height: "630", // Chiều cao tự động dựa vào nội dung
            backgroundColor: "rgba(0, 0, 0, 0)",
            overflowY: "auto", // Thêm thanh cuộn nếu nội dung dài hơn chiều cao của Dialog
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="p-4 relative" style={{ overflowY: "auto" }}>
            <button
              onClick={closeDialog}
              className="absolute top-0 right-0 text-2xl text-gray-600 p-2"
            >
              <span className="material-icons">close</span>
            </button>
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-bold mb-2"
            >
              Chi tiết hợp đồng {selectedHopDong.iD_HopDong}
            </Typography>
            <div className="flex flex-wrap justify-between">
              <div className="flex-1 min-w-0 px-2 mb-4">
                <Typography color="blue-gray">
                  Ngày ký kết: {formatDate(selectedHopDong.ngayKyKet)}
                </Typography>
                <Typography color="blue-gray">
                  Thời hạn hợp đồng: {selectedHopDong.thoiHan} tháng
                </Typography>
                <Typography color="blue-gray">
                  Điều khoản: {selectedHopDong.dieuKhoan}
                </Typography>
                <Typography color="blue-gray">
                  Ngày hiệu lực: {formatDate(selectedHopDong.hieuLuc)}
                </Typography>
                <Typography color="blue-gray">
                  Trạng thái: {selectedHopDong.trangThai}
                </Typography>
              </div>
              <div className="flex-1 min-w-0 px-2 mb-4">
                <Typography color="blue-gray">
                  Bảo hiểm: {selectedHopDong.iD_GoiBaoHiem}
                </Typography>
                <Typography color="blue-gray">
                  Khách hàng: {selectedHopDong.iD_KhachHang}
                </Typography>
                <Typography color="blue-gray">
                  Nhân viên: {selectedHopDong.iD_NhanVien}
                </Typography>
              </div>
            </div>
            <div className="px-4 pb-4">
              <Input
                type="text"
                placeholder="Nhập giá trị hợp đồng"
                value={contractValue}
                onChange={(e) => {
                  setContractValue(e.target.value);
                  setErrors({ ...errors, contractValue: "" }); // Xóa lỗi khi nhập
                }}
                className="input-field-class"
              />
              {errors.contractValue && (
                <div style={{ color: "red" }}>{errors.contractValue}</div>
              )}
              <div className="flex justify-between mt-4">
                <Button
                  color="green"
                  className="mr-2"
                  onClick={handleXacDinhGiaTriHopDong}
                >
                  Xác định giá trị
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Nv_xacDinhChiPhiBaoHiem;

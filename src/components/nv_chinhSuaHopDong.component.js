import React, { useEffect, useState } from "react";
import HopDongService from "../services/hopDong.service";
import QuanLyBaoHiemService from "../services/quanLyBaoHiem.service";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";

const Nv_chinhSuaHopDong = () => {
  const [danhSachHopDong, setDanhSachHopDong] = useState([]);
  const [selectedHopDong, setSelectedHopDong] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    ngayKyKet: "",
    thoiHan: "",
    dieuKhoan: "",
    hieuLuc: "",
    trangThai: "",
  });
  const [errors, setErrors] = useState({
    ngayKyKet: "",
    hieuLuc: "",
    thoiHan: "",
    dieuKhoan: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await HopDongService.getAll();
      setDanhSachHopDong(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const handleEdit = (hopDong) => {
    setSelectedHopDong(hopDong);
    setEditData({
      ngayKyKet: hopDong.ngayKyKet,
      hieuLuc: hopDong.hieuLuc,
      thoiHan: hopDong.thoiHan,
      dieuKhoan: hopDong.dieuKhoan,
      trangThai: "Hiệu Lực",
    });
    setIsDialogOpen(true);
  };

  const callQuanLyBaoHiem = async (
    iD_KhachHang,
    iD_GoiBaoHiem,
    ngayKyKet,
    thoiHan
  ) => {
    // Tính toán thoiGianKetThuc
    const endDate = new Date(ngayKyKet);
    endDate.setMonth(endDate.getMonth() + parseInt(thoiHan));

    const data = {
      iD_KhachHang: iD_KhachHang,
      iD_GoiBaoHiem: iD_GoiBaoHiem,
      thoiGianBatDau: ngayKyKet,
      thoiGianKetThuc: endDate.toISOString().split("T")[0], // chuyển đổi ngày thành chuỗi ISO
    };

    try {
      await QuanLyBaoHiemService.quanLyBaoHiem(data);
      toast.success("Quản lý bảo hiểm cập nhật thành công!");
    } catch (error) {
      console.error("Error calling quanLyBaoHiem:", error);
      toast.error("Có lỗi xảy ra khi gọi quản lý bảo hiểm.");
    }
  };

  const validateData = () => {
    let isValid = true;
    let newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validation for ngayKyKet
    if (!editData.ngayKyKet) {
      newErrors.ngayKyKet = "Ngày ký kết không được để trống";
      isValid = false;
    } else if (new Date(editData.ngayKyKet) < today) {
      newErrors.ngayKyKet = "Ngày ký kết không được nhỏ hơn ngày hiện tại";
      isValid = false;
    }

    // Validation for hieuLuc
    if (!editData.hieuLuc) {
      newErrors.hieuLuc = "Ngày hiệu lực không được để trống";
      isValid = false;
    } else if (new Date(editData.hieuLuc) < today) {
      newErrors.hieuLuc = "Ngày hiệu lực không được nhỏ hơn ngày hiện tại";
      isValid = false;
    } else if (new Date(editData.hieuLuc) <= new Date(editData.ngayKyKet)) {
      newErrors.hieuLuc = "Ngày hiệu lực phải lớn hơn ngày ký kết";
      isValid = false;
    }

    // Validation for thoiHan
    if (!editData.thoiHan) {
      newErrors.thoiHan = "Thời hạn không được để trống";
      isValid = false;
    } else if (isNaN(editData.thoiHan) || parseInt(editData.thoiHan) <= 0) {
      newErrors.thoiHan = "Thời hạn phải là một số lớn hơn 0";
      isValid = false;
    }

    // Validation for dieuKhoan
    if (!editData.dieuKhoan) {
      newErrors.dieuKhoan = "Điều khoản không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirm = async () => {
    // Xác thực dữ liệu trước khi gửi
    if (!validateData()) {
      toast.error("Lỗi xác thực dữ liệu. Vui lòng kiểm tra lại thông tin.");
      return;
    }

    // Logic gọi API nếu xác thực thành công
    try {
      if (
        selectedHopDong.trangThai === "Dự Thảo" &&
        editData.trangThai === "Hiệu Lực"
      ) {
        await callQuanLyBaoHiem(
          selectedHopDong.iD_KhachHang,
          selectedHopDong.iD_GoiBaoHiem,
          editData.ngayKyKet,
          editData.thoiHan
        );
      }
      await HopDongService.ChinhSuaHopDong(
        selectedHopDong.iD_HopDong,
        editData
      );
      toast.success("Hợp đồng đã được cập nhật thành công!");
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating contract:", error);
      toast.error("Có lỗi xảy ra khi cập nhật hợp đồng.");
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditData({
      ngayKyKet: "",
      thoiHan: "",
      dieuKhoan: "",
      hieuLuc: "",
      trangThai: "",
    });
  };
  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
    // Xóa thông báo lỗi cũ khi có sự thay đổi ở trường tương ứng
    setErrors({ ...errors, [field]: "" });
  };
  

  return (
    <div className="wrapper mt-8 px-4">
      <Typography variant="h3">Danh Sách Hợp Đồng</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {danhSachHopDong.map((hopDong) => (
          <Card
            key={hopDong.iD_HopDong}
            className="hover:shadow-md bg-gray-100"
          >
            <CardBody className="flex flex-col items-start p-4">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Hợp đồng: {hopDong.iD_HopDong}
              </Typography>
              <Typography color="blue-gray">
                Ngày ký kết: {formatDate(hopDong.ngayKyKet)}
              </Typography>
              <Button color="blue" onClick={() => handleEdit(hopDong)}>
                Chỉnh sửa
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedHopDong && (
        <Dialog
          open={isDialogOpen}
          toggler={() => setIsDialogOpen(false)}
          className="rounded-lg"
          style={{
            maxWidth: "800px",
            width: "80%",
            margin: "auto",
            overflow: "hidden",
          }}
        >
          {/* Dialog content with Input fields for thoiHan, dieuKhoan, ngayKyKet */}
          {/* "Xác nhận" button to submit changes */}
          <div className="p-4">
            <button
              onClick={closeDialog}
              className="absolute top-0 right-0 text-2xl text-gray-600 p-2"
            >
              <span className="material-icons">close</span>
            </button>
            <Typography color="blue-gray">
              Ngày ký kết hiện tại: {formatDate(selectedHopDong.ngayKyKet)}
              <Input
                type="date"
                placeholder="Ngày ký kết"
                value={editData.ngayKyKet}
                onChange={(e) =>
                  setEditData({ ...editData, ngayKyKet: e.target.value })
                }
              />
              {errors.ngayKyKet && (
                <div className="text-red-500">{errors.ngayKyKet}</div>
              )}
            </Typography>

            <Typography color="blue-gray">
              Ngày hiệu lực hiện tại: {formatDate(selectedHopDong.hieuLuc)}
              <Input
                type="date"
                placeholder="Ngày hiệu lực"
                value={editData.hieuLuc}
                onChange={(e) =>
                  setEditData({ ...editData, hieuLuc: e.target.value })
                }
              />
              {errors.hieuLuc && (
                <div className="text-red-500">{errors.hieuLuc}</div>
              )}
            </Typography>

            <Typography color="blue-gray">
              Thời hạn
              <Input
                type="text"
                placeholder="Thời hạn"
                value={editData.thoiHan}
                onChange={(e) =>
                  setEditData({ ...editData, thoiHan: e.target.value })
                }
              />
              {errors.thoiHan && (
                <div className="text-red-500">{errors.thoiHan}</div>
              )}
            </Typography>
            <Typography color="blue-gray">
              Điều khoản
              <Input
                type="text"
                placeholder="Điều khoản"
                value={editData.dieuKhoan}
                onChange={(e) =>
                  setEditData({ ...editData, dieuKhoan: e.target.value })
                }
              />
              {errors.dieuKhoan && (
                <div className="text-red-500">{errors.dieuKhoan}</div>
              )}
            </Typography>

            <Typography color="blue-gray">
              Trạng thái hiện tại: {selectedHopDong.trangThai}
              <select
                value={editData.trangThai}
                onChange={(e) =>
                  setEditData({ ...editData, trangThai: e.target.value })
                }
                className="form-select form-select-sm appearance-none
               block w-full px-2 py-1 text-base font-normal
               text-gray-700 bg-white bg-clip-padding bg-no-repeat
               border border-solid border-gray-300 rounded transition
               ease-in-out m-0 focus:text-gray-700 focus:bg-white
               focus:border-blue-600 focus:outline-none"
              >
                <option value="Hiệu Lực">Hiệu Lực</option>
                <option value="Hết Hiệu Lực">Hết Hiệu Lực</option>
                <option value="Dự Thảo">Dự Thảo</option>
              </select>
            </Typography>
            <Typography color="blue-gray">
              Giá trị hợp đồng: {formatCurrency(selectedHopDong.giaTriHopDong)}
            </Typography>
            <Typography color="blue-gray">
              Bảo hiểm: {selectedHopDong.iD_GoiBaoHiem}
            </Typography>
            <Typography color="blue-gray">
              Khách hàng: {selectedHopDong.iD_KhachHang}
            </Typography>
            <Typography color="blue-gray">
              Nhân viên: {selectedHopDong.iD_NhanVien}
            </Typography>

            <div className="flex justify-end">
              <Button color="green" onClick={handleConfirm}>
                Xác nhận
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Nv_chinhSuaHopDong;

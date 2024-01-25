import React, { useEffect, useState } from "react";
import HopDongService from "../services/hopDong.service";
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
      await HopDongService.XacDinhGiaTriHopDong(iD_HopDong, giaTriHopDong);
    } catch (error) {
      console.error("Error updating GiaTriHopDong:", error);
    }
  };

  const updateDanhSachHopDong = (iD_HopDong) => {
    setDanhSachHopDong(
      danhSachHopDong.filter((hopDong) => hopDong.iD_HopDong !== iD_HopDong)
    );
  };

  const handleXacDinhGiaTriHopDong = async (contractValue) => {
    if (selectedHopDong) {
      try {
        await HopDongService.XacDinhGiaTriHopDong(
          selectedHopDong.iD_HopDong,
          contractValue
        );
        updateDanhSachHopDong(selectedHopDong.iD_HopDong);
        closeDialog();
        toast.success("Hợp đồng đã được xác định giá trị thành công!");
      } catch (error) {
        console.error("Error updating GiaTriHopDong:", error);
        toast.error("Có lỗi xảy ra khi cập nhật giá trị hợp đồng!");
      }
    }
  };

  const openDialog = (hopDong) => {
    setSelectedHopDong(hopDong);
    setContractValue("");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="wrapper mt-8 px-4">
      <Typography variant="h3">Danh Sách Yêu Cầu Chi Trả</Typography>
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
                  Ngày yêu cầu: {formatDate(selectedHopDong.ngayKyKet)}
                </Typography>
                <Typography color="blue-gray">
                  Thời hạn hợp đồng: {selectedHopDong.thoiHan}
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
                onChange={(e) => setContractValue(e.target.value)}
                className="input-field-class"
              />
              <div className="flex justify-between mt-4">
                <Button
                  color="green"
                  className="mr-2"
                  onClick={() => handleXacDinhGiaTriHopDong()}
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

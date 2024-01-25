import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhatHanhCSService from "../services/PhatHanhCS.service"; // Make sure the path to the service file is correct
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import authService from "../services/auth.service";
import { toast } from "react-hot-toast";

const initialPolicyState = {
  tenChinhSach: "",
  hanMucChiTra: "",
  dieuKienApDung: "",
  mota: "",
  thoiGianPhatHanh: "",
};

const Nv_ds_allCS = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [danhSachChinhSach, setDanhSachChinhSach] = useState([]);
  const [showForm, setShowForm] = useState(false); // Renamed from showModal to showForm
  const [newPolicy, setNewPolicy] = useState({
    tenChinhSach: "",
    hanMucChiTra: "",
    dieuKienApDung: "",
    mota: "",
    thoiGianPhatHanh: "",
  });
  const [errors, setErrors] = useState({
    hanMucChiTra: "",
    thoiGianPhatHanh: "",
  });

  const fetchData = async () => {
    try {
      const response = await PhatHanhCSService.getAll();
      setDanhSachChinhSach(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Use fetchData in useEffect
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPolicySubmit = async (e) => {
    e.preventDefault();
    let newErrors = {
      tenChinhSach: "",
      hanMucChiTra: "",
      dieuKienApDung: "",
      mota: "",
      thoiGianPhatHanh: "",
    };

    if (!newPolicy.tenChinhSach.trim()) {
      newErrors.tenChinhSach = "Tên chính sách không được để trống";
    }
    // Validate HanMucChiTra
    if (!newPolicy.hanMucChiTra || Number(newPolicy.hanMucChiTra) <= 0) {
      newErrors.hanMucChiTra = "Hạn mức chi trả phải là một số lớn hơn 0";
    }

    if (!newPolicy.dieuKienApDung.trim()) {
      newErrors.dieuKienApDung = "Điều kiện áp dụng không được để trống";
    }

    if (!newPolicy.mota.trim()) {
      newErrors.mota = "Mô tả không được để trống";
    }

    if (!newPolicy.thoiGianPhatHanh) {
      newErrors.thoiGianPhatHanh = "Thời gian phát hành không được để trống.";
    } else {
      const selectedDate = new Date(newPolicy.thoiGianPhatHanh);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        newErrors.thoiGianPhatHanh =
          "Thời gian phát hành phải lớn hơn ngày hôm nay.";
      }
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      toast.error(
        "Có lỗi trong việc tạo chính sách, vui lòng kiểm tra lại thông tin."
      );
      return;
    }

    try {
      await PhatHanhCSService.addChinhSach(newPolicy);
      toast.success("Chính sách đã được thêm thành công!");
      setShowForm(false);
      setNewPolicy(initialPolicyState);
      fetchData();
    } catch (error) {
      console.error("Lỗi khi tạo chính sách", error);
      toast.error("Lỗi không xác định khi thêm chính sách.");
    }
  };

  const handleCancel = () => {
    setNewPolicy(initialPolicyState);
    setShowForm(false);
    fetchData();
  };
  return (
    <div className="wrapper mt-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h3">Danh sách chính sách</Typography>
        {!showForm && (
          <Button color="green" onClick={() => setShowForm(true)}>
            Thêm Chính Sách
          </Button>
        )}
      </div>
      {showForm ? (
        <form onSubmit={handleAddPolicySubmit} className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="tenChinhSach"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Tên Chính Sách
            </label>
            <input
              type="text"
              name="tenChinhSach"
              placeholder="Tên Chính Sách"
              value={newPolicy.tenChinhSach}
              onChange={handleInputChange}
              className="form-input px-3 py-2 border rounded"
            />
            {errors.tenChinhSach && (
              <div className="text-error-color text-base" role="alert">
                {errors.tenChinhSach}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="hanMucChiTra"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Hạn Mức Chi Trả
            </label>
            <input
              type="text"
              name="hanMucChiTra"
              placeholder="Hạn Mức Chi Trả"
              value={newPolicy.hanMucChiTra}
              onChange={handleInputChange}
              className="form-input px-3 py-2 border rounded"
            />
            {/* HanMucChiTra input and error message */}

            {errors.hanMucChiTra && (
              <div className="text-error-color text-base" role="alert">
                {errors.hanMucChiTra}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="dieuKienApDung"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Điều Kiện Áp Dụng
            </label>
            <input
              type="text"
              name="dieuKienApDung"
              placeholder="Điều Kiện Áp Dụng"
              value={newPolicy.dieuKienApDung}
              onChange={handleInputChange}
              className="form-input px-3 py-2 border rounded"
            />
            {/* dieuKienApDung input and error message */}
            {errors.dieuKienApDung && (
              <div className="text-error-color text-base" role="alert">
                {errors.dieuKienApDung}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="mota"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Mô Tả
            </label>
            <input
              type="text"
              name="mota"
              placeholder="Mô Tả"
              value={newPolicy.mota}
              onChange={handleInputChange}
              className="form-input px-3 py-2 border rounded"
            />
            {/* mota input and error message */}
            {errors.mota && (
              <div className="text-error-color text-base" role="alert">
                {errors.mota}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="thoiGianPhatHanh"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Thời Gian Phát Hành
            </label>
            <input
              type="date" // Use 'date' type for date input
              name="thoiGianPhatHanh"
              placeholder="Thời Gian Phát Hành"
              value={newPolicy.thoiGianPhatHanh}
              onChange={handleInputChange}
              className="form-input px-3 py-2 border rounded"
            />
            {errors.thoiGianPhatHanh && (
              <div className="text-error-color text-base" role="alert">
                {errors.thoiGianPhatHanh}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Button color="red" onClick={handleCancel}>
              Hủy
            </Button>
            <Button color="green" type="submit">
              Thêm
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {danhSachChinhSach.map((chinhSach) => (
            <Card
              key={chinhSach.iD_ChinhSach}
              className="hover:shadow-md bg-gray-100"
            >
              <CardBody className="flex flex-col items-start p-4">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {chinhSach.tenChinhSach}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  Hạn mức chi trả: {formatCurrency(chinhSach.hanMucChiTra)}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  Điều kiện áp dụng: {chinhSach.dieuKienApDung}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  Mô tả: {chinhSach.mota}
                </Typography>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="mb-4"
                >
                  Phát hành: {formatDate(chinhSach.thoiGianPhatHanh)}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default Nv_ds_allCS;

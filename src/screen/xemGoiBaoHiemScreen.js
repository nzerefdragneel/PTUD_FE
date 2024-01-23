import React, { Component } from "react";
import images from "../assets/images";
import GoiBaoHiem from "../components/item.component";
import { withRouter } from "../common/with-router";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
const XemGoiBaoHiemScreen = () => {
  const user = authService.getCurrentUser();
  console.log(user);
  const navigate = useNavigate();
  const handlelienHeClick = () => {
    if (user === null) {
      navigate(`/login`);
    }
    navigate(`/yeuCauTuVan`);
    // Chuyển hướng tới yêu cầu tư vấn
  };
  return (
    <div>
      <div className="relative">
        <img src={images.lienHe} alt="lienHeimage" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="bg-white p-4 text-center rounded-md transform rotate-5 relative"
            style={{ margin: "86px 68px", maxWidth: "calc(100% - 136px)" }}
          >
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-2 text-black">
                Bạn chưa có lựa chọn?
              </h2>
              <h4 className="text-lg mb-4 text-black">
                Bạn có thể nhận sự tư vấn chi tiết từ chúng tôi để tìm ra sự lựa
                chọn cho bạn!
              </h4>
            </div>

            <Button
              onClick={() => handlelienHeClick()}
              className="border border-black px-4 py-2 text-black absolute bottom-0 right-0 mb-4"
            >
              Liên hệ ngay
            </Button>
          </div>
        </div>
      </div>
      <GoiBaoHiem />
    </div>
  );
};

export default XemGoiBaoHiemScreen;

import React, { useEffect, useState } from "react";
import { withRouter } from "../common/with-router";
import CustomerService from "../services/customer.service";
import SendEmailVerifyService from "../services/sendEmailVerify.service";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const AuthVerify = (props) => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [customer, setCustomer] = useState(null);

  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get("accessToken");
  const Token = accessToken ? parseJwt(accessToken) : null;

  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem("customer"));

    setCustomer(storedCustomer);
    console.log(storedCustomer.iD_KhachHang);

    if (Token && storedCustomer && storedCustomer.iD_KhachHang == Token.idKH) {
      if (storedCustomer.xacThuc === "Đã Xác Thực") {
        // Customer has already been verified
        setVerificationStatus("alreadyVerified");
      } else {
        if (Token.exp * 1000 > Date.now()) {
          // Khi còn thời gian hiệu lực
          CustomerService.verifyCustomer(storedCustomer.iD_KhachHang)
            .then(() => {
              // Update the customer data after successful verification
              const updatedCustomer = {
                ...storedCustomer,
                xacThuc: "Đã Xác Thực",
              };
              localStorage.setItem("customer", JSON.stringify(updatedCustomer));
              setCustomer(updatedCustomer);

              setVerificationStatus("success");
            })
            .catch((error) => {
              console.error("Error verifying customer:", error);
              setVerificationStatus("error");
            });
        } else {
          // Khi quá thời gian
          SendEmailVerifyService.SendEmail(
            storedCustomer.iD_KhachHang,
            storedCustomer.email
          )
            .then(() => {
              setVerificationStatus("expired");
            })
            .catch((error) => {
              console.error("Error sending verification email:", error);
              setVerificationStatus("error");
            });
        }
      }
    } else {
      console.log("Xem lại phần iD");
    }
  }, [props]);

  const renderVerificationMessage = () => {
    if (verificationStatus === "success") {
      return (
        <div className="bg-green-500 text-white p-4">
          Xác thực thành công! Đã kích hoạt tài khoản của bạn.
        </div>
      );
    } else if (verificationStatus === "expired") {
      return (
        <div className="bg-yellow-500 text-white p-4">
          Quá thời gian. Hãy kiểm tra email và nhấn vào liên kết để xác thực
          lại.
        </div>
      );
    } else if (verificationStatus === "error") {
      return (
        <div className="bg-red-500 text-white p-4">
          Đã xảy ra lỗi khi xác thực. Vui lòng thử lại sau.
        </div>
      );
    } else if (verificationStatus === "alreadyVerified") {
      return (
        <div className="bg-blue-500 text-white p-4">
          Tài khoản đã được xác thực trước đó.
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {renderVerificationMessage()}
      {verificationStatus === "expired" && (
        <button
          onClick={() => {
            // Gửi lại email xác thực khi nhấn nút
            SendEmailVerifyService.SendEmail(
              customer.iD_KhachHang,
              customer.email
            );
          }}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Gửi lại Email Xác thực
        </button>
      )}
    </div>
  );
};

export default withRouter(AuthVerify);

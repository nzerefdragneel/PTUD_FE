import axios from "axios";
const bcrypt = require("bcryptjs");

// const API_URL = 'https://web-api-be.onrender.com/api/auth/';

// const API_URL = `${process.env.REACT_APP_URL_API}/api/TaiKhoan/DangKi`;

// const API_URL=`${process.env.REACT_APP_SERVICE_URL}/api/auth/`;

const API_URL = "https://localhost:7202/api/TaiKhoan";

class AuthService {
  login(username, password) {
    const URL_Login = `${API_URL}/DangNhap(TenDangNhap:string,MatKhau:string)?tenDN=${username}&MK=${password}`;

    return axios.get(URL_Login);
  }

  logout() {
    localStorage.clear();
  }

  register(username, password) {
    const url = `${API_URL}/DangKi`;
    const requestData = {
      tenDangNhap: username,
      matKhau: password,
    };

    return axios.post(API_URL + "/DangKi", requestData);
  }

  forgotPassword(email) {
    return axios.post(
      API_URL + "forgot-password",
      {
        email,
      },
      {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "no-cors",
      }
    );
  }

  /*    resetPassword(email, token, password) {
        return axios.post(
            API_URL + 'reset-password',
            {
                email,
                token,
                password,
            },
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                },
                mode: 'no-cors',
            },
        );
    }*/

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();

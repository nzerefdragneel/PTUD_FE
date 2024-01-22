import axios from "axios";

const API_URL = `https://localhost:7202/api/TaiKhoan/`;

//const API_TEST = `${process.env.REACT_APP_SERVICE_URL}/api/test/`;

class UserService {
  getAll() {
    return axios.get(`${API_URL}GetAll`);
  }

  chinhSuaTinhTrangHoatDong(id, tinhTrang) {
    const url = `${API_URL}ChinhSuaTinhTrangHoatDong`;

    return axios.post(url, { id, tinhTrang });
  }
  //   EditUser(userId, username, email, password) {
  //     return axios.put(
  //       API_URL + "edituser",
  //       {
  //         userId,
  //         username,
  //         email,
  //         password,
  //       },
  //       {
  //         headers: {
  //           "Cache-Control": "no-cache",
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //         mode: "no-cors",
  //       }
  //     );
  //   }
}

export default new UserService();

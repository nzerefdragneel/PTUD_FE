import axios from "axios";

const API_URL = `${process.env.REACT_APP_URL_API}/api/PhieuDangKi/`;

class registerInsuranceService {
  getPhieuDangKy(iD_Khachhang) {
    alert(`${API_URL}userId:int?userId=${iD_Khachhang}`);
    return axios

      .get(`${API_URL}userId:int?userId=${iD_Khachhang}`)
      .then((response) => response.data)
      .catch((error) => {
        // Nếu là lỗi 404 (Not Found), reject với một đối tượng để có thể phân biệt lỗi 404
        if (error.response || error.response.status === 404) {
          return Promise.reject({ notFound: true });
        }
        // Nếu không phải lỗi 404, reject với lỗi gốc
        return Promise.reject(error);
      });
  }
}

export default new registerInsuranceService();

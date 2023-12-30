import axios from 'axios';
//phonghoc@i91
// const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/GoiBaoHiem/GetAll`;
// const API_URL = `https://localhost:7202/api/GoiBaoHiem/GetAll`;
const LOCAL_JSON_URL = 'http://localhost:3001';
class HopDongService {
    getById(id) {
        return axios.get(`${LOCAL_JSON_URL}?ID_KhachHang=${id}`);
    }
}

export default new HopDongService();

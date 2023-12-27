import axios from 'axios';
//phonghoc@i91
// const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/GoiBaoHiem/GetAll`;
const API_URL = `https://localhost:7202/api/GoiBaoHiem/GetAll`;
class GoiBaoHiemService {
    getAll() {
        return axios.get(API_URL);
    }
}

export default new GoiBaoHiemService();

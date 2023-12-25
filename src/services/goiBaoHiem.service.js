import axios from 'axios';

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/products/`;

class GoiBaoHiemService {
    getAllProducts() {
        return axios
            .get(API_URL + 'all', {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                },
                mode: 'no-cors',
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                return [];
            });
    }
}

export default new GoiBaoHiemService();

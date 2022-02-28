const { response } = require('../config');
const dotenv = require('dotenv');
dotenv.config();

const auth = (req, res, next) => {
    const autHeader = req.headers['user_key'];
    if(autHeader == null) return response(res, { kode: '404', message: 'Tidak bisa akses halaman ini !' }, 404);
    if(autHeader === process.env.ACCESS_TOKEN_SECRET){
        next();
    }else{
        return response(res, { kode: '404', message: 'Authorization gagal !' }, 404);
    }
};

module.exports = {
    auth
}
const koneksi = require('../../config/db');
const { response } = require('../../config');
const bcrypt = require('bcrypt')
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

function dateconvert(str) {
	const date = new Date(str);
    const year = date.getFullYear();
    const mnth = ("0" + date.getMonth()).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
  	const valueConvert = [year, mnth, day].join("")
	return valueConvert
}

function makeRandom(n) {
	let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < n; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   	}
   	return result;
}

const readData = (res, statement) => {
    // jalankan query
	koneksi.query(statement, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
        }
        
        // jika request berhasil
        kode = 200
        message = 'Berhasil'
        response(res, { kode, message, data: result }, 200);
    });
};

const createData = (res, statement, data) => {
    // jalankan query
    let jenis, kirimdata
    if(!data.product_id){ jenis = "ADD" }else{ jenis = "UPDATE" }
    switch (jenis) {
        case "ADD":
            let date = new Date()
            let randomID = makeRandom(10)
            kirimdata = {
                product_id: "P-"+dateconvert(date)+""+randomID,
                product_name: data.product_name,
                product_price: data.product_price,
                product_stock: data.product_stock
            }
            // jika request berhasil
            koneksi.query(statement, kirimdata, (err, result, field) => {
                // error handling
                if (err) {
                    return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
                }

                // jika request berhasil
                kode = 200
                message = 'Data berhasil disimpan'
                response(res, { kode, message }, 200);
            });
            break;
        case "UPDATE":
            kirimdata = {
                product_id: data.product_id,
                product_name: data.product_name,
                product_price: data.product_price,
                product_stock: data.product_stock
            }
            // jika request berhasil
            koneksi.query(statement, [kirimdata, data.product_id], (err, result, field) => {
                // error handling
                if (err) {
                    return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
                }

                // jika request berhasil
                kode = 200
                message = 'Data berhasil diubah'
                response(res, { kode, message }, 200);
            });
            break;
        default:
            console.log('error')
    }
};

const deleteData = (res, statement, product_id) => {
    // jalankan query
	koneksi.query(statement, product_id, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
        }
        
        // jika request berhasil
        kode = 200
        message = 'Berhasil'
        response(res, { kode, message }, 200);
    });
};

module.exports = {
    readData,
    createData,
    deleteData,
}
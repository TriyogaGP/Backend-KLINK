const koneksi = require('../../config/db');
const { response } = require('../../config');
const bcrypt = require('bcrypt')
const path = require("path");
const dotenv = require('dotenv');
const redis = require('redis');
const e = require('express');
dotenv.config();
const { REDIS_ENDPOINT_URI, REDIS_HOST, REDIS_PORT } = process.env;
const redisEndpointUri = REDIS_ENDPOINT_URI ? REDIS_ENDPOINT_URI.replace(/^(redis\:\/\/)/, '') : `${REDIS_HOST}:${REDIS_PORT}`;
const redisClient = redis.createClient(`redis://${redisEndpointUri}`);

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

const readDataBy = (res, statement, user_id) => {
    // jalankan query
	koneksi.query(statement, user_id, (err, result, field) => {
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

const addData = (res, statement, data) => {
    // jalankan query
    koneksi.query(statement, data.product_id, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
        }
        
        // jika request berhasil
        if(result.length){
            let date = new Date()
            let randomID = makeRandom(10)
            let cartID = "C-"+dateconvert(date)+""+randomID
            redisClient.hmset(data.user_id, [
                'cart_id', cartID,
                'product_id', data.product_id,
                'user_id', data.user_id,
                'product_request', data.product_request,
            ], function(err, result){
                if(err) return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
                console.log(result)
                kode = 200
                message = 'Data berhasil disimpan di memory'
                response(res, { kode, message }, 200);
            })
        }else{
            return response(res, { kode: '404', message: 'Product tidak ditemukan' }, 404);
        }
    });

};

const CheckoutDataBy = (res, statement, statement2, CheckProduct, data) => {
    // jalankan query
    redisClient.hgetall(data.user_id, function(err, result){
        if(err) return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
        if(!result) return response(res, { kode: '404', message: 'Data tidak ditemukan' }, 404);
        koneksi.query(CheckProduct, [result.product_id, result.user_id], (err, data2, field) => {
            // error handling
            if (err) {
                return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
            }
            if(data2.length){
                const product_request = data2[0].product_request + parseInt(result.product_request)
                let simpandata = {
                    product_request: product_request
                }
                koneksi.query(statement2, [simpandata, result.product_id, result.user_id], (err, data4, field) => {
                    // error handling
                    if (err) {
                        return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
                    }

                    redisClient.del(result.user_id)

                    kode = 200
                    message = 'Data berhasil diubah'
                    response(res, { kode, message }, 200);
                });
            }else{
                let kirimdata = {
                    cart_id: result.cart_id,
                    product_id: result.product_id,
                    user_id: result.user_id,
                    product_request: result.product_request
                }
                koneksi.query(statement, kirimdata, (err, data3, field) => {
                    // error handling
                    if (err) {
                        return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
                    }
        
                    redisClient.del(result.user_id)
        
                    // jika request berhasil
                    kode = 200
                    message = 'Data berhasil disimpan'
                    response(res, { kode, message }, 200);
                });
            }
        });
    })
};

const paymentData = (res, statement, statement2, statement3, statement4, user_id) => {
    // jalankan query
	koneksi.query(statement, user_id, (err, result, field) => {
        // error handling
        if (err) {
            return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
        }
        
        // jika request 
        let stokAkhir = result[0].product_stock - result[0].product_request
        let kirimdata = {
            product_stock: stokAkhir
        }
        let date = new Date()
        let randomID = makeRandom(10)
        const totalHarga = result[0].product_price * result[0].product_request
        let simpanData = {
            no_order: "O-"+dateconvert(date)+""+randomID,
            user_id: user_id,
            total_harga: totalHarga
        }
        koneksi.query(statement2, [kirimdata, result[0].product_id], (err, hasil, field) => {
            // error handling
            if (err) {
                return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
            }
            koneksi.query(statement3, result[0].cart_id, (err, hasil, field) => {
                // error handling
                if (err) {
                    return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
                }
                koneksi.query(statement4, simpanData, (err, hasil, field) => {
                    // error handling
                    if (err) {
                        return response(res, { kode: '500', message: 'Terjadi kesalahan pada sistem kami, hubungin admin untuk tindak lanjut penyelesaiannya', error: err }, 500);
                    }
                    kode = 200
                    message = 'Berhasil'
                    response(res, { kode, message }, 200);
                });
            });
        });
    });
};

const deleteDataBy = (res, statement, cart_id) => {
    // jalankan query
	koneksi.query(statement, cart_id, (err, result, field) => {
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
    readDataBy,
    addData,
    CheckoutDataBy,
    paymentData,
    deleteDataBy,
}
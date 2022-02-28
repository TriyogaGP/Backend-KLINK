const { m_cart } = require('../../models');

error = {}

const readDataBy = (req, res) => {
    // buat query sql
    const querySql = `SELECT a.*, b.cart_id, b.product_request, c.*, ROW_NUMBER() OVER(ORDER BY b.cart_id ASC) AS item_no 
    FROM product AS a 
    INNER JOIN cart AS b ON b.product_id = a.product_id  
    INNER JOIN user AS c ON c.user_id = b.user_id
    WHERE c.user_id = ?
    ORDER BY b.createdAt ASC`;
    
    // masukkan ke dalam model
    m_cart.readDataBy(res, querySql, req.params.user_id);
};

const addData = (req, res) => {
    // buat query sql
    const data = { ...req.body };
    const querySqlProduct = `SELECT * FROM product WHERE product_id = ?`;

    // masukkan ke dalam model
    m_cart.addData(res, querySqlProduct, data);
};

const CheckoutData = (req, res) => {
    // buat query sql
    const data = { ...req.body };
    const querySqlProduct = `SELECT * FROM cart WHERE product_id = ? && user_id = ?`;
    const querySql = `INSERT INTO cart SET ?`;
    const querySql2 = `UPDATE cart SET ? WHERE product_id = ? && user_id = ?`;
    
    // masukkan ke dalam model
    m_cart.CheckoutDataBy(res, querySql, querySql2, querySqlProduct, data);
};

const deleteDataBy = (req, res) => {
    // buat query sql
    const querySql = 'DELETE FROM cart WHERE cart_id = ?';
    
    // masukkan ke dalam model
    m_cart.deleteDataBy(res, querySql, req.params.cart_id);
};

const paymentData = (req, res) => {
    // buat query sql
    const querySql = `SELECT a.*, b.cart_id, b.product_request, c.*, ROW_NUMBER() OVER(ORDER BY b.cart_id ASC) AS item_no 
    FROM product AS a 
    INNER JOIN cart AS b ON b.product_id = a.product_id  
    INNER JOIN user AS c ON c.user_id = b.user_id
    WHERE c.user_id = ?
    ORDER BY b.createdAt ASC`;
    const querySqlProduct = `UPDATE product SET ? WHERE product_id = ?`;
    const querySqlCart = 'DELETE FROM cart WHERE cart_id = ?';
    const querySqlOrder = 'INSERT INTO pembayaran SET ?';
    
    // masukkan ke dalam model
    m_cart.paymentData(res, querySql, querySqlProduct, querySqlCart, querySqlOrder, req.params.user_id);
};

module.exports = {
    readDataBy,
    addData,
    CheckoutData,
    deleteDataBy,
    paymentData,
}
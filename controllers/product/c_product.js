const { m_product } = require('../../models');

error = {}

const readData = (req, res) => {
    // buat query sql
    const querySql = `SELECT * FROM product ORDER BY product_id ASC`;
    
    // masukkan ke dalam model
    m_product.readData(res, querySql);
};

const createData = (req, res) => {
    // buat query sql
    const data = { ...req.body };
    const querySql = data.product_id !== null ? 'UPDATE product SET ? WHERE product_id = ?' : 'INSERT INTO product SET ?';
    
    // masukkan ke dalam model
    m_product.createData(res, querySql, data);
};

const deleteData = (req, res) => {
    // buat query sql
    const querySql = 'DELETE FROM product WHERE product_id = ?';
    
    // masukkan ke dalam model
    m_product.deleteData(res, querySql, req.params.product_id);
};

module.exports = {
    readData,
    createData,
    deleteData,
}
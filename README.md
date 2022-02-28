# Backend-KLINK

# Penjelasan #
Routes yang tersedia : <br>
<ul>
    <li> Product 
        <ol> Add/Update Product (/restApi/moduleProduct/createProduct - POST) </ol>
        <ol> Read Product (/restApi/moduleProduct/getProduct - GET) </ol>
        <ol> Delete Product (/restApi/moduleProduct/deleteProduct/:product_id - DELETE) </ol>
    </li>
    <li> Cart 
        <ol> Read Cart By User ID (/restApi/moduleCart/getCartBy/:user_id - GET) </ol>
        <ol> Add Cart (/restApi/moduleCart/addCart - POST) </ol>
        <ol> Checkout (/restApi/moduleCart/checkoutCart - POST) </ol>
        <ol> Payment (/restApi/moduleCart/payment/:user_id - POST) </ol>
        <ol> Delete Cart (/restApi/moduleCart/deleteCart/:cart_id - Delete) </ol>
    </li>
</ul>

Instalasi : <br>
<ul>
    <li>import db_klink.sql pada DBMS MySQL di folder db</li>
    <li>npm install</li>
    <li>npm start</li>
    <li>http://localhost:3000/getProduct (example)</li>
</ul>

Kebutuhan Body ketika POST data: <br>
1. Add Product <br>
    (product_id: null, product_name: "nama product", product_price: "harga product", product_stock: "stok product") <br>
2. Update Product <br>
    (product_id: "id product", product_name: "nama product", product_price: "harga product", product_stock: "stok product") <br>
3. Add to Cart <br>
    (product_id: "id product", user_id: "id user", product_request: "jumlah permintaan") <br>
4. Checkout <br>
    (user_id: "id user")
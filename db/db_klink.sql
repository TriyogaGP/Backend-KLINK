-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.17-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table db_klink.cart
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_request` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`cart_id`),
  KEY `FK__product` (`product_id`),
  KEY `FK_cart_user` (`user_id`),
  CONSTRAINT `FK__product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FK_cart_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_klink.cart: ~0 rows (approximately)
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

-- Dumping structure for table db_klink.pembayaran
CREATE TABLE IF NOT EXISTS `pembayaran` (
  `no_order` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_harga` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`no_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_klink.pembayaran: ~1 rows (approximately)
/*!40000 ALTER TABLE `pembayaran` DISABLE KEYS */;
REPLACE INTO `pembayaran` (`no_order`, `user_id`, `total_harga`, `createdAt`) VALUES
	('O-202201282198572880', 2, 32000, '2022-02-28 21:08:13');
/*!40000 ALTER TABLE `pembayaran` ENABLE KEYS */;

-- Dumping structure for table db_klink.product
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` varchar(50) NOT NULL,
  `product_name` varchar(256) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_stock` int(11) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_klink.product: ~10 rows (approximately)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
REPLACE INTO `product` (`product_id`, `product_name`, `product_price`, `product_stock`) VALUES
	('P-202201282581203774', 'Brilliant Watch', 250000, 100),
	('P-202201285140993081', 'Beautiful Sunglasses', 12000, 100),
	('P-202201285322213391', 'Audiophile Headphones', 550000, 100),
	('P-202201286318553832', 'Old fashion cellphone', 24000, 100),
	('P-202201286325274495', 'Digital Camera', 225000, 100),
	('P-202201286882175749', 'Empty Bluray Disc', 5000, 100),
	('P-202201287181771149', 'Herb caps', 12000, 100),
	('P-202201287800331383', 'Stylish Cup', 8000, 96),
	('P-202201288889973077', '256BG Pendrive', 60000, 100),
	('P-202201289793411655', 'Modern iPhone', 1000000, 100);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping structure for table db_klink.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name_user` varchar(256) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_klink.user: ~3 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`user_id`, `name_user`) VALUES
	(1, 'Andi'),
	(2, 'Sulis'),
	(3, 'Gopal');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

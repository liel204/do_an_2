/* =========================
   1. CREATE DATABASE
========================= */
DROP DATABASE IF EXISTS learn;
CREATE DATABASE learn
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE learn;

/* =========================
   2. USERS
========================= */
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  User_Name VARCHAR(255) NOT NULL,
  User_Email VARCHAR(255) NOT NULL UNIQUE,
  User_Password VARCHAR(255) NOT NULL,
  User_Role VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

/* =========================
   3. CATEGORIES
========================= */
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Category_Name VARCHAR(255) NOT NULL UNIQUE,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

/* =========================
   4. PRODUCTS
========================= */
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Product_Description VARCHAR(255) NOT NULL,
  Product_Name VARCHAR(255) NOT NULL UNIQUE,
  Product_Quantity INT NOT NULL,
  CategoryID INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_products_category
    FOREIGN KEY (CategoryID)
    REFERENCES categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   5. OPTIONS
========================= */
CREATE TABLE options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productID INT NOT NULL,
  memory VARCHAR(255) NOT NULL,
  option_price VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_options_product
    FOREIGN KEY (productID)
    REFERENCES products(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   6. OPTIONCOLORS
========================= */
CREATE TABLE optioncolors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productID INT NOT NULL,
  color VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_optioncolors_product
    FOREIGN KEY (productID)
    REFERENCES products(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   7. CARTITEMS
========================= */
CREATE TABLE cartitems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  CartItem_Quantity INT NOT NULL,
  ProductID INT NOT NULL,
  UserID INT NOT NULL,
  Status VARCHAR(255) NOT NULL,
  TotalPriceItem FLOAT NOT NULL,
  MemoryID INT NOT NULL,
  ColorID INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_cartitems_user
    FOREIGN KEY (UserID) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cartitems_product
    FOREIGN KEY (ProductID) REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cartitems_memory
    FOREIGN KEY (MemoryID) REFERENCES options(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cartitems_color
    FOREIGN KEY (ColorID) REFERENCES optioncolors(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   8. PAYMENTS
========================= */
CREATE TABLE payments (
  id VARCHAR(255) PRIMARY KEY,
  Payment_Method VARCHAR(255) NOT NULL,
  Oder_TotalPrice FLOAT NOT NULL,
  UserID INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_payments_user
    FOREIGN KEY (UserID)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   9. ODERS
========================= */
CREATE TABLE oders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Oder_TotalPrice FLOAT NOT NULL,
  Oder_Status VARCHAR(255) NOT NULL,
  Oder_AddressShipping VARCHAR(255) NOT NULL,
  ShippingID INT NOT NULL,
  CartItemID INT NOT NULL,
  Payment VARCHAR(255) NOT NULL,
  UserID INT NOT NULL,
  FullName VARCHAR(255) NOT NULL,
  Phone VARCHAR(255) NOT NULL,
  app_trans_id VARCHAR(255) NOT NULL,
  Note VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_oders_cartitem
    FOREIGN KEY (CartItemID)
    REFERENCES cartitems(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_oders_user
    FOREIGN KEY (UserID)
    REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_oders_payment
    FOREIGN KEY (app_trans_id)
    REFERENCES payments(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   10. COMANTS
========================= */
CREATE TABLE comants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Value VARCHAR(255) NOT NULL,
  UserID INT NOT NULL,
  ProductID INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT fk_comants_user
    FOREIGN KEY (UserID)
    REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_comants_product
    FOREIGN KEY (ProductID)
    REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   11. MESSAGES
========================= */
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversationId INT NOT NULL,
  senderID INT NOT NULL,
  text VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
) ENGINE=InnoDB;

/* =========================
   12. SEQUELIZEMETA
========================= */
CREATE TABLE sequelizemeta (
  name VARCHAR(255) NOT NULL PRIMARY KEY
) ENGINE=InnoDB;

/* =========================
   DONE 🎉
========================= */

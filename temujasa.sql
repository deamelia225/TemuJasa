CREATE DATABASE temujasa;
USE temujasa;

CREATE TABLE users(
                      id_user INT AUTO_INCREMENT PRIMARY KEY,
                      role ENUM('Pelanggan','Pekerja') NOT NULL,
                      nama VARCHAR(100) NOT NULL,
                      username VARCHAR(100) NOT NULL,
                      email VARCHAR(100) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      no_hp VARCHAR(20),
                      alamat TEXT
);

CREATE TABLE jasa(
                     id_jasa INT AUTO_INCREMENT PRIMARY KEY,
                     nama_jasa VARCHAR(100) NOT NULL,
                     deskripsi TEXT,
                     harga INT NOT NULL,
                     pekerja VARCHAR(100)
);

CREATE TABLE booking(
                        id_booking INT AUTO_INCREMENT PRIMARY KEY,
                        id_user INT,
                        id_jasa INT,
                        tanggal_booking DATE,
                        status ENUM('Menunggu','Diproses','Selesai') DEFAULT 'Menunggu'
);

CREATE TABLE notifikasi(
                           id_notifikasi INT AUTO_INCREMENT PRIMARY KEY,
                           id_user INT,
                           pesan TEXT,
                           status ENUM('belum_dibaca','dibaca') DEFAULT 'belum_dibaca',
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jasa(nama_jasa,deskripsi,harga,pekerja) VALUES
                                                        ('Service AC','Perbaikan AC rumah',10000,'Budi'),
                                                        ('Cleaning Rumah','Membersihkan rumah',15000,'Andi'),
                                                        ('Perbaikan Laptop','Servis laptop rusak',20000,'Rudi');

INSERT INTO notifikasi(id_user,pesan) VALUES
                                          (1,'Booking Service AC berhasil'),
CREATE DATABASE temujasa;
USE temujasa;

CREATE TABLE users(
                      id_user INT AUTO_INCREMENT PRIMARY KEY,
                      role ENUM('Pelanggan','Pekerja') NOT NULL,
                      nama VARCHAR(100) NOT NULL,
                      username VARCHAR(100) NOT NULL,
                      email VARCHAR(100) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      no_hp VARCHAR(20),
                      alamat TEXT
);

CREATE TABLE jasa(
                     id_jasa INT AUTO_INCREMENT PRIMARY KEY,
                     nama_jasa VARCHAR(100) NOT NULL,
                     deskripsi TEXT,
                     harga INT NOT NULL,
                     pekerja VARCHAR(100)
);

CREATE TABLE booking(
                        id_booking INT AUTO_INCREMENT PRIMARY KEY,
                        id_user INT,
                        id_jasa INT,
                        tanggal_booking DATE,
                        status ENUM('Menunggu','Diproses','Selesai') DEFAULT 'Menunggu'
);

CREATE TABLE notifikasi(
                           id_notifikasi INT AUTO_INCREMENT PRIMARY KEY,
                           id_user INT,
                           pesan TEXT,
                           status ENUM('belum_dibaca','dibaca') DEFAULT 'belum_dibaca',
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jasa(nama_jasa,deskripsi,harga,pekerja) VALUES
                                                        ('Service AC','Perbaikan AC rumah',10000,'Budi'),
                                                        ('Cleaning Rumah','Membersihkan rumah',15000,'Andi'),
                                                        ('Perbaikan Laptop','Servis laptop rusak',20000,'Rudi');

INSERT INTO notifikasi(id_user,pesan) VALUES
                                          (1,'Booking Service AC berhasil'),
                                          (1,'Pembayaran berhasil');

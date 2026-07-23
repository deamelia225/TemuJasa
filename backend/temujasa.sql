drop database if exists temujasa;
create database temujasa;
use temujasa;

CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('Pelanggan','Pekerja') NOT NULL,
    nama VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    jenis_kelamin ENUM('Laki-laki','Perempuan'),
    no_hp VARCHAR(20),
    alamat TEXT,
    foto VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pekerja (
    id_pekerja INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    keahlian VARCHAR(100),
    pengalaman VARCHAR(100),
    status ENUM('Aktif','Nonaktif') DEFAULT 'Aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user)
    REFERENCES users(id_user)
    ON DELETE CASCADE
);

CREATE TABLE jasa (
    id_jasa INT AUTO_INCREMENT PRIMARY KEY,
    id_pekerja INT NOT NULL,
    nama_jasa VARCHAR(100),
    kategori VARCHAR(100),
    deskripsi TEXT,
    harga INT,
    estimasi VARCHAR(50),
    foto VARCHAR(255),
    nama_bank VARCHAR(50),
    no_rekening VARCHAR(30),
    atas_nama VARCHAR(100),
    qris VARCHAR(255),
    keahlian VARCHAR(100),
    status ENUM('Tersedia','Tidak Tersedia') DEFAULT 'Tersedia',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_pekerja)
    REFERENCES pekerja(id_pekerja)
    ON DELETE CASCADE
);

CREATE TABLE booking (
    id_booking INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_jasa INT NOT NULL,
    tanggal_booking DATE,
    jam_booking TIME,
    alamat TEXT,
    keluhan TEXT,
    status ENUM(
        'Menunggu',
        'Diproses',
        'Selesai',
        'Dibatalkan'
        ) DEFAULT 'Menunggu',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_user)
    REFERENCES users(id_user),
    FOREIGN KEY(id_jasa)
    REFERENCES jasa(id_jasa)
);

CREATE TABLE pembayaran (
    id_pembayaran INT AUTO_INCREMENT PRIMARY KEY,
    id_booking INT NOT NULL,
    metode_pembayaran ENUM('Transfer Bank','E-Wallet','Tunai') NOT NULL,
    total_bayar DECIMAL(10,2) NOT NULL,
    tanggal_bayar DATE NOT NULL,
    status ENUM('Belum Bayar','Sudah Bayar') DEFAULT 'Belum Bayar',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_booking)
    REFERENCES booking(id_booking)
    ON DELETE CASCADE
);

CREATE TABLE ulasan (
    id_ulasan INT AUTO_INCREMENT PRIMARY KEY,
    id_booking INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    komentar VARCHAR(255),
    tanggal_ulasan DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_booking)
    REFERENCES booking(id_booking)
    ON DELETE CASCADE
);

CREATE TABLE notifikasi (
    id_notifikasi INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    judul VARCHAR(100) NOT NULL,
    pesan VARCHAR(255) NOT NULL,
    tanggal DATETIME NOT NULL,
    status ENUM('Belum Dibaca','Sudah Dibaca') DEFAULT 'Belum Dibaca',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_user)
    REFERENCES users(id_user)
    ON DELETE CASCADE
);

CREATE TABLE riwayat_booking (
    id_riwayat INT AUTO_INCREMENT PRIMARY KEY,
    id_booking INT NOT NULL,
    tanggal_selesai DATE NOT NULL,
    status_akhir ENUM('Selesai', 'Dibatalkan') NOT NULL,
    catatan VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_booking)
    REFERENCES booking(id_booking)
    ON DELETE CASCADE
);
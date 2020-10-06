const fs = require('fs');

const duLieuHoVaTen = require('./Dữ liệu họ và tên người Việt');
const choNgauNhienTanXuat = require('./Chọn ngẫu nhiên trong danh sách theo tần số xuất hiện');

//Tiền xử lí dữ liệu
console.log('Tiền xử lí dữ liệu ...');

const tienXuLiHo = choNgauNhienTanXuat.tienXuLi(duLieuHoVaTen.ho);
const tienXuLiTen = choNgauNhienTanXuat.tienXuLi(duLieuHoVaTen.ten);
const tienXuLiTenDem = choNgauNhienTanXuat.tienXuLi(duLieuHoVaTen.tenDem);

console.log('Xong');

//Tạo tên người
console.log('Tạo tên người ...');

const SO_LUONG_NGUOI = 1000;
const TY_LE_CO_TEN_DEM = 70;
const TY_LE_CO_HAI_HO = 50;

const mangTenNguoi = [];
for (let i = 0; i < SO_LUONG_NGUOI; i += 1) {
    let mangThanhPhanTen = [];

    //Tạo họ
    let ho = choNgauNhienTanXuat.chonNgauNhien(tienXuLiHo, duLieuHoVaTen.ho);
    mangThanhPhanTen.push(ho);

    if (Math.random() * 100 > TY_LE_CO_HAI_HO) {
        let hoThuHai = choNgauNhienTanXuat.chonNgauNhien(tienXuLiHo, duLieuHoVaTen.ho);
        while (hoThuHai == ho) {
            hoThuHai = choNgauNhienTanXuat.chonNgauNhien(tienXuLiHo, duLieuHoVaTen.ho);
        }

        mangThanhPhanTen.push(hoThuHai);
    }

    //Tạo tên đệm
    if (Math.random() * 100 > TY_LE_CO_TEN_DEM) {
        mangThanhPhanTen.push(choNgauNhienTanXuat.chonNgauNhien(tienXuLiTenDem, duLieuHoVaTen.tenDem));
    }

    //Tạo tên
    mangThanhPhanTen.push(choNgauNhienTanXuat.chonNgauNhien(tienXuLiTen, duLieuHoVaTen.ten));

    //Gộp thành tên và thêm vào mảng kết quả
    mangTenNguoi.push(mangThanhPhanTen.map((item) => item.data).join(' '));
}

console.log('Xong');

//Ghi ra file
console.log('Ghi ra file ...');

fs.writeFileSync('Kết quả danh sách tên người.txt', mangTenNguoi.join('\n'), { encoding: 'utf8' });

console.log('Xong');

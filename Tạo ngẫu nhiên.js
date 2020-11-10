const fs = require('fs');

const duLieuHoVaTen = require('./Dữ liệu họ và tên người Việt');
const choNgauNhienTanXuat = require('./Chọn ngẫu nhiên trong danh sách theo tần số xuất hiện');
const taoTenMotNguoiNgauNhien = require('./Tạo tên của một người ngẫu nhiên');

//Tiền xử lí dữ liệu
const tienXuLiHo = choNgauNhienTanXuat.tienXuLi(duLieuHoVaTen.ho);
const tienXuLiTen = choNgauNhienTanXuat.tienXuLi(duLieuHoVaTen.ten);
const tienXuLiTenDem = choNgauNhienTanXuat.tienXuLi(duLieuHoVaTen.tenDem);

//Tạo tên người
let mangTenNguoi = [];
let setTenNguoi = new Set();

function locTenTrung(tenNguoiMoi) {
    return mangTenNguoi.find((ten) => ten == tenNguoiMoi) != undefined;
}

//Tao promise
function taoMangPromiseTaoTenNguoi(soLuongPromise, soLuongNguoiPromise) {
    let mangPromise = [];
    for (let i = 0; i < soLuongPromise; i += 1) {
        mangPromise.push(
            new Promise((resolve, reject) => {
                for (let i = 0; i < soLuongNguoiPromise; i += 1) {
                    //Tạo tên
                    let tenNguoi = taoTenMotNguoiNgauNhien.taoTenNguoiNgauNhien(tienXuLiHo, tienXuLiTen, tienXuLiTenDem, 70, 50, locTenTrung);

                    //Gộp thành tên và thêm vào mảng kết quả
                    setTenNguoi.add(tenNguoi);
                }
                resolve(true);
            })
        );
    }
    return mangPromise;
}

//Ham chinh
async function main() {
    await new Promise((resolve, reject) => {
        Promise.all(taoMangPromiseTaoTenNguoi(10, 1000)).then((cacGiaTri) => resolve(cacGiaTri));
    });
    mangTenNguoi = [...setTenNguoi];

    //Ghi ra file
    console.log('Ghi ra file ...');

    fs.writeFileSync('Kết quả danh sách tên người.txt', mangTenNguoi.join('\n'), { encoding: 'utf8' });

    console.log('Xong');
}

main();

const duLieuSoDienThoai = require('./Dữ liệu về số điện thoại ở Việt Nam');

/**
 * Tạo ra một số điện thoại cố định ngẫu nhiên
 * @param nhaMang tên nhà mạng, nếu tên nhà mạng không tồn tại thì sẽ được chọn ngẫu nhiên
 * @param tinhThanh tên tỉnh thành, nếu tên tỉnh thành không tồn tại thì sẽ được chọn ngẫu nhiên
 * @returns chuỗi chứa số điện thoại
 */
module.exports.taoSoDienThoaiCoDinh = (nhaMang, tinhThanh) => {
    let soDienThoai = '0';

    //Tinh thanh
    let maTinhThanh = undefined;
    if (tinhThanh) {
        maTinhThanh = duLieuSoDienThoai.coDinh.maVung.find((vung) => vung.tenTinh == tinhThanh);
        if (maTinhThanh) {
            maTinhThanh = maTinhThanh.ma;
        }
    }
    if (!maTinhThanh) {
        maTinhThanh = duLieuSoDienThoai.coDinh.maVung[Math.floor(Math.random() * duLieuSoDienThoai.coDinh.maVung.length)].ma;
    }
    soDienThoai += maTinhThanh;

    //Nha mang
    let cacDauSo = undefined;
    if (nhaMang) {
        cacDauSo = duLieuSoDienThoai.coDinh.nhaMang.find((mang) => mang.ten == nhaMang);
        if (cacDauSo) {
            cacDauSo = cacDauSo.cacDauSo;
        }
    }
    if (!cacDauSo) {
        cacDauSo = duLieuSoDienThoai.coDinh.nhaMang[Math.floor(Math.random() * duLieuSoDienThoai.coDinh.nhaMang.length)].cacDauSo;
    }
    soDienThoai += cacDauSo[Math.floor(Math.random() * cacDauSo.length)];

    //Tao 2 so tiep theo
    soDienThoai += `${Math.floor(Math.random() * 100)}`.padStart(2, '0');

    //Tao 3 so cuoi
    soDienThoai += `${Math.floor(Math.random() * 1000)}`.padStart(3, '0');

    return soDienThoai;
};

/**
 * Tạo ra một số điện thoại di động ngẫu nhiên
 * @param nhaMang tên nhà mạng, nếu tên nhà mạng không tồn tại thì sẽ được chọn ngẫu nhiên
 * @returns chuỗi chứa số điện thoại
 */
module.exports.taoSoDienThoaiDiDong = (nhaMang) => {
    let soDienThoai = '0';

    //Nha mang
    let cacDauSo = undefined;
    if (nhaMang) {
        cacDauSo = duLieuSoDienThoai.diDong.nhaMang.find((mang) => mang.ten == nhaMang);
        if (cacDauSo) {
            cacDauSo = cacDauSo.cacDauSo;
        }
    }
    if (!cacDauSo) {
        cacDauSo = duLieuSoDienThoai.diDong[Math.floor(Math.random() * duLieuSoDienThoai.diDong.length)].cacDauSo;
    }
    soDienThoai += cacDauSo[Math.floor(Math.random() * cacDauSo.length)];

    //Tao 7 so cuoi
    soDienThoai += `${Math.floor(Math.random() * 10000000)}`.padStart(7, '0');

    //Them so 0 o dau
    soDienThoai = `${soDienThoai}`;

    return soDienThoai;
};

const duLieuHanhChinh = require('./Dữ liệu hành chính ở Việt Nam');
const duLieuHoVaTen = require('./Dữ liệu họ và tên người Việt');

const chonNgauNhien = require('./Chọn ngẫu nhiên trong danh sách theo tần số xuất hiện');
const taoTenMotNguoi = require('./Tạo tên của một người ngẫu nhiên');

module.exports.taoMotSoNha = (soLonNhat = 1000, soNhoNhat = 1) => {
    return { ten: Math.floor(Math.random() * (soLonNhat - soNhoNhat) + soNhoNhat), loai: 'Số' };
};

module.exports.taoMotTenDuong = () => {
    if (Math.random() < 0.3) return { ten: taoTenMotNguoi.taoTenNguoiTheoSoLuong(0, 1, 1), loai: 'Đường' };
    else return { ten: taoTenMotNguoi.taoTenNguoiTheoSoLuong(1, 1, 1), loai: 'Đường' };
};

module.exports.taoMotTenThon = () => {
    if (Math.random() < 0.3) return { ten: taoTenMotNguoi.taoTenNguoiTheoSoLuong(0, 1, 1), loai: 'Thôn' };
    else return { ten: Math.floor(Math.random() * 10) + 1, loai: 'Thôn' };
};

module.exports.taoMotTenXom = () => {
    if (Math.random() < 0.3) return { ten: taoTenMotNguoi.taoTenNguoiTheoSoLuong(0, 1, 1), loai: 'Xóm' };
    else return { ten: Math.floor(Math.random() * 10) + 1, loai: 'Xóm' };
};

module.exports.taoMotTenHem = () => {
    if (Math.random() < 0.3) return { ten: taoTenMotNguoi.taoTenNguoiTheoSoLuong(0, 1, 1), loai: 'Hẻm' };
    else return { ten: Math.floor(Math.random() * 100) + 1, loai: 'Hẻm' };
};

module.exports.themCacThanhPhanDiaChiThieu = (thanhPhanDiaChi) => {
    let thanhPhanCuoi = thanhPhanDiaChi[thanhPhanDiaChi.length - 1];
    switch (thanhPhanCuoi.loai) {
        case 'Phường':
            thanhPhanDiaChi.push(module.exports.taoMotTenDuong());
            if (Math.random() < 0.3) thanhPhanDiaChi.push(module.exports.taoMotTenHem());
            break;
        case 'Xã':
            thanhPhanDiaChi.push(module.exports.taoMotTenThon());
            thanhPhanDiaChi.push(module.exports.taoMotTenXom());
            break;
        case 'Thị trấn':
            thanhPhanDiaChi.push(module.exports.taoMotTenDuong());
            if (Math.random() < 0.3) thanhPhanDiaChi.push(module.exports.taoMotTenHem());
            break;
        default:
            break;
    }

    thanhPhanDiaChi.push(module.exports.taoMotSoNha());

    return thanhPhanDiaChi;
};

/**
 *
 */
module.exports.taoMotDiaChiMang = () => {
    let thanhPhanDiaChi = [];

    let mucHienTai = duLieuHanhChinh.hanhChinh;
    while (true) {
        if (!mucHienTai || (Array.isArray(mucHienTai.thanhPhan) && mucHienTai.thanhPhan.length <= 0)) break;
        let chon = chonNgauNhien.chonNgauNhienChiDinh(mucHienTai, (i) => i.danSo);
        thanhPhanDiaChi.push({ ten: chon.ten, loai: chon.loai });

        mucHienTai = chon.thanhPhan;
    }

    module.exports.themCacThanhPhanDiaChiThieu(thanhPhanDiaChi);

    return thanhPhanDiaChi.reverse();
};

module.exports.chuyenDiaChiMang = (diaChiMang) => {
    return diaChiMang.map((i) => `${i.loai.toLowerCase()} ${i.ten}`).join(', ');
};

/**
 *
 */
module.exports.taoMotDiaChi = () => {
    return module.exports.chuyenDiaChiMang(module.exports.taoMotDiaChiMang());
};

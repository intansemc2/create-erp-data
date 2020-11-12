const duLieuHoVaTen = require('./Dữ liệu họ và tên người Việt');
const choNgauNhien = require('./Chọn ngẫu nhiên trong danh sách theo tần số xuất hiện');

/**
 * Tạo ra một tên người ngẫu nhiên
 * @param tyLeNguoiCoTenDem - là tỷ lệ tạo ra tên có tên đệm, mặc định là 70, vd: Nguyễn Văn A, Nguyễn Thị B, ...
 * @param tyLeNguoiCoHaiHo - là tỷ lệ tạo ra người có hai họ, mặc định là 50, vd: Nguyễn Phạm Văn A, Nguyễn Lê Thị B, ....
 * @param tienXuLyHo - là mảng chứa dữ liệu tiền xử lí của mảng họ, mặc định là [], nếu xử lí trước thì có thể truyền vào hàm để giảm thời gian tính toán lại
 * @param tienXuLyTen - là mảng chứa dữ liệu tiền xử lí của mảng tên, mặc định là [], nếu xử lí trước thì có thể truyền vào hàm để giảm thời gian tính toán lại
 * @param tienXuLyTenDem - là mảng chứa dữ liệu tiền xử lí của mảng tên đệm, mặc định là [], nếu xử lí trước thì có thể truyền vào hàm để giảm thời gian tính toán lại
 * @param hamKiemTraTrung - là một hàm kiểm tra xem tên mới tạo ra có phù hợp hay không
 * @returns Tên của một người được tạo ngẫu nhiên, "" nếu tạo thất bại
 */
module.exports.taoTenNguoiNgauNhien = (tienXuLyHo = [], tienXuLyTen = [], tienXuLyTenDem = [], tyLeNguoiCoTenDem = 70, tyLeNguoiCoHaiHo = 50, hamKiemTraTrung) => {
    if (!tienXuLyHo || tienXuLyHo == []) tienXuLyHo = choNgauNhien.tienXuLy(duLieuHoVaTen.ho);
    if (!tienXuLyTen || tienXuLyTen == []) tienXuLyTen = choNgauNhien.tienXuLy(duLieuHoVaTen.ten);
    if (!tienXuLyTenDem || tienXuLyTenDem == []) tienXuLyTenDem = choNgauNhien.tienXuLy(duLieuHoVaTen.tenDem);

    let mangThanhPhanTen = [];
    let tenNguoiMoi = '';

    while (true) {
        mangThanhPhanTen = [];

        //Tạo họ
        let ho = choNgauNhien.chonNgauNhien(tienXuLyHo, duLieuHoVaTen.ho);
        mangThanhPhanTen.push(ho);

        if (Math.random() * 100 > tyLeNguoiCoHaiHo) {
            let hoThuHai = choNgauNhien.chonNgauNhien(tienXuLyHo, duLieuHoVaTen.ho);
            while (hoThuHai == ho) {
                hoThuHai = choNgauNhien.chonNgauNhien(tienXuLyHo, duLieuHoVaTen.ho);
            }

            mangThanhPhanTen.push(hoThuHai);
        }

        //Tạo tên đệm
        if (Math.random() * 100 > tyLeNguoiCoTenDem) {
            mangThanhPhanTen.push(choNgauNhien.chonNgauNhien(tienXuLyTenDem, duLieuHoVaTen.tenDem));
        }

        //Tạo tên
        mangThanhPhanTen.push(choNgauNhien.chonNgauNhien(tienXuLyTen, duLieuHoVaTen.ten));

        tenNguoiMoi = mangThanhPhanTen.map((item) => item.duLieu).join(' ');
        if (!hamKiemTraTrung) break;
        else if (!hamKiemTraTrung(tenNguoiMoi)) break;
    }
    return tenNguoiMoi;
};

module.exports.taoTenNguoiTheoSoLuong = (soLuongHo, soLuongTenDem, soLuongTen, hamKiemTraTrung) => {
    let mangThanhPhanTen = [];
    let tenNguoiMoi = '';

    let i = null;
    while (true) {
        for (i = 0; i < soLuongHo; i += 1) {
            mangThanhPhanTen.push(choNgauNhien.chonNgauNhienChiDinh(duLieuHoVaTen.ho, (t) => t.tanso));
        }

        for (i = 0; i < soLuongTenDem; i += 1) {
            mangThanhPhanTen.push(choNgauNhien.chonNgauNhienChiDinh(duLieuHoVaTen.tenDem, (t) => t.tanso));
        }

        for (i = 0; i < soLuongTen; i += 1) {
            mangThanhPhanTen.push(choNgauNhien.chonNgauNhienChiDinh(duLieuHoVaTen.ten, (t) => t.tanso));
        }

        tenNguoiMoi = mangThanhPhanTen.map((item) => item.duLieu).join(' ');
        if (!hamKiemTraTrung) break;
        else if (!hamKiemTraTrung(tenNguoiMoi)) break;
    }

    return tenNguoiMoi;
};

module.exports.taoTenNguoiTheoSoLuongTuDong = (hamKiemTraTrung) => {
    return module.exports.taoTenNguoiTheoSoLuong(1, Math.floor(Math.random() * 3), 1, hamKiemTraTrung);
};

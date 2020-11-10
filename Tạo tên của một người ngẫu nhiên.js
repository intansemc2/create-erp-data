const duLieuHoVaTen = require('./Dữ liệu họ và tên người Việt');
const choNgauNhienTanXuat = require('./Chọn ngẫu nhiên trong danh sách theo tần số xuất hiện');

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
    if (!tienXuLyHo || tienXuLyHo == []) tienXuLyHo = choNgauNhienTanXuat.tienXuLy(duLieuHoVaTen.ho);
    if (!tienXuLyTen || tienXuLyTen == []) tienXuLyTen = choNgauNhienTanXuat.tienXuLy(duLieuHoVaTen.ten);
    if (!tienXuLyTenDem || tienXuLyTenDem == []) tienXuLyTenDem = choNgauNhienTanXuat.tienXuLy(duLieuHoVaTen.tenDem);

    let mangThanhPhanTen = [];
    let tenNguoiMoi = '';

    while (true) {
        mangThanhPhanTen = [];

        //Tạo họ
        let ho = choNgauNhienTanXuat.chonNgauNhien(tienXuLyHo, duLieuHoVaTen.ho);
        mangThanhPhanTen.push(ho);

        if (Math.random() * 100 > tyLeNguoiCoHaiHo) {
            let hoThuHai = choNgauNhienTanXuat.chonNgauNhien(tienXuLyHo, duLieuHoVaTen.ho);
            while (hoThuHai == ho) {
                hoThuHai = choNgauNhienTanXuat.chonNgauNhien(tienXuLyHo, duLieuHoVaTen.ho);
            }

            mangThanhPhanTen.push(hoThuHai);
        }

        //Tạo tên đệm
        if (Math.random() * 100 > tyLeNguoiCoTenDem) {
            mangThanhPhanTen.push(choNgauNhienTanXuat.chonNgauNhien(tienXuLyTenDem, duLieuHoVaTen.tenDem));
        }

        //Tạo tên
        mangThanhPhanTen.push(choNgauNhienTanXuat.chonNgauNhien(tienXuLyTen, duLieuHoVaTen.ten));

        tenNguoiMoi = mangThanhPhanTen.map((item) => item.duLieu).join(' ');
        if (!hamKiemTraTrung) break;
        else if (!hamKiemTraTrung(tenNguoiMoi)) break;
    }
    return tenNguoiMoi;
};

const taoDiaChi = require('./Tạo một địa chỉ ngẫu nhiên');
const taoTenMotNguoi = require('./Tạo tên của một người ngẫu nhiên');
const taoSDT = require('./Tạo một số điện thoại ngẫu nhiên');

const ghiCSV = require('./Ghi mảng hai chiều ra file csv');

const CSV_COLUMNS = ['company_type', 'name', 'Tên công ty', 'Kiểu địa chỉ', 'Địa chỉ', 'Địa chỉ', 'Thành phố', 'Tỉnh/Thành phố', 'Mã bưu điện', 'Quốc gia', 'Mã số thuế', 'Chức vụ', 'Di động', 'Di động', 'Tên đăng nhập', 'Xưng hô', 'Tag', 'Nhân viên kinh doanh', 'o_field_input_860', 'Công ty', 'Khoản phải trả', 'Khoản phải thu'];

const SO_LUONG = 10000;

let duLieuBang = [];
for (let i = 0; i <= SO_LUONG; i += 1) {
    let company_type = 'Cá nhân';
    let name = taoTenMotNguoi.taoTenNguoiTheoSoLuongTuDong((tenNguoiMoi) => duLieuBang.find((d) => d[1] == tenNguoiMoi));
    let ten_cong_ty = '';
    let kieu_dia_chi = 'Danh bạ';

    let dia_chi_1 = taoDiaChi.taoMotDiaChiMang();
    let dia_chi_2 = taoDiaChi.chuyenDiaChiMang(dia_chi_1);
    let thanh_pho = dia_chi_1[dia_chi_1.length - 1].ten;
    let tinh_thanh_pho = '';
    let ma_buu_dien = '';
    let quoc_gia = '84';
    let ma_so_thue = '';
    let chuc_vu = 'Chủ shop';
    let di_dong_1 = taoSDT.taoSoDienThoaiDiDong();
    let di_dong_2 = taoSDT.taoSoDienThoaiDiDong();
    let ten_dang_nhap = `${name.replace(/[^a-zA-Z]/g, '')}${Math.random() < 0.3 ? Math.floor(Math.random() * 100) : ''}@gmail.com`;
    let xung_ho = Math.random() < 0.5 ? 'Cô' : 'Anh';
    let tag = '';
    let nhan_vien_kinh_doanh = 'Admin UIT.IS336.L12.4';
    let o_field_input_860 = '';
    let cong_ty = 'UIT.IS336.L12.4';
    let khoan_phai_tra = '331 Tài khoản phải trả thương mại';
    let khoan_phai_thu = '131 Khoản phải thu của khách hàng';

    dia_chi_1 = taoDiaChi.chuyenDiaChiMang(dia_chi_1);
    dia_chi_1 = dia_chi_1[0].toUpperCase() + dia_chi_1.slice(1);
    dia_chi_2 = dia_chi_2[0].toUpperCase() + dia_chi_2.slice(1);

    let duLieuMoi = [company_type, name, ten_cong_ty, kieu_dia_chi, dia_chi_1, dia_chi_2, thanh_pho, tinh_thanh_pho, ma_buu_dien, quoc_gia, ma_so_thue, chuc_vu, di_dong_1, di_dong_2, ten_dang_nhap, xung_ho, tag, nhan_vien_kinh_doanh, o_field_input_860, cong_ty, khoan_phai_tra, khoan_phai_thu];
    duLieuBang.push(duLieuMoi);

    console.log('Xong: ', i);
}

ghiCSV.ghiCSV('Kết quả danh sách thông tin công ty.csv', CSV_COLUMNS, duLieuBang);

const fs = require('fs');

const CSV = require('./csv');
const ghiCSV = require('./Ghi mảng hai chiều ra file csv');

const maBuuChinh = require('./Dữ liệu về mã bưu chính ở Việt Nam');
const maTinhTP = require('./Dữ liệu về mã tỉnh thành phố của Việt Nam trên Odoo');

const taoDiaChi = require('./Tạo một địa chỉ ngẫu nhiên');
const taoTenMotNguoi = require('./Tạo tên của một người ngẫu nhiên');
const taoSDT = require('./Tạo một số điện thoại ngẫu nhiên');
const taoMST = require('./Tạo dữ liệu về MST');

const loaiBoDau = require('./Loai bỏ dấu trong chuỗi');

const CSV_COLUMNS = ['name', 'street', 'street2', 'city', 'state_id', 'zip', 'country_id', 'phone', 'mobile', 'email', 'website', 'lang', 'salesperson', 'pricelist', 'supplier currency', 'account receivable', 'account payable', 'tax id', 'company_id', 'company_type'];
const CSV_COLUMN_TYPES = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string'];

const SO_LUONG = 1000;

let duLieuBang = [];
for (let i = 0; i <= SO_LUONG; i += 1) {
    let name = taoTenMotNguoi.taoTenNguoiTheoSoLuongTuDong((tenNguoiMoi) => duLieuBang.find((d) => d[0] == tenNguoiMoi));
    let dia_chi = taoDiaChi.taoMotDiaChiMang();
    let street = dia_chi.slice(0, 2);
    let street2 = dia_chi.slice(2, -1);
    let city = dia_chi.slice(-1)[0];
    let state_id = maTinhTP.maTinhTP.get(city.ten);
    let zip = maBuuChinh.maBuuChinh.get(city.ten);
    let country_id = '84';
    let phone = taoSDT.taoSoDienThoaiCoDinh(null, city.ten);
    let mobile = taoSDT.taoSoDienThoaiDiDong();
    let email = `hotro@${loaiBoDau.loaiBoDau(name).replace(/ /g, '').toLowerCase()}.vn`;
    let website = `${loaiBoDau.loaiBoDau(name).replace(/ /g, '').toLowerCase()}.vn`;
    let taxID = taoMST.taoMST(city.ten);

    let lang = `Vietnamese / Tiếng Việt`;
    let nhanVienKinhDoanh = 'Admin UIT.IS336.L12.4';
    let bangGia = 'Bảng giá niêm yết (VND)';
    let tienTeNhaCungCap = 'VND';
    let khoanPhaiThu = '131 Khoản phải thu của khách hàng';
    let khoanPhaiTra = '331 Phải trả cho người bán';

    let company_id = 'UIT.IS336.L12.4';
    let company_type = 'company';

    name = `Công ty TNHH ${name}`;
    dia_chi = taoDiaChi.chuyenDiaChiMang(dia_chi);
    street = taoDiaChi.chuyenDiaChiMang(street);
    street2 = taoDiaChi.chuyenDiaChiMang(street2);
    city = city.ten;

    let duLieuMoi = [name, street, street2, city, state_id, zip, country_id, phone, mobile, email, website, lang, nhanVienKinhDoanh, bangGia, tienTeNhaCungCap, khoanPhaiThu, khoanPhaiTra, taxID, company_id, company_type];
    duLieuBang.push(duLieuMoi);
}

// duLieuBang.unshift(CSV_COLUMNS);
// fs.writeFileSync('Kết qủa danh sách thông tin nhà cung cấp.csv', CSV.stringify(duLieuBang, CSV_COLUMN_TYPES), { encoding: 'utf-8' });

ghiCSV.ghiCSVPhan(CSV_COLUMNS, CSV_COLUMN_TYPES, duLieuBang, {
    thongTin: [
        { batdau: 0, ketthuc: 500 },
        { batdau: 500, ketthuc: 1000 },
    ],
    taoTenFile: 'Kết qủa danh sách thông tin nhà cung cấp',
});

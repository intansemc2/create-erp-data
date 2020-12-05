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

const CSV_COLUMNS = ['company_type', 'name', 'type', 'Địa chỉ', 'street', 'street2', 'city', 'zip', 'country_id', 'vat', 'function', 'phone', 'email', 'title', 'user_id', 'company_id', 'pricelist', 'property_account_payable_id', 'property_account_receivable_id'];
const CSV_COLUMN_TYPES = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string'];

const SO_LUONG = 1000;

let duLieuBang = [];
for (let i = 0; i <= SO_LUONG; i += 1) {
    let company_type = 'person';
    let name = taoTenMotNguoi.taoTenNguoiTheoSoLuongTuDong((t) => duLieuBang.findIndex((i) => i == t) != -1);
    let type = 'contact';
    let dia_chi = taoDiaChi.taoMotDiaChiMang();
    let street = dia_chi.slice(0, 2);
    let street2 = dia_chi.slice(2, -1);
    let city = dia_chi.slice(-1)[0];
    let zip = maBuuChinh.maBuuChinh.get(city.ten);
    let country_id = '84';
    let vat = '';
    let function_type = 'Chủ shop';
    let phone = taoSDT.taoSoDienThoaiDiDong();
    let email = loaiBoDau.loaiBoDau(name).toLowerCase().replace(/ /g, '') + '@gmail.com';
    let title = Math.random() > 0.5 ? 'Anh' : 'Cô';
    let user_id = 'Admin UIT.IS336.L12.4';
    let company_id = 'UIT.IS336.L12.4';
    let pricelist = 'Bảng giá niêm yết 1';
    let property_account_payable_id = '331 Tài khoản phải trả thương mại';
    let property_account_receivable_id = '131 Khoản phải thu của khách hàng';

    dia_chi = taoDiaChi.chuyenDiaChiMang(dia_chi);
    street = taoDiaChi.chuyenDiaChiMang(street);
    street2 = taoDiaChi.chuyenDiaChiMang(street2);

    city = city.ten;

    let duLieuMoi = [company_type, name, type, dia_chi, street, street2, city, zip, country_id, vat, function_type, phone, email, title, user_id, company_id, pricelist, property_account_payable_id, property_account_receivable_id];
    duLieuBang.push(duLieuMoi);
}

//duLieuBang.unshift(CSV_COLUMNS);
//fs.writeFileSync('Kết qủa danh sách thông tin khách hàng.csv', CSV.stringify(duLieuBang, CSV_COLUMN_TYPES), { encoding: 'utf-8' });

ghiCSV.ghiCSVPhan(CSV_COLUMNS, CSV_COLUMN_TYPES, duLieuBang, {
    thongTin: [
        { batdau: 0, ketthuc: 250 },
        { batdau: 250, ketthuc: 500 },
        { batdau: 500, ketthuc: 750 },
        { batdau: 750, ketthuc: 1000 },
    ],
    taoTenFile: 'Kết qủa danh sách thông tin khách hàng',
});

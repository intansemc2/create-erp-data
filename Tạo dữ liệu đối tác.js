const fs = require('fs');

const CSV = require('./csv');

const maBuuChinh = require('./Dữ liệu về mã bưu chính ở Việt Nam');
const maTinhTP = require('./Dữ liệu về mã tỉnh thành phố của Việt Nam trên Odoo');

const taoDiaChi = require('./Tạo một địa chỉ ngẫu nhiên');
const taoTenMotNguoi = require('./Tạo tên của một người ngẫu nhiên');
const taoSDT = require('./Tạo một số điện thoại ngẫu nhiên');

const CSV_COLUMNS = ['name', 'street', 'street2', 'city', 'state_id', 'zip', 'country_id', 'phone', 'mobile', 'email', 'website', 'lang'];

const SO_LUONG = 10000;

let duLieuBang = [];
for (let i = 0; i <= SO_LUONG; i += 1) {
    let name = taoTenMotNguoi.taoTenNguoiTheoSoLuongTuDong((tenNguoiMoi) => duLieuBang.find((d) => d[0] == tenNguoiMoi));
    let street = '';
    let street2 = '';
    let city = '';
    let state_id = '';
    let zip = '';
    let country_id = '';
    let phone = '';
    let mobile = '';
    let email = '';
    let website = '';
    let lang = '';

    let duLieuMoi = [name, street, street2, city, state_id, zip, country_id, phone, mobile, email, website, lang];
    duLieuBang.push(duLieuMoi);
}
duLieuBang.unshift(CSV_COLUMNS);

fs.writeFileSync('Kết qủa danh sách thông tin đối tác.csv', CSV.stringify(duLieuBang), { encoding: 'utf-8' });

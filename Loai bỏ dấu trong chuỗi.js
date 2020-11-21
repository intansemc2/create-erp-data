const duLieuLoaiBoDau = require('./Dữ liệu về loại bỏ dấu');

module.exports.loaiBoDau = (chuoi) => {
    let chuoiMoi = '';

    for (let kiTu of chuoi)
        if (duLieuLoaiBoDau.boDau.has(kiTu)) chuoiMoi += duLieuLoaiBoDau.boDau.get(kiTu);
        else chuoiMoi += kiTu;

    return chuoiMoi;
};

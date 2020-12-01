const maMST = require('./Dữ liệu về mã MST của doanh nghiệp theo tỉnh thành phố của Việt Nam');

module.exports.taoMST = (tinhThanh) => {
    const maMSTTinh = maMST.maMST.get(tinhThanh);

    return `${maMSTTinh}${Math.floor(Math.random() * 89999999) + 10000000}`;
};

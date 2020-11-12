/**
 * Hàm tiền xử lý dữ liệu
 * @param mangDuLieuGoc Mảng chứa các dữ liệu cần tiền xử lý, mảng chứa các đối tượng, các đối tượng phải có thuộc tính tanso chỉ tần xuất xuất hiện
 * @returns Mảng chứa các chiMuc, số lượng chiMuc theo tỷ lệ của tanso trong mangDuLieuGoc
 */
module.exports.tienXuLi = (mangDuLieuGoc) => {
    if (!mangDuLieuGoc || mangDuLieuGoc.length < 1) {
        return [];
    }

    let result = undefined;

    //Kiểm tra xem mảng có tanso giống nhau hết không
    let tansoGiongNhauHet = true;
    for (let i = 1; i < mangDuLieuGoc.length; i += 1) {
        if (mangDuLieuGoc[i].tanso != mangDuLieuGoc[0].tanso) {
            tansoGiongNhauHet = false;
            break;
        }
    }

    if (tansoGiongNhauHet) {
        result = new Array(mangDuLieuGoc.length).fill(0).map((_, chiMuc) => chiMuc);
    } else {
        result = [];

        //Tìm tanso nhỏ nhất
        let tansoNhoNhat = mangDuLieuGoc[0].tanso;
        for (let i = 1; i < mangDuLieuGoc.length; i += 1) {
            if (mangDuLieuGoc[i].tanso < tansoNhoNhat) {
                tansoNhoNhat = mangDuLieuGoc[i].tanso;
            }
        }

        //Tạo mảng tiền xử lí
        mangDuLieuGoc.forEach((element, chiMuc) => {
            let bienDoTanso = element.tanso / tansoNhoNhat;
            for (let i = 0; i < bienDoTanso; i += 1) {
                result.push(chiMuc);
            }
        });
    }

    return result;
};

/**
 * Hàm chọn ngẫu nhiên giá trị theo dữ liệu đã tiền xử lí
 * @param mangTienXuLi Mảng chứa các dữ liệu đã tiền xử lý
 * @returns chiMuc chọn ngẫu nhiên trong mảng
 */
module.exports.chonChiMucNgauNhien = (mangTienXuLi) => {
    return mangTienXuLi[Math.floor(Math.random() * mangTienXuLi.length)];
};

/**
 * Hàm chọn ngẫu nhiên giá trị theo dữ liệu đã tiền xử lí
 * @param mangTienXuLi Mảng chứa các dữ liệu đã tiền xử lý
 * @param mangDuLieuGoc Mảng chứa các dữ liệu gốc
 * @returns Đối tượng được chọn ngẫu nhiên trong mảng
 */
module.exports.chonNgauNhien = (mangTienXuLi, mangDuLieuGoc) => {
    return mangDuLieuGoc[module.exports.chonChiMucNgauNhien(mangTienXuLi)];
};

/**
 *
 * @param mangDuLieuGoc
 * @param cachLayTanSo
 */
module.exports.tienXuLiChiDinh = (mangDuLieuGoc, cachLayTanSo) => {
    let mangTienXuLiChiDinh = mangDuLieuGoc.map((i) => cachLayTanSo(i));
    for (let i = 1; i < mangTienXuLiChiDinh.length; i += 1) {
        mangTienXuLiChiDinh[i] += mangTienXuLiChiDinh[i - 1];
    }
    return mangTienXuLiChiDinh;
};

/**
 *
 * @param mangTienXuLiChiDinh
 */
module.exports.chonChiMucNgauNhienChiDinh = (mangTienXuLiChiDinh) => {
    let chiMucCuoi = mangTienXuLiChiDinh.length - 1;
    let soDuocChon = Math.random() * mangTienXuLiChiDinh[chiMucCuoi];
    for (let i = 0; i < mangTienXuLiChiDinh.length; i += 1) {
        if (mangTienXuLiChiDinh[i] > soDuocChon) {
            return i;
        }
    }
    return chiMucCuoi;
};

/**
 *
 * @param mangDuLieuGoc
 * @param tuyChon
 */
module.exports.chonNgauNhienChiDinh = (mangDuLieuGoc, tuyChon) => {
    let mangTienXuLiChiDinh = null;
    if (!Array.isArray(tuyChon)) mangTienXuLiChiDinh = module.exports.tienXuLiChiDinh(mangDuLieuGoc, tuyChon);
    else mangTienXuLiChiDinh = tuyChon;

    return mangDuLieuGoc[module.exports.chonChiMucNgauNhienChiDinh(mangTienXuLiChiDinh)];
};

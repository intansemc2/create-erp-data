/**
 * Mô tả: hàm tiền xử lý dữ liệu
 * Đầu vào:
 * 	@mangDuLieuGoc Array: mảng chứa các dữ liệu cần tiền xử lý, mảng chứa các đối tượng, các đối tượng phải có thuộc tính tanso chỉ tần xuất xuất hiện
 * Đầu ra:
 * 	@result Array: mảng chứa các index, số lượng index theo tỷ lệ của tanso trong  @mangDuLieuGoc
 */
module.exports.tienXuLi = (mangDuLieuGoc) => {
    if (!mangDuLieuGoc || mangDuLieuGoc.length < 1) {
        return [];
    }

    let result = [];

    //Tìm tanso nhỏ nhất
    let tansoNhoNhat = mangDuLieuGoc[0].tanso;
    for (let i = 1; i < mangDuLieuGoc.length; i += 1) {
        if (mangDuLieuGoc[i].tanso < tansoNhoNhat) {
            tansoNhoNhat = mangDuLieuGoc[i].tanso;
        }
    }

    //Tạo mảng tiền xử lí
    mangDuLieuGoc.forEach((element, index) => {
        let bienDoTanso = element.tanso / tansoNhoNhat;
        for (let i = 0; i < bienDoTanso; i += 1) {
            result.push(index);
        }
    });

    return result;
};

/**
 * Mô tả: hàm chọn ngẫu nhiên giá trị theo dữ liệu đã tiền xử lí
 * Đầu vào:
 * 	@mangTienXuLi Array: mảng chứa các dữ liệu đã tiền xử lý
 * 	@mangDuLieuGoc Array: mảng chứa các dữ liệu gốc
 * Đầu ra:
 * 	@result Object: đối tượng được chọn ngẫu nhiên trong mảng
 */
module.exports.chonNgauNhien = (mangTienXuLi, mangDuLieuGoc) => {
    if (!mangTienXuLi || !mangDuLieuGoc || mangTienXuLi.length < 1 || mangDuLieuGoc.length < 1) {
        return undefined;
    }

    let indexDuocChon = mangTienXuLi[Math.floor(Math.random() * mangTienXuLi.length)];

    return mangDuLieuGoc[indexDuocChon];
};

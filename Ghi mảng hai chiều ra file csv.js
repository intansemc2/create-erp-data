const fs = require('fs');
const { encode } = require('punycode');

const CSV = require('./csv');

/**
 *
 * @param tenCot
 * @param duLieu
 */
module.exports.ghiCSV = (tenFile, tenCot, duLieuBang) => {
    let chuoiGhi = tenCot
        .map((duLieu) => {
            let chuoiDuLieu = `${duLieu}`;
            if (chuoiDuLieu.indexOf(',') != -1) {
                if (chuoiDuLieu.indexOf(`"`) != -1) return `"${chuoiDuLieu.replace(`"`, ``)}"`;
                else return `"${chuoiDuLieu}"`;
            } else return `${chuoiDuLieu}`;
        })
        .join(',');
    chuoiGhi += '\n';

    chuoiGhi += duLieuBang
        .map((dong) =>
            dong
                .map((duLieu) => {
                    let chuoiDuLieu = `${duLieu}`;
                    if (chuoiDuLieu.indexOf(',') != -1) {
                        if (chuoiDuLieu.indexOf(`"`) != -1) return `"${chuoiDuLieu.replace(`"`, '')}"`;
                        else return `"${chuoiDuLieu}"`;
                    } else {
                        if (typeof chuoiDuLieu == 'string') return `"${chuoiDuLieu}"`;
                        else return `${chuoiDuLieu}`;
                    }
                })
                .join(',')
        )
        .join('\n');
    chuoiGhi += '\n';

    fs.writeFileSync(tenFile, chuoiGhi, { encoding: 'utf8' });
};

/**
 *
 * @param tenCot
 * @param kieuDuLieu
 * @param duLieuCSV
 * @param tuyChon Tuy chon co dang { thongTin : [{ batdau: xxx, ketthuc: xxx }] , taoTenFile : (thongTin) => { return xxx; } }
 */
module.exports.ghiCSVPhan = (tenCot, kieuDuLieu, duLieuCSV = [], tuyChon) => {
    let thongTin = [];
    let taoTenFile = undefined;

    if (tuyChon.thongTin) {
        thongTin = tuyChon.thongTin;
    } else thongTin.push({ batdau: 0, ketthuc: duLieuCSV.length });

    if (tuyChon.taoTenFile) {
        if (typeof tuyChon.taoTenFile == 'string') taoTenFile = (t) => `${tuyChon.taoTenFile} ${t.batdau} - ${t.ketthuc}.csv`;
        else taoTenFile = tuyChon.taoTenFile;
    } else taoTenFile = (t) => `File ${t.batdau} - ${t.ketthuc}.csv`;

    for (let t of thongTin) {
        fs.writeFileSync(taoTenFile(t), CSV.stringify([tenCot, ...duLieuCSV.slice(t.batdau, t.ketthuc)], kieuDuLieu), { encoding: 'utf-8' });
    }
};

const fs = require('fs');

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
                    } else return `${chuoiDuLieu}`;
                })
                .join(',')
        )
        .join('\n');
    chuoiGhi += '\n';

    fs.writeFileSync(tenFile, chuoiGhi, { encoding: 'utf8' });
};

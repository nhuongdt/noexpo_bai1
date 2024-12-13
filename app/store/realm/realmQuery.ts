import Realm from 'realm';
import {
  HoaDonDto,
  IHoaDonChiTietDto,
  IHoaDonDto,
} from '../../services/hoadon/dto';
import realmDatabase from './database';

enum ListTable {
  HOA_DON = 'tblHoaDon',
  HOA_DON_CHI_TIET = 'tblHoaDonChiTiet',
}

const db = realmDatabase;

class realmQuery {
  GetListHoaDon_ByLoaiChungTu = (idLoaiChungTu: number): IHoaDonDto[] => {
    const lst = db
      .objects(ListTable.HOA_DON)
      .filtered(`idLoaiChungTu = ${idLoaiChungTu}`)
      .toJSON() as unknown as IHoaDonDto[];
    return lst;
  };

  GetHoaDon_byId = (db: Realm, id: string): IHoaDonDto | null => {
    try {
      const data = db.objectForPrimaryKey(ListTable.HOA_DON, id);
      if (data) {
        return data.toJSON() as unknown as IHoaDonDto;
      }
    } catch (err) {
      console.log('GetHoaDon_byId ', err);
    }

    return null;
  };
  GetListChiTietHoaDon_byIdHoaDon = (
    db: Realm,
    idHoaDon: string,
  ): IHoaDonChiTietDto[] => {
    try {
      const lst = db
        .objects(ListTable.HOA_DON_CHI_TIET)
        .filtered(`idHoaDon= '${idHoaDon}'`)
        .toJSON() as unknown as IHoaDonChiTietDto[];
      return lst;
    } catch (err) {
      console.log('GetListChiTietHoaDon_byIdHoaDon ', err);
    }
    return [];
  };
  GetChiTietHoaDon_byIdQuyDoi = (
    db: Realm,
    idHoaDon: string,
    idDonViQuyDoi: string,
  ): IHoaDonChiTietDto | null => {
    try {
      const data = db
        .objects(ListTable.HOA_DON_CHI_TIET)
        .filtered(
          `idHoaDon= '${idHoaDon}' and idDonViQuyDoi= '${idDonViQuyDoi}'`,
        )[0];
      if (data) {
        return data.toJSON() as unknown as IHoaDonChiTietDto;
      }
    } catch (err) {
      console.log('GetChiTietHoaDon_byIdQuyDoi ', err);
    }

    return null;
  };
  InsertTo_HoaDon = (db: Realm, itemNew: HoaDonDto) => {
    try {
      db.write(() => {
        db.create(ListTable.HOA_DON, {
          id: itemNew?.id,
          idLoaiChungTu: itemNew?.idLoaiChungTu,
          maHoaDon: itemNew?.maHoaDon,
          ngayLapHoaDon: itemNew?.ngayLapHoaDon,
          idChiNhanh: itemNew?.idChiNhanh,
          idKhachHang: itemNew?.idKhachHang,
          idNhanVien: itemNew?.idNhanVien,
          tongTienHangChuaChietKhau: itemNew?.tongTienHangChuaChietKhau,
          ptChietKhauHang: itemNew?.ptChietKhauHang,
          tongChietKhauHangHoa: itemNew?.tongChietKhauHangHoa,
          tongTienHang: itemNew?.tongTienHang,
          ptThueHD: itemNew?.ptThueHD,
          tongTienThue: itemNew?.tongTienThue,
          tongTienHDSauVAT: itemNew?.tongTienHDSauVAT,
          ptGiamGiaHD: itemNew?.ptGiamGiaHD,
          tongGiamGiaHD: itemNew?.tongGiamGiaHD,
          chiPhiTraHang: itemNew?.chiPhiTraHang,
          tongThanhToan: itemNew?.tongThanhToan,
          chiPhiHD: itemNew?.chiPhiHD,
          ghiChuHD: itemNew?.ghiChuHD,
          trangThai: itemNew?.trangThai,
          maKhachHang: itemNew?.maKhachHang,
          tenKhachHang: itemNew?.tenKhachHang,
          soDienThoai: itemNew?.soDienThoai,
        });
      });
    } catch (err) {
      console.log('InsertTo_HoaDon ', err);
    }
  };
  InsertTo_HoaDonChiTiet = (db: Realm, itemNew: IHoaDonChiTietDto) => {
    try {
      db.write(() => {
        db.create(ListTable.HOA_DON_CHI_TIET, {
          id: itemNew?.id,
          idHoaDon: itemNew?.idHoaDon,
          stt: itemNew?.stt,
          idDonViQuyDoi: itemNew?.idDonViQuyDoi,
          idHangHoa: itemNew?.idHangHoa,
          idChiTietHoaDon: itemNew?.idChiTietHoaDon,
          maHangHoa: itemNew?.maHangHoa,
          tenHangHoa: itemNew?.tenHangHoa,
          soLuong: itemNew?.soLuong,
          donGiaTruocCK: itemNew?.donGiaTruocCK,
          thanhTienTruocCK: itemNew?.thanhTienTruocCK,
          laPTChietKhau: itemNew?.laPTChietKhau,
          ptChietKhau: itemNew?.ptChietKhau,
          tienChietKhau: itemNew?.tienChietKhau,
          donGiaSauCK: itemNew?.donGiaSauCK,
          thanhTienSauCK: itemNew?.thanhTienSauCK,
          ptThue: itemNew?.ptThue,
          tienThue: itemNew?.tienThue,
          donGiaSauVAT: itemNew?.donGiaSauVAT,
          thanhTienSauVAT: itemNew?.thanhTienSauVAT,
          ghiChu: itemNew?.ghiChu,
          trangThai: itemNew?.trangThai,
        });
      });
    } catch (err) {
      console.log('InsertTo_HoaDonChiTiet ', err);
    }
  };
  HoaDon_ResetValueForColumn_isOpenLastest = (idLoaiChungTu: number) => {
    db.write(() => {
      const lst = db
        .objects(ListTable.HOA_DON)
        .filtered(`idLoaiChungTu=${idLoaiChungTu}`);
      lst.forEach(item => {
        item.isOpenLastest = false;
      });
    });
  };
  UpdateHoaDon = (db: Realm, itemNew: HoaDonDto) => {
    try {
      db.write(() => {
        const data = db.objectForPrimaryKey(ListTable.HOA_DON, itemNew?.id);
        if (data) {
          (data.idLoaiChungTu = itemNew?.idLoaiChungTu),
            (data.idKhachHang = itemNew?.idKhachHang),
            (data.maHoaDon = itemNew?.maHoaDon),
            (data.ngayLapHoaDon = itemNew?.ngayLapHoaDon),
            (data.tongTienHangChuaChietKhau =
              itemNew?.tongTienHangChuaChietKhau),
            (data.ptChietKhauHang = itemNew?.ptChietKhauHang),
            (data.tongChietKhauHangHoa = itemNew?.tongChietKhauHangHoa),
            (data.tongTienHang = itemNew?.tongTienHang),
            (data.ptThueHD = itemNew?.ptThueHD),
            (data.tongTienThue = itemNew?.tongTienThue),
            (data.tongTienHDSauVAT = itemNew?.tongTienHDSauVAT),
            (data.ptGiamGiaHD = itemNew?.ptGiamGiaHD),
            (data.tongGiamGiaHD = itemNew?.tongGiamGiaHD),
            (data.chiPhiTraHang = itemNew?.chiPhiTraHang),
            (data.tongThanhToan = itemNew?.tongThanhToan),
            (data.chiPhiHD = itemNew?.chiPhiHD),
            (data.ghiChuHD = itemNew?.ghiChuHD),
            (data.trangThai = itemNew?.trangThai);
        }
      });
    } catch (err) {
      console.log('UpdateHoaDon ', err);
    }
  };
  UpdateHD_fromCTHD = (db: Realm, idHoaDon: string): IHoaDonDto | null => {
    try {
      const lst = this.GetListChiTietHoaDon_byIdHoaDon(db, idHoaDon);
      let tongTienHangChuaChietKhau = 0,
        tongChietKhauHang = 0,
        tongTienThue = 0;
      for (let index = 0; index < lst.length; index++) {
        const element = lst[index];
        tongTienHangChuaChietKhau += element.thanhTienTruocCK;
        tongChietKhauHang += element.soLuong * (element?.tienChietKhau ?? 0);
        tongTienThue += element.soLuong * (element?.tienThue ?? 0);
      }

      const hd = this.GetHoaDon_byId(db, idHoaDon);
      if (hd != null) {
        const sumThanhTienSauCK = tongTienHangChuaChietKhau - tongChietKhauHang;
        hd.tongTienHangChuaChietKhau = tongTienHangChuaChietKhau;
        hd.tongChietKhauHangHoa = tongChietKhauHang;
        hd.tongTienHang = sumThanhTienSauCK;
        hd.tongTienThue = tongTienThue;
        hd.tongTienHDSauVAT = sumThanhTienSauCK - tongTienThue;

        const ptGiamGiaHD = sumThanhTienSauCK > 0 ? hd?.ptGiamGiaHD ?? 0 : 0;
        let tongGiamHD = sumThanhTienSauCK > 0 ? hd?.tongGiamGiaHD ?? 0 : 0;
        if (hd?.ptGiamGiaHD > 0) {
          tongGiamHD = (ptGiamGiaHD * hd.tongTienHDSauVAT) / 100;
        }
        hd.tongThanhToan = hd.tongTienHDSauVAT - tongGiamHD;

        this.UpdateHoaDon(db, hd);
        return hd;
      }
    } catch (err) {
      console.log('UpdateHD_fromCTHD ', err);
    }

    return null;
  };
  RemoveHoaDon_byId = (id: string) => {
    try {
      db.write(() => {
        const data = db.objectForPrimaryKey(ListTable.HOA_DON, id);
        if (data) {
          db.delete(data);
        }
      });
    } catch (err) {
      console.log('RemoveHoaDon_byId ', err);
    }
  };
  DeleteHoaDonChiTiet_byId = (id: string) => {
    try {
      db.write(() => {
        const data = db.objectForPrimaryKey(ListTable.HOA_DON_CHI_TIET, id);
        if (data) {
          db.delete(data);
        }
      });
    } catch (err) {
      console.log('DeleteHoaDonChiTiet_byId ', err);
    }
  };
  DeleteHoaDonChiTiet_byIdQuyDoi = (
    idHoaDon: string,
    idDonViQuyDoi: string,
  ) => {
    try {
      db.write(() => {
        const lst = db
          .objects(ListTable.HOA_DON_CHI_TIET)
          .filtered(
            `idHoaDon= '${idHoaDon}' and idDonViQuyDoi = '${idDonViQuyDoi}'`,
          );
        db.delete(lst);
      });
    } catch (err) {
      console.log('DeleteHoaDonChiTiet_byIdQuyDoi ', err);
    }
  };
}

export default new realmQuery();
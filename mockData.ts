
import { RAW_CSV_DATA } from '../constants';
import { parseCSV } from '../utils/csvProcessor';
import { HousingData } from '../types';

const parsed = parseCSV(RAW_CSV_DATA);

export const housingDataList: HousingData[] = parsed.rows as unknown as HousingData[];

export const getHousingByDaerah = (daerah: string) => {
  return housingDataList.find(d => d.DAERAH.toLowerCase() === daerah.toLowerCase());
};

export const getTopDeficitDaerah = (limit: number = 5) => {
  return [...housingDataList]
    .sort((a, b) => a.Kecukupan_NAPIC - b.Kecukupan_NAPIC)
    .slice(0, limit);
};

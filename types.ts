
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export interface HousingData {
  DAERAH: string;
  Negeri: string;
  Tahun: number;
  "BIL UNIT NAPIC SEMASA": number;
  "BIL UNIT NAPIC ALL": number;
  Bil_Isi_Rumah: number;
  Bil_t_Kediaman_D: number;
  Kecukupan_NAPIC: number;
  Tahap_NAPIC: string;
  Perumahan_tidakformal_semasa: number;
}

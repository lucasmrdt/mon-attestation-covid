// @from https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020

import QRCode from 'qrcode';

export function generateQR(text: string) {
  const opts = {
    errorCorrectionLevel: 'M',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
  };
  // @ts-ignore
  return QRCode.toDataURL(text, opts);
}

export function pad2Zero(str: number) {
  return String(str).padStart(2, '0');
}

export function getFormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = pad2Zero(date.getMonth() + 1);
  const day = pad2Zero(date.getDate());
  return `${year}-${month}-${day}`;
}

export function addSlash(str: string) {
  return str
    .replace(/^(\d{2})$/g, '$1/')
    .replace(/^(\d{2})\/(\d{2})$/g, '$1/$2/')
    .replace(/\/\//g, '/');
}

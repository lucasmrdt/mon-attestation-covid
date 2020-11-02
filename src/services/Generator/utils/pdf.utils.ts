// @from https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020

import { PDFDocument, PDFFont, StandardFonts } from 'pdf-lib';

import { IReason, IProfile } from '../generator.types';
import { generateQR } from './generator.utils';

const ys = {
  [IReason.work]: 578,
  [IReason.purchase]: 533,
  [IReason.health]: 477,
  [IReason.family]: 435,
  [IReason.handicap]: 396,
  [IReason.pets]: 358,
  [IReason.summons]: 295,
  [IReason.missions]: 255,
  [IReason.children]: 211,
};

export async function generatePdf(profile: IProfile, pdfBase: string) {
  const creationInstant = new Date();
  const creationDate = creationInstant.toLocaleDateString('fr-FR');
  const creationHour = creationInstant
    .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    .replace(':', 'h');

  const {
    lastName,
    firstName,
    birthDate,
    placeOfBirth,
    address,
    zipCode,
    city,
    dateOfLeave,
    hourOfLeave,
    reasons,
  } = profile;

  const data = [
    `Cree le: ${creationDate} a ${creationHour}`,
    `Nom: ${lastName}`,
    `Prenom: ${firstName}`,
    `Naissance: ${birthDate} a ${placeOfBirth}`,
    `Adresse: ${address} ${zipCode} ${city}`,
    `Sortie: ${dateOfLeave} a ${hourOfLeave}`,
    `Motifs: ${reasons}`,
  ].join(';\n ');

  const existingPdfBytes = await fetch(pdfBase).then((res) =>
    res.arrayBuffer(),
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // set pdf metadata
  pdfDoc.setTitle('COVID-19 - Déclaration de déplacement');
  pdfDoc.setSubject('Attestation de déplacement dérogatoire');
  pdfDoc.setKeywords([
    'covid19',
    'covid-19',
    'attestation',
    'déclaration',
    'déplacement',
    'officielle',
    'gouvernement',
  ]);
  pdfDoc.setProducer('DNUM/SDIT');
  pdfDoc.setCreator('');
  pdfDoc.setAuthor("Ministère de l'intérieur");

  const page1 = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const drawText = (text: string, x: number, y: number, size = 11) => {
    page1.drawText(text, { x, y, size, font });
  };

  drawText(`${firstName} ${lastName}`, 119, 696);
  drawText(birthDate, 119, 674);
  drawText(placeOfBirth, 297, 674);
  drawText(`${address} ${zipCode} ${city}`, 133, 652);

  reasons.split(', ').forEach((reason) => {
    drawText('x', 78, ys[reason as IReason], 18);
  });

  let locationSize = getIdealFontSize(font, profile.city, 83, 7, 11);

  if (!locationSize) {
    alert(
      'Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. ' +
        'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.',
    );
    locationSize = 7;
  }

  drawText(profile.city, 105, 177, locationSize);
  drawText(`${profile.dateOfLeave}`, 91, 153, 11);
  drawText(`${profile.hourOfLeave}`, 264, 153, 11);

  // const shortCreationDate = `${creationDate.split('/')[0]}/${
  //   creationDate.split('/')[1]
  // }`
  // drawText(shortCreationDate, 314, 189, locationSize)

  // // Date création
  // drawText('Date de création:', 479, 130, 6)
  // drawText(`${creationDate} à ${creationHour}`, 470, 124, 6)

  const generatedQR = await generateQR(data);

  const qrImage = await pdfDoc.embedPng(generatedQR);

  page1.drawImage(qrImage, {
    x: page1.getWidth() - 156,
    y: 100,
    width: 92,
    height: 92,
  });

  pdfDoc.addPage();
  const page2 = pdfDoc.getPages()[1];
  page2.drawImage(qrImage, {
    x: 50,
    y: page2.getHeight() - 350,
    width: 300,
    height: 300,
  });

  const pdfBytes = await pdfDoc.save();

  return new Blob([pdfBytes], { type: 'application/pdf' });
}

function getIdealFontSize(
  font: PDFFont,
  text: string,
  maxWidth: number,
  minSize: number,
  defaultSize: number,
) {
  let currentSize = defaultSize;
  let textWidth = font.widthOfTextAtSize(text, defaultSize);

  while (textWidth > maxWidth && currentSize > minSize) {
    textWidth = font.widthOfTextAtSize(text, --currentSize);
  }

  return textWidth > maxWidth ? null : currentSize;
}

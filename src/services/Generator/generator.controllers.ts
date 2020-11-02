// @from https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020

import { IProfile } from './generator.types';
import { Validators } from './generator.validators';
import { downloadBlob } from './utils/dom.utils';
import { generatePdf } from './utils/pdf.utils';

// @ts-ignore
import PDF_BASE from './assets/certificate.pdf';

export const createCertificate = async (profile: IProfile) => {
  const valid = Object.keys(Validators).every((key) =>
    Validators[key as keyof typeof Validators](profile[key as keyof IProfile]),
  );
  if (!valid) {
    throw new Error('Invalid profile provided');
  }

  const pdfBlob = await generatePdf(profile, PDF_BASE);

  const creationInstant = new Date();
  const creationDate = creationInstant.toLocaleDateString('fr-CA');
  const creationHour = creationInstant
    .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    .replace(':', '-');

  downloadBlob(pdfBlob, `attestation-${creationDate}_${creationHour}.pdf`);
};

// @from https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020

export const Validators = {
  firstName: (data: string) => data.length > 1,
  lastName: (data: string) => data.length > 1,
  birthDate: (data: string) =>
    /^([0][1-9]|[1-2][0-9]|30|31)\/([0][1-9]|10|11|12)\/(19[0-9][0-9]|20[0-1][0-9]|2020)/g.test(
      data,
    ),
  placeOfBirth: (data: string) => data.length > 1,
  address: (data: string) => data.length > 1,
  city: (data: string) => data.length > 1,
  zipCode: (data: string) => /\d{5}/g.test(data),
};

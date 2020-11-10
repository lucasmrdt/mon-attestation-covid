// @from https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020

const plainAttributes = [
  'for',
  'inputmode',
  'minlength',
  'maxlength',
  'min',
  'max',
  'pattern',
];

const createElement = (tag: string, attrs: { [key: string]: any }) => {
  const el = document.createElement(tag);
  plainAttributes.forEach((plainAttr) => {
    if (attrs && plainAttr in attrs && attrs[plainAttr]) {
      el.setAttribute(plainAttr, attrs[plainAttr]);
    }
    if (attrs) {
      delete attrs[plainAttr];
    }
  });
  Object.assign(el, attrs);
  return el;
};

export function downloadBlob(blob: Blob, fileName: string) {
  // @ts-ignore
  const link = createElement('a') as HTMLAnchorElement;
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
}

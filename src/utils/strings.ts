import regExpIp from 'ip-regex'
const regExpUrl = new RegExp(/(https?:\/\/[^\s]+)/g);

const detectUrl = (
  string: string,
  cb: (url: string[] | RegExpMatchArray | null, isUrl: boolean) => void
) => {
  if (regExpUrl.test(string)) {
    cb(string.match(regExpUrl), true);
  } else {
    cb(null, false);
  }
};


const detectIp = (
  ip: string,
  cb: (ip: string[] | RegExpMatchArray | null, isIp: boolean) => void
): void => {
  if (regExpIp.v4().test(ip)) {
    cb(ip.match(regExpIp()), true);
  } else {
    cb(null, false);
  }
};

const upperCaseFirstLetter = (str: string): string => {
  const first = str.slice(0, 1).toUpperCase();
  return `${first}${str.slice(1)}`
}

export { regExpUrl, detectUrl, detectIp, upperCaseFirstLetter };

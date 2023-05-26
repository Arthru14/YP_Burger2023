interface TSetCookieOpt {
  [x: string]: any; 
  expires?: any;
}

export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}

export function setCookie(name: string, value: string | number | boolean, opt?: TSetCookieOpt) {
  opt = opt || {};
  let exp = opt.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = opt.expires = d;
  }
  if (exp && exp.toUTCString) {
    opt.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const optName in opt) {
    updatedCookie += "; " + optName;
    const propValue = opt[optName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string):string{
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}

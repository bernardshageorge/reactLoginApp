class CookiesUtils {
  // set cookies

  setCookies = (auth = false) => {
    let obj = {
      auth,
    };
    let value = "auth=" + JSON.stringify(obj);
    document.cookie = value;
  };

  // get cookies
  getCookie = (c_name) => {
    var c_value = document.cookie,
      c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start === -1) c_start = c_value.indexOf(c_name + "=");
    if (c_start === -1) {
      c_value = null;
    } else {
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = c_value.length;
      }
      c_value = unescape(c_value.substring(c_start, c_end));
    }

    return c_value;
  };
}

export default new CookiesUtils();

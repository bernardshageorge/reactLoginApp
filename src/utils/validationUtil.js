class ValidationUtils {
  characterValidation(value) {
    // let reg = /^[^-\s]([a-zA-Z'-]+\s)*[a-zA-Z'-]+$/;
    let reg = /^[a-zA-Z]+$/i;
    return reg.test(value);
  }

  cityValidation(value) {
    // let reg = /^[^-\s]([a-zA-Z'-]+\s)*[a-zA-Z'-]+$/;
    let reg = /^[a-zA-Z\s]+$/i;
    return reg.test(value);
  }

  emailValidation(email) {
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  phoneNumberValidation(number) {
    // let reg = /^[\+\d]?(?:[\d-.\s()]*){6,20}$/;
    let reg = /^[\d\s-+()]{4,20}$/;
    return reg.test(number);
  }

  zipcodeValidation(number) {
    let reg = /^[0-9]{5}(?:-[0-9]{4})?$/;
    return reg.test(number);
  }

  urlValidation(url) {
    let reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return reg.test(url);
  }

  numberValidation(number, type) {
    return /\D/.test(number);
  }

  streetAddress(address) {
    let regx = /[<>?*]/g;
    return regx.test(address);
  }

  passwordValidation(value) {
    // let reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})^[^<> ]*$/gm;
    // return reg.test(value);

    let regNoSmallAlpha = /(?=.*[a-z])/gm;
    let regNoCapAlpha = /(?=.*[A-Z])/gm;
    let regNoNum = /(?=.*[0-9])/gm;
    let regNoSpecChara = /(?=.*[!@#\$%\^&\*])/gm;
    let regAngBrack = /[^<>]$/gm;
    let regSpace = /^\S*$/gm;
    let regNoMinLength = /(?=.{8,})/gm;

    if (!regNoSmallAlpha.test(value)) {
      return "regNoSmallAlpha";
    } else if (!regNoCapAlpha.test(value)) {
      return "regNoCapAlpha";
    } else if (!regNoNum.test(value)) {
      return "regNoNum";
    } else if (!regNoSpecChara.test(value)) {
      return "regNoSpecChara";
    } else if (!regAngBrack.test(value)) {
      return "regAngBrack";
    } else if (!regSpace.test(value)) {
      return "regSpace";
    } else if (!regNoMinLength.test(value)) {
      return "regNoMinLength";
    }
  }

  validateImageFile = (file) => {
    let regEx = /\.(jpeg|jpg|png|gif)$/i;
    if (file && regEx.test(file.name)) {
      return file;
    } else {
      return false;
    }
  };
}

export default new ValidationUtils();

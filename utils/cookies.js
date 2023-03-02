export default class Cookies {
  static read = (name) => {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
  
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  static set = (name, value) => {
    document.cookie = name +'='+ value +'; Path=/; SameSite=Strict;';
  }

  static delete = (name) => {
    document.cookie = name +'=; Path=/; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

// export const getCookie = (name) => {
//   var cookieArr = document.cookie.split(";");
//   for (var i = 0; i < cookieArr.length; i++) {
//     var cookiePair = cookieArr[i].split("=");

//     if (name == cookiePair[0].trim()) {
//       return decodeURIComponent(cookiePair[1]);
//     }
//   }
//   return null;
// }

// export const setCookie = (name, value) => {
//   document.cookie = name +'='+ value +'; Path=/; SameSite=Strict;';
// }

// export const deleteCookie = (name) => {
//   document.cookie = name +'=; Path=/; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }
export const carouselBreakPoints = [
  { width: 1, itemsToShow: 1 },
  // { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  // { width: 850, itemsToShow: 3, itemsToScroll: 3 },
];

export const carouselBreakPoints2 = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 850, itemsToShow: 3, itemsToScroll: 3 },
];

export const carouselBreakPoints3 = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 850, itemsToShow: 5, itemsToScroll: 3 },
];



export const getInputValue = (id) => {
  return document.querySelector(`#${id}`).value;
};

export const viewFormData = (formData) => {
  if (!formData) return;
  // console.log("================================");
  for (var pair of formData.entries()) {
    // console.log(pair[0] + ": " + pair[1]);
  }
  // console.log("================================");
};


export const clearString = (string) => {
  string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  string = string.replace(" ", "-").toLowerCase();
  return string;
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const whatsapp = "+57 300 845 9138";

export class NequiPayData {
  static phone = "300 845 9138";
  static wapp = "+573008459138";
  static message = "Compra de cursos en Blockchain";
}

export class BancolombiaPayData {
  static accountNumber = "68087694686";
  static accountType = "Cuenta de Ahorros Bancolombia";
  static accountOwner = "Andrés Chaljub";
  static accountDni = "CC: 1.067.911.845";
}

export class CryptoPayData {
  static moneyType = "Bitcoin";
  static accountWallet = "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2";
}

export const toastTypes = {
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
  SUCCESS: "success",
};

export const aditionalInfo = `Después de realizada la transacción envíanos captura del pago a nuestro WhatsApp ${whatsapp} con tus datos y el ID de la compra para realizar la activación del curso. Te esperamos.`;

export const getYoutubeLink = (url) => {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
};

// url = https://youtu.be/19HuHOWcXQs
// embed = https://www.youtube.com/embed/19HuHOWcXQs

export const getClosestDate = (dates) => {
  // dateInit
  const temp = dates.map((d) => Math.abs(new Date().getTime() - d.dateInit));
  const idx = temp.indexOf(Math.min(...temp));
  return dates[idx];
};


export const currencyFormat = function (number) {
  if (number) {
    return new Intl.NumberFormat('en-Us', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(number);
  } else {
    return '$' + 0
  }

};

export const percent = function (number) {
  if (number) {
    return number * 100;
  }
  return 0
};


export const capitalizer = function (str) {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}

export function myRound(num, dec) {
  var exp = Math.pow(10, dec || 5); // 2 decimales por defecto
  return parseInt(num * exp, 10) / exp;
}

export const States = (data) => {
  switch (data) {
    case 'pendiente':
      return 'bg-yellow-400';
    case 'completado':
      return 'bg-menu';
    case 'pagado':
      return 'bg-green-600';
    case 'aprobada':
      return 'bg-green-400'
    case 'declinada':
      return 'bg-red-400'
  }
}



export const StatesAlt = (data) => {
  switch (data) {
    case 'verified':
      return 'bg-positive';
    case 'pending':
      return 'bg-orange-400';
    case 'rejected':
      return 'bg-red-400';
    case 'waiting':
      return 'bg-yellow-400';
    case 'reviewNeeded':
      return 'bg-menu'
  }
}

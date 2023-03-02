import Call from "../../utils/call";

export const getUsers = async (page, data, idCountry, status) => {
  const limit = 10;


  try {

    const res = await Call("GET", `/user/${page}/${limit}?search=${data}&country=${idCountry}`, null, 1);
    if (res) {
      return res;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}



export const configCrypto = async () => {

  try {

    const res = await Call("GET", `config/percentages`, null, 1);
    if (res) {
      return res;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}


export const getCountryRegister = async () => {

  try {
    const res = await Call("GET", `config/countries/${true}`, null);

    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};


export const getSocio = async (idCountry) => {


  try {
    const res = await Call("GET", `config/partner/?search=${idCountry}`, null, 1);

    if (res.success) {

      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};


export const getBranch = async (idCountry) => {

  try {
    const res = await Call("GET", `config/branch/list/?search=${''}`, null, 1);

    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};




export const getGiro = async (page) => {

  const limit = 15;
  const search = 'giro';

  try {
    const res = await Call("GET", `purchase/${page}/${limit}?search=${search}`, 1);

    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};




export const getRates = async (page) => {

  const limit = 15;
  const search = 'giro';

  try {
    const res = await Call("GET", `config/rates`, 1);

    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};


export const getAllCity = async (idCountry) => {


  try {
    const res = await Call("GET", `config/cities/${idCountry}`);

    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};



export const changeStateSucursal = async (payload, id) => {

  try {
    const res = await Call("PUT", `/config/branch/update/${id}`, payload, 1);
    if (res.success) {
      return res;
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
} 
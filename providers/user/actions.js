// import Cookies from '@/utils/cookies'
// import Call from '@/utils/call'

import Call from "../../utils/call"
import Cookies from "../../utils/cookies"


export const loginUser = async (data) => {
  try {
    const res = await Call('POST', '/auth/login', data)
    Cookies.set('ssid', res.token)
    if (res.success) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}
export const getData = async () => {
  try {
    const token = Cookies.read('ssid')
    if (token) {
      const res = await Call('GET', '/user/me', token)
      if (res.success) {

        return res.user
      }
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}



export const resetPassword = async (data) => {
  try {
    const res = await Call('GET', `/auth/restore/password/${data}`)
    if (res) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}



export const SendNewPassword = async (data) => {
  try {
    const res = await Call('PUT', `/auth/restore/password/`, data)
    if (res) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}



export const logout = () => {
  try {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    return true
  } catch (err) {
    console.error(err)
    return false
  }


}


export const updateUser = async (data) => {

  try {
    const res = await Call('PUT', '/user/update', data, 1, 1);
    if (res) {
      return res;
    }
    return
  } catch (err) {
    console.error(err);
    return
  }
}



export const passwordUpdate = async (payload) => {
  try {
    if (!payload) throw "SignUp data must be provided";
    const res = await Call("PUT", `auth/update/password`, payload);

    if (res) {
      return res;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getAllChat = async (data) => {
  try {
    const res = await Call('GET', `chat/`, null, 1)
    if (res) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}


export const getSelectedChat = async (userId, page) => {
  try {
    const res = await Call('GET', `chat/me-info/${1}/${userId}`, null, 1)
    if (res) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}



export const viewUpdate = async (id) => {
  try {
    const res = await Call("PUT", `chat/view/${id}`, null, 1);

    if (res) {
      return res;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};



// PUT

export const sendMessage = async (data) => {
  try {
    const res = await Call('POST', '/chat/send', data, 1, 1)

    if (res.success) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}
export const sendTarifeValue = async (data) => {



  try {
    const res = await Call('POST', '/config/rate', data, 1)

    if (res.success) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return err



  }
}

export const updateTarifeValue = async (data, id) => {



  try {
    const res = await Call('PUT', `/config/rate/${id} `, data, 1)

    if (res.success) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}

export const removeTarifeValue = async (id) => {



  try {
    const res = await Call('PUT', `/config/rate/${id}/?remove='-' `, null, 1)

    if (res.success) {
      return res
    }
    return
  } catch (err) {
    console.error(err)
    return
  }
}
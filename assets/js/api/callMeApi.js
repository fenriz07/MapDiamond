
export function callMeApi(rut,name,email,phone,action,token) {
  const url = window.esmaxmzzo.ajaxurl;

  const body = {
    'action' : 'callme',
    'rut' : rut,
    'name' : name,
    'email' : email,
    'phone' : phone,
    'nonce' : window.esmaxmzzo.nonce,
    'action' : action,
    'token' : token,
  };

  const params = {
    method: "POST",
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
    },
    body: new URLSearchParams(body),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) 
      {
        return response.json();
      }
      return { code: 404, message: "Error" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}


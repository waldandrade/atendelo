import settings from '@/settings'

let auth = (headers) => {
  return fetch(`${settings.apetrusApi}/clientes/`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: headers
  })
}

let verificaUserlogado = (id, headers) => {
  return fetch(`${settings.apetrusApi}/clientes/getuserpessoa/?id=${id}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: headers
  })
}

let listaUsuarios = (pagination, headers) => {
  return fetch(`${settings.apetrusApi}/clientes/usuarios/?page=${pagination.page}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: headers
  })
}

let detalhar = (id, headers) => {
  return fetch(`${settings.apetrusApi}/clientes/porid/?id=${id}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: headers
  })
}

let sendmail = (mail, headers) => {
  return fetch(`${settings.apetrusApi}/sendmail/cadpostocliente/`, {
    method: 'post',
    body: JSON.stringify(mail),
    mode: 'cors',
    headers: headers
  })
}

let contact = (mail, headers) => {
  return fetch(`${settings.apetrusApi}/sendmail/api/sendmail/`, {
    method: 'post',
    body: JSON.stringify(mail),
    mode: 'cors',
    headers: headers
  })
}

let inserir = (empresa, headers) => {
  return fetch(`${settings.apetrusApi}/clientes/cadastrar/`, {
    method: 'POST',
    body: JSON.stringify(empresa),
    mode: 'cors',
    headers: headers
  })
}

export default {
  auth,
  listaUsuarios,
  detalhar,
  sendmail,
  contact,
  inserir,
  verificaUserlogado
}

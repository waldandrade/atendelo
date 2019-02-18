import settings from '@/settings'

let atualizarImagemPerfil = (id, imagem, headers) => {
  return fetch(`${settings.apetrusApi}/pessoas/atualizarimagemperfil/?id_pessoa=${id}`, {
    method: 'PUT',
    body: JSON.stringify(imagem),
    mode: 'cors',
    headers: headers
  })
}

let insert = (data) => {
  return fetch(`${settings.apetrusApi}/pessoas/cadastrar/`, {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'cors'
  })
}

let atualizarEndereco = (id, data) => {
  return fetch(`${settings.apetrusApi}/pessoas/atualizarendereco/?id_pessoa=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    mode: 'cors'
  })
}

let auth = (headers) => {
  return fetch(`${settings.apetrusApi}/pessoas/`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: headers
  })
}

export default {
  atualizarImagemPerfil,
  insert,
  atualizarEndereco,
  auth
}

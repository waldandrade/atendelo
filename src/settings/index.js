const PRODUCTION = process.env.NODE_ENV === 'production'

export default {
  apetrusApi: PRODUCTION ? 'https://api.apetrus.com.br' : 'http://localhost:8000/apetrus/api'
  // apetrusApi: PRODUCTION ? 'https://api.apetrus.com.br' : 'http://192.168.1.102:8000/apetrus/api'
}

import Cookies from 'js-cookie'
const TokenKey = 'admin-token'

export function getToken () {
 return Cookies.getJSON(TokenKey)
}
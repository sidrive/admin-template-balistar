import request from '@/utils/request'

export function listCompany (param) {
  console.log('error', request)
  return request({
    url: '/master/company',
    method: 'get',
    headers: {
      'Cookie': 'AizawaraEEj'
    }
  })
}
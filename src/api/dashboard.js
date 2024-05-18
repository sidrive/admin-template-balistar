import request from '@/utils/request'

export function listCompany (param) {
  console.log('error', request)
  return request({
    url: '/master/company',
    method: 'get',
  })
}

export function addCompany (data) {
  return request({
    url: '/master/company/',
    method: 'post',
    data
  })
}

export function editCompany (data) {
  return request({
    url: '/master/company/' + data.compId,
    method: 'put',
    data
  })
}

export function deleteCompany (data) {
  return request({
    url: '/master/company/' + data.compId,
    method: 'delete',
    data
  })
}

export function listCompanyGrup (param) {
  return request({
    url: '/master/company_group',
    method: 'get',
  })
}

export function editCompanyGrup (data) {
  return request({
    url: '/master/company_group/' + data.grcpId,
    method: 'put',
    data
  })
}

export function addCompanyGrup (data) {
  return request({
    url: '/master/company_group/',
    method: 'post',
    data
  })
}

export function deleteCompanyGrup (data) {
  return request({
    url: '/master/company_group/' + data.grcpId,
    method: 'delete',
    data
  })
}
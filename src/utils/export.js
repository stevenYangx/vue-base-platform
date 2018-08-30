import json2csv from 'json2csv'

let base = '/api/';

export default (downloadUrl,downloadName) => {
  try {
    var link = document.createElement('a')
    link.setAttribute('href', `${base}`+downloadUrl)
    link.setAttribute('download',downloadName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.error(err)
  }
}

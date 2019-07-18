import api from '../api/'

/**
 * tableToExcel(tableData, fileName)
 * @param  {string}   tableData <tr><td>表格</td></td></tr>
 * @param  {string}   fileName 下载文件名
 */
export const tableToExcel = (tableData, fileName) => {
  // base64转码
  let base64 = (s) => {
    return window.btoa(unescape(encodeURIComponent(s)))
  }
  // 替换table数据和worksheet名字
  let format = (s, c) => {
    return s.replace(/{(\w+)}/g,
      (m, p) => {
        return c[p]
      })
  }
  let type = 'data:application/vnd.ms-excel;base64,'
  // 导出模块
  let template = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <head>
      <style type="text/css">
        table {border-collapse:collapse;} 
        table th {
          background:#333;
          color:#fff;
        }
        table td {
          border: 1px solid #000;
          text-align: center;
          background: #ccc;
          color: #333;
        }
      </style>
      </head>
      <body>
        <table>{table}</table>
      </body>
    </html>
    `
  let ctx = {
    worksheet: 'sheetName' || 'Worksheet',
    table: tableData
  }
  let link = document.createElement('a')
  // 利用URL.createObjectURL()方法为a元素生成blob URL
  link.href = type + base64(format(template, ctx))
  // 配置下载的文件名
  link.download = fileName + '.xls'
  link.click()
}

export const exportExcelApi = (params, fileName) => {
  let _params = params
  api.getFileUpload(_params, res => {
    // 创建一个blob对象,file的一种
    let blob = new window.Blob([res], {
      type: 'application/vnd.ms-excel;charset=UTF-8'
    })
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    // 配置下载的文件名
    link.download = fileName + '.xls'
    link.click()
  })
}

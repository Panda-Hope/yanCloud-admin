
/**
* 获取图片的 base64 编码 DataURL
* @param image JS 图像对象
* @return {string} 已编码的 DataURL
*/
const getImageDataURL = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx!.drawImage(image, 0, 0, image.width, image.height);
  const extension = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
  return canvas.toDataURL('image/' + extension, 1);
}

export const downloadImg = (url = '', downloadName = '图片') => {
  if (!url) return;
  const tag = document.createElement('a');
  tag.setAttribute('download', downloadName.replace(/\./g, '_'));
  const image = new Image();
  image.src = url + '?time=' + new Date().getTime();
  image.crossOrigin = '*';
  image.onload = () => {
    tag.href = getImageDataURL(image);
    tag.click();
  };
}

// 通过后端get接口下载excel表格

export const downloadExcelByGet = (data: ArrayBuffer, name = '表格') => {
  const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
  const href = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = href
  a.download = name
  a.click()
  URL.revokeObjectURL(a.href) //释放URL对象
}


import fs from 'node:fs'
import path from 'node:path'

import { MultipartFile } from '@fastify/multipart'

import dayjs from 'dayjs'

enum Type {
  IMAGE = '图片',
  TXT = '文档',
  MUSIC = '音乐',
  VIDEO = '视频',
  OTHER = '其他',
}

export function getFileType(extName: string) {
  const documents = 'txt doc pdf ppt pps xlsx xls docx'
  const music = 'mp3 wav wma mpa ram ra aac aif m4a'
  const video = 'avi mpg mpe mpeg asf wmv mov qt rm mp4 flv m4v webm ogv ogg'
  const image
    = 'bmp dib pcp dif wmf gif jpg tif eps psd cdr iff tga pcd mpt png jpeg'
  if (image.includes(extName))
    return Type.IMAGE

  if (documents.includes(extName))
    return Type.TXT

  if (music.includes(extName))
    return Type.MUSIC

  if (video.includes(extName))
    return Type.VIDEO

  return Type.OTHER
}

export function getName(fileName: string) {
  if (fileName.includes('.'))
    return fileName.split('.')[0]

  return fileName
}

export function getExtname(fileName: string) {
  return path.extname(fileName).replace('.', '')
}

export function getSize(bytes: number, decimals = 2) {
  if (bytes === 0)
    return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

/**
 * 安全重命名文件名，防止路径遍历
 * 仅保留 basename，过滤 .. / \ 等危险字符
 */
export function fileRename(fileName: string) {
  const safeName = path.basename(fileName).replace(/\.\.|[\\/]/g, '')
  const name = safeName.includes('.') ? safeName.split('.')[0] : safeName
  const extName = path.extname(fileName).replace('.', '') || 'bin'
  const time = dayjs().format('YYYYMMDDHHmmSSS')
  return `${name || 'file'}-${time}.${extName}`
}

export function getFilePath(name: string, currentDate: string, type: string) {
  return `/upload/${currentDate}/${type}/${name}`
}

const UPLOAD_ROOT = path.resolve(__dirname, '../../public/upload')

export async function saveLocalFile(buffer: Buffer, name: string, currentDate: string, type: string) {
  const safeName = path.basename(name).replace(/\.\.|[\\/]/g, '')
  if (!safeName)
    throw new Error('Invalid file name')

  const dirPath = path.join(UPLOAD_ROOT, currentDate, type)
  const fullPath = path.join(dirPath, safeName)
  const resolvedPath = path.resolve(fullPath)

  if (!resolvedPath.startsWith(UPLOAD_ROOT))
    throw new Error('Path traversal detected')

  try {
    await fs.promises.stat(dirPath)
  }
  catch {
    await fs.promises.mkdir(dirPath, { recursive: true })
  }
  const writeStream = fs.createWriteStream(resolvedPath)
  writeStream.write(buffer)
}

export async function saveFile(file: MultipartFile, name: string) {
  const safeName = path.basename(name).replace(/\.\.|[\\/]/g, '')
  if (!safeName)
    throw new Error('Invalid file name')

  const fullPath = path.join(UPLOAD_ROOT, safeName)
  const resolvedPath = path.resolve(fullPath)
  if (!resolvedPath.startsWith(UPLOAD_ROOT))
    throw new Error('Path traversal detected')

  const writeStream = fs.createWriteStream(resolvedPath)
  const buffer = await file.toBuffer()
  writeStream.write(buffer)
}

export async function deleteFile(name: string) {
  const relativePath = name.replace(/^\//, '').replace(/\.\./g, '')
  const publicRoot = path.resolve(__dirname, '../../public')
  const fullPath = path.join(publicRoot, relativePath)
  const resolvedPath = path.resolve(fullPath)

  if (!resolvedPath.startsWith(publicRoot))
    throw new Error('Path traversal detected')

  fs.unlink(resolvedPath, () => {})
}

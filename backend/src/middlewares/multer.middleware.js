import path from 'path'
import fs from 'fs'
import multer from 'multer'
import { ApiError } from '../utils/ApiError.js'

// ------------------ X ------------------
// file dir

const publicDir =  path.join(process.cwd(), "public")
const fileFolder = path.join(publicDir, "uploadFile")
const avatarFolder = path.join(publicDir, "uploadAvatar")
const imageFolder = path.join(publicDir, "uploadImage");

// ------------------ X ------------------
//  if didn't dir folder exist then create dir folder

[publicDir,fileFolder,avatarFolder,imageFolder].forEach(dir => {
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive : true })
  }
})

// ------------------ X ------------------
// file storage

const fileStrorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, fileFolder)
    },

    filename: (req,file,cb) => {
         const uniSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const cleanName = file.originalname.replace(/\s+g/, "_")

        cb(null, `${uniSuffix}-${cleanName}`)
    }
})

// ------------------ X ------------------
// avatar storage

const avatarStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, avatarFolder)
    },

    filename: (req,file,cb) => {
         const uniSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const cleanName = file.originalname.replace(/\s+g/, "_")

        cb(null, `${uniSuffix}-${cleanName}`)
    }
})

// ------------------ X ------------------
// image storage

const imageStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, imageFolder)
    },

    filename: (req,file,cb) => {
         const uniSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const cleanName = file.originalname.replace(/\s+g/, "_")

        cb(null, `${uniSuffix}-${cleanName}`)
    }
})



// ------------------ X ------------------
// file filter

const fileFilter = (req,file,cb) => {

  const allowedExtensions = [
    "text/csv", // .csv
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
  ]

  if(allowedExtensions.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new ApiError(400, "only csv and excel file can allowed "), false)
    }

}


// ------------------ X ------------------
// upload middleware

const uploadFile = multer({
  storage : fileStrorage,
  fileFilter,
  limits : {
    fileSize : 6 * 1024 * 1024
  }
})

const uploadAvatar = multer({
    storage : avatarStorage,
    limits : {
      fileSize : 3 * 1024 * 1024
    }
})

const uploadImage = multer({
    storage : imageStorage,
    limits : {
      fileSize : 5 * 1024 * 1024
    }
})


export {
  uploadAvatar,
  uploadFile,
  uploadImage
}

import multer from "multer"

const storage = multer.diskStorage({
  //! file is present with multer (we get a file access)
  //! cb is callback function that we will call when multer is done
  //! and store the file at the desired destination path
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    // cb(null, file.fieldname + "-" + uniqueSuffix)
    cb(null, file.originalname)
  },
})

export const upload = multer({ storage })

//! now if we insert any post request with file in it
//! then we can use upload.single('<file_name>') in that request
//! and with file.originalname this will select the file having the name <file_name>
//! before it is updated to cloudinary

//todo: implement the functionality of changing the file name everytime for a new file
//todo: so that a file with the same name can't be overwritten.
//* the above todo is implemented using uniqueSuffix and file.fieldname

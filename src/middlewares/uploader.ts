import multer from "multer"
import path from "path"

class Uploader {
  private storageConfig = multer.diskStorage({
    // destinations is uploads folder under the project directory
    destination: path.join(__dirname, "../../public/uploads"),
      filename: (req, file, res) => {
      // file name is prepended with current time in milliseconds to handle duplicate file names
      res(null, Date.now() + "-" + file.originalname);
    },
  });
  
  public upload = multer({
    // applying storage and file filter
    storage: this.storageConfig
  });
}

export default Uploader
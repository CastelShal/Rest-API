import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
      let extension = path.extname(file.originalname);
      callback(null, Date.now()+ '.' +extension);
    }
  });
  const upload = multer({storage: storage});

export default upload;

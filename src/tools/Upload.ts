import { promisify } from 'util';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const processFile = upload.single('file');


export default upload;

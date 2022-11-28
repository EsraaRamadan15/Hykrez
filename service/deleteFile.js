import { existsSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { join,dirname } from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function DeleteFileFromSystem (customPath) {
   
const fullPath = join(__dirname, `../${customPath}`)
    if (existsSync(fullPath)) {
        unlinkSync(fullPath);
    }
}

export default DeleteFileFromSystem;
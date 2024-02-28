import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from 'path';

export function convertToCSV(eventId, arr) {
    const uploads = path.resolve(__dirname, `../uploads/event${eventId}.csv`);
    const array = [Object.keys(arr[0])].concat(arr)
  
    const data =  array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
    writeFileSync(uploads, data);
  }

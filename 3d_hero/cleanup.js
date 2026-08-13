const fs = require('fs');
const path = require('path');

const directory = '.';

fs.readdir(directory, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory:', err);
    }

    let deletedCount = 0;
    files.forEach(file => {
        if (file.startsWith('ezgif-frame-') && file.endsWith('.jpg')) {
            fs.unlink(path.join(directory, file), err => {
                if (err) {
                    console.error(`Error deleting ${file}:`, err);
                }
            });
            deletedCount++;
        }
    });
    console.log(`Cleanup execution triggered! Scanning files... deleted ${deletedCount} legacy 30fps frames.`);
});

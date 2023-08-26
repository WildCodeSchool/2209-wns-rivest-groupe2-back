import fs from 'fs';

const optionsRegex = /{{(.+?)}}/gm;

async function getFileData(path: string): Promise<string> {
    return await new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function(err, data) {
            if (err != null) {
                reject(new Error('Could not read file'));
                return;
            }
            resolve(data);
        });
    });
}
export async function renderFile(path: string, options: { [key: string]: string }): Promise<string> {
    const data = await getFileData(path);
    if (data === null) {
        throw new Error('Error, could not read file ' + path);
    }
    return data.replace(optionsRegex, (_match: string, group: string) => (options[group] !== undefined ? options[group] : group));
}

export default async form => {
    const file = await readMultipartFormData(form);

    const FILE_KEYS = ["name", "filename", "type", "data"]

    const isFile = object => Object.keys(object).filter(v => FILE_KEYS.includes(v)).length === FILE_KEYS.length;
    
    const result = file.reduce((prev, next) => {
        prev[isFile(next) ? "image" : next.name] = isFile(next) ? next : next.data.toString("utf-8")
        return prev;
    }, {});

    return result;
}
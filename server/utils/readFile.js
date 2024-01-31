import escape from "validator/lib/escape.js";
import trim from "validator/lib/trim.js";
export default async form => {
    const file = await readMultipartFormData(form);
    console.log(file, 'files')

    const FILE_KEYS = ["name", "filename", "type", "data"]

    const isArray = object => object.name.includes("[]");

    const isFile = object => Object.keys(object).filter(v => FILE_KEYS.includes(v)).length === FILE_KEYS.length;
    
    const result = file.reduce((prev, next) => {
        prev[isFile(next) ? "image" : isArray(next) ? next.name.slice(0,-2) : next.name] = isFile(next) ? next : isArray(next) ? prev.hasOwnProperty(next.name.slice(0,-2)) ? [...prev[next.name.slice(0,-2)], next.data.toString("utf-8")] : prev[next.name.slice(0,-2)] = [next.data.toString("utf-8")] : next.data.toString("utf-8")
        return prev;
    }, {});
    console.log(result);
    Object.entries(result).forEach(v => {
        if (Array.isArray(v[1]) || v[0] == "image") return;
        if (typeof v[1] == "object" && !Array.isArray(v[1])) {
                let filter = escape(result[v[0]][vv[0]]);
                filter = trim(filter);
                result[v[0]][vv[0]] = filter
            } else {
                let filter = escape(v[1]);
                filter = trim(filter);
                result[v[0]] = filter
            }
        }
    );

    return result;
}
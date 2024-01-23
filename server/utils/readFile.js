import escape from "validator/lib/escape";
import trim from "validator/lib/trim";
export default async form => {
    const file = await readMultipartFormData(form);

    const FILE_KEYS = ["name", "filename", "type", "data"]

    const isFile = object => Object.keys(object).filter(v => FILE_KEYS.includes(v)).length === FILE_KEYS.length;
    
    const result = file.reduce((prev, next) => {
        prev[isFile(next) ? "image" : next.name] = isFile(next) ? next : next.data.toString("utf-8")
        return prev;
    }, {});

    Object.entries(result).forEach(v => {
        if (v[0] == "image") return;
        if (typeof v[1] == "object") {
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
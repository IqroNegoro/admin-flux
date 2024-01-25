import escape from "validator/lib/escape";
import trim from "validator/lib/trim";
export default async form => {
    const data = await readBody(form);

    Object.entries(data).forEach(v => {
        if (v[0] == "image" && typeof v[1] == 'object') return;
        if (typeof v[1] == "object") {
                let filter = escape(data[v[0]][vv[0]]);
                filter = trim(filter);
                data[v[0]][vv[0]] = filter
            } else {
                let filter = escape(v[1]);
                filter = trim(filter);
                data[v[0]] = filter
            }
        }
    );

    return data;
}
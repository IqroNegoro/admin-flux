export const formatRp = num => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
}).format(num || 0);

export const capitalize = string => string ? string[0].toUpperCase() + string.slice(1) : "";

export const pascal = string => string ? string.replace(/^\w/gi, x => x.toUpperCase()).replace(/_/gi, " ").replace(/\s\w/gi, x => `${x.toUpperCase()}`) : ""
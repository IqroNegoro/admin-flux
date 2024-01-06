export const formatRp = num => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
}).format(num);
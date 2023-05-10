const TransaksiIndex = () =>
    import("@/views/pages/transaksi/TransaksiIndex.vue");
const DetailTransaksi = () =>
    import("@/views/pages/transaksi/DetailTransaksi.vue");

export default [
    {
        path: "/transaksi",
        name: "transaksi",
        component: TransaksiIndex,
    },
    {
        path: "/transaksi/:id",
        name: "transaksi-detail",
        component: DetailTransaksi,
    },
];

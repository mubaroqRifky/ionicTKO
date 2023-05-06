const TransaksiIndex = () =>
    import("@/views/pages/transaksi/TransaksiIndex.vue");

export default [
    {
        path: "/transaksi",
        name: "transaksi",
        component: TransaksiIndex,
    },
];

const PembayaranIndex = () =>
    import("@/views/pages/pembayaran/PembayaranIndex.vue");

export default [
    {
        path: "/pembayaran",
        name: "pembayaran",
        component: PembayaranIndex,
    },
];

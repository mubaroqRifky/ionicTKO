const PenjualanIndex = () =>
    import("@/views/pages/penjualan/PenjualanIndex.vue");

export default [
    {
        path: "/penjualan",
        name: "penjualan",
        component: PenjualanIndex,
    },
];

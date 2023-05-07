import Main from "@/views/layouts/Main.vue";
import HomeRoute from "./homeRoute.js";
import PenjualanRoute from "./penjualanRoute.js";
import TransaksiRoute from "./transaksiRoute.js";
import CustomerRoute from "./customerRoute.js";
import PembayaranRoute from "./pembayaranRoute.js";

export default [
    {
        path: "/",
        name: "main",
        component: Main,
        redirect: { name: "home" },
        children: [
            ...HomeRoute,
            ...PenjualanRoute,
            ...TransaksiRoute,
            ...CustomerRoute,
            ...PembayaranRoute,
        ],
        meta: {
            needAuth: true,
        },
    },
];

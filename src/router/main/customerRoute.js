const CustomerIndex = () => import("@/views/pages/customer/CustomerIndex.vue");

export default [
    {
        path: "/customer",
        name: "customer",
        component: CustomerIndex,
    },
];

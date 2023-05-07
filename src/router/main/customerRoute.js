const CustomerIndex = () => import("@/views/pages/customer/CustomerIndex.vue");
const CustomerForm = () => import("@/views/pages/customer/CustomerForm.vue");

export default [
    {
        path: "/customer",
        name: "customer",
        component: CustomerIndex,
    },
    {
        path: "/customer/create",
        name: "customer-create",
        component: CustomerForm,
        meta: {
            action: "create",
            label: "Customer",
        },
    },
    {
        path: "/customer/edit/:id",
        name: "customer-edit",
        component: CustomerForm,
        meta: {
            action: "edit",
            label: "Customer",
        },
    },
    {
        path: "/customer/show/:id",
        name: "customer-show",
        component: CustomerForm,
        meta: {
            action: "show",
            label: "Customer",
        },
    },
];

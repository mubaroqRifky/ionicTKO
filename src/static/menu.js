import { shallowRef, defineAsyncComponent } from "vue";

const HomeIcon = defineAsyncComponent(() =>
    import("@/components/icons/IconMenuHome.vue")
);
const MasterIcon = defineAsyncComponent(() =>
    import("@/components/icons/IconList.vue")
);
const MitraIcon = defineAsyncComponent(() =>
    import("@/components/icons/IconMitra.vue")
);
const HatcheryIcon = defineAsyncComponent(() =>
    import("@/components/icons/IconHatchery.vue")
);
const ForecastIcon = defineAsyncComponent(() =>
    import("@/components/icons/IconForecast.vue")
);
const InventoryIcon = defineAsyncComponent(() =>
    import("@/components/icons/IconInventory.vue")
);
const ApproveIcon = defineAsyncComponent(() =>
    import("@/components/icons/IconApprove.vue")
);
const ReportIcon = defineAsyncComponent(() =>
    import("@/components/icons/IconReport.vue")
);

export default [
    {
        text: "Dashboard",
        name: "dashboard",
        icon: shallowRef(HomeIcon),
        permit: "DASHBOARD_VIEW_ANY",
    },

    {
        text: "Master",
        name: "master",
        icon: shallowRef(MasterIcon),
        child: [
            {
                text: "Customer",
                name: "customer",
                permit: "CUSTOMER_VIEW_ANY",
            },
            {
                text: "Benih",
                name: "benih",
                permit: "BENIH_VIEW_ANY",
            },
            {
                text: "Harga",
                name: "harga",
                permit: "PRICE_VIEW_ANY",
            },
            {
                text: "User Management",
                name: "user",
                permit: "USER_VIEW_ANY",
            },
            {
                text: "Role",
                name: "role",
                permit: "ROLE_VIEW_ANY",
            },
            {
                text: "Permission",
                name: "permission",
                permit: "PERMISSION_VIEW_ANY",
            },
            {
                text: "Kolam",
                name: "kolam",
                permit: "KOLAM_VIEW_ANY",
            },
            {
                text: "Mitra",
                name: "mitra",
                permit: "MITRA_VIEW_ANY",
            },
        ],
    },

    {
        text: "Transaksi Mitra",
        brief: "Mitra",
        name: "transaksi-mitra",
        icon: shallowRef(MitraIcon),
        child: [
            {
                text: "Data Induk Mitra",
                name: "data-induk-mitra",
                permit: "MITRA_INDUK_VIEW_ANY",
            },
            {
                text: "Jadwal Panen",
                name: "jadwal-panen-mitra",
                permit: "MITRA_PANEN_VIEW_ANY",
            },
        ],
    },

    {
        text: "Transaksi Hatchery",
        brief: "Hatchery",
        name: "transaksi-hatchery",
        icon: shallowRef(HatcheryIcon),
        child: [
            {
                text: "Data Induk Hatchery",
                name: "data-induk-hatchery",
                permit: "HATCHERY_INDUK_VIEW_ANY",
            },
            {
                text: "Jadwal Panen",
                name: "jadwal-panen-hatchery",
                permit: "HATCHERY_PANEN_VIEW_ANY",
            },
        ],
    },

    {
        text: "Forecast",
        name: "forecast",
        icon: shallowRef(ForecastIcon),
        permit: "FORECAST_VIEW_ANY",
    },

    {
        text: "Inventory",
        name: "inventory",
        icon: shallowRef(InventoryIcon),
        child: [
            {
                text: "Induk",
                name: "inventory-induk",
                permit: "INVENTORY_INDUK_VIEW_ANY",
            },
            {
                text: "Benih",
                name: "inventory-benih",
                permit: "INVENTORY_BENIH_VIEW_ANY",
            },
        ],
    },

    {
        text: "Approve",
        name: "approve",
        icon: shallowRef(ApproveIcon),
        permit: "APPROVE_VIEW_ANY",
    },

    {
        text: "Report",
        name: "report",
        icon: shallowRef(ReportIcon),
        child: [
            {
                text: "Logs",
                name: "logs",
                permit: "LOG_ACTIVITY",
            },
        ],
    },
];

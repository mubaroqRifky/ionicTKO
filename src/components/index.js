import { defineAsyncComponent } from "vue";

import vSelect from "vue-select"; //import vue-select
import Datepicker from "@vuepic/vue-datepicker";

const Main = defineAsyncComponent(() => import("@/views/layouts/Main.vue"));
const Sidebar = defineAsyncComponent(() =>
    import("@/views/layouts/Sidebar.vue")
);
const Header = defineAsyncComponent(() => import("@/views/layouts/Header.vue"));
const ModalConfirmation = defineAsyncComponent(() =>
    import("./modal/ModalConfirmation.vue")
);
const ModalSecondary = defineAsyncComponent(() =>
    import("./modal/ModalSecondary.vue")
);
const CustomInput = defineAsyncComponent(() =>
    import("./input/CustomInput.vue")
);
const InputSearch = defineAsyncComponent(() =>
    import("./input/InputSearch.vue")
);
const ContentContainer = defineAsyncComponent(() =>
    import("./container/ContentContainer.vue")
);
const CardButton = defineAsyncComponent(() =>
    import("./button/CardButton.vue")
);
const TableCustom = defineAsyncComponent(() =>
    import("./table/TableCustom.vue")
);
const ModalForm = defineAsyncComponent(() => import("./modal/ModalForm.vue"));
const ModalFormTable = defineAsyncComponent(() =>
    import("./modal/ModalFormTable.vue")
);
const FilterTable = defineAsyncComponent(() =>
    import("./table/FilterTable.vue")
);
const CustomSelect = defineAsyncComponent(() =>
    import("./input/CustomSelectSearch.vue")
);
const SplashScreen = defineAsyncComponent(() =>
    import("@/views/layouts/Splash.vue")
);

const components = {
    "v-select": vSelect,
    Datepicker,

    Main,
    Sidebar,
    Header,
    ModalConfirmation,
    ModalSecondary,
    CustomInput,
    InputSearch,
    ContentContainer,
    CardButton,
    TableCustom,
    ModalForm,
    ModalFormTable,
    FilterTable,
    CustomSelect,
    SplashScreen,
};

const result = [];
for (const key in components) {
    result.push({ name: key, component: components[key] });
}

export default result;

<template lang="">
    <header
        class="px-4 bg-primary text-white shadow-sm flex items-center fixed left-0 right-0 h-14 z-30 mobile-width-constraint"
    >
        <button
            aria-label="Back Button"
            alt="Back Button"
            @click="$router.go(-1)"
        >
            <IconArrowLeft width="30px" />
        </button>

        <h2 class="flex-1 text-center font-bold text-md">{{ getTitle }}</h2>
    </header>

    <section class="mt-14 px-4 py-7 overflow-auto scroll-hidden">
        <div class="grid gap-5">
            <CustomInput
                placeholder="Nama Customer"
                required
                :validity="errors.nm_customer"
            />
            <CustomInput
                placeholder="Nama Petani"
                required
                :validity="errors.nm_petani"
            />
            <CustomInput
                placeholder="Alamat Customer"
                type="textarea"
                required
                :validity="errors.alamat_customer"
            />
            <CustomInput
                placeholder="Nomor Telepon"
                required
                :validity="errors.nomor_telepon"
            />
            <CustomInput
                placeholder="Email"
                type="email"
                required
                :validity="errors.email"
            />
            <CustomInput
                placeholder="Area"
                type="select"
                required
                :validity="errors.area"
            />
            <CustomInput
                placeholder="Sub Area"
                type="select"
                required
                :validity="errors.sub_area"
            />
            <CustomInput
                placeholder="Jumlah Kolam"
                type="number"
                required
                :validity="errors.jml_kolam"
            />
            <CustomInput
                placeholder="Pakan"
                type="select"
                required
                :validity="errors.kd_pakan"
            />
            <CustomInput
                placeholder="Keterangan"
                type="textarea"
                required
                :validity="errors.keterangan"
            />
        </div>

        <div class="grid mt-5" v-if="action != PAGE_ACTION.SHOW">
            <button class="btn btn-secondary">{{ getActionButton }}</button>
        </div>
    </section>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconAdd from "@/components/icons/IconAdd.vue";

import InputSearch from "@/components/input/InputSearch.vue";
import CustomInput from "@/components/input/CustomInput.vue";

export default {
    data() {
        return {
            form: {},
            errors: {},

            action: "",
            id: "",
            PAGE_ACTION: {
                CREATE: "create",
                EDIT: "edit",
                SHOW: "show",
            },
        };
    },
    components: { IconArrowLeft, IconEdit, InputSearch, IconAdd, CustomInput },
    computed: {
        getTitle() {
            switch (this.$route.name) {
                case "customer-create":
                    return "Isi Data " + this.$route.meta.label;
                case "customer-edit":
                    return "Edit Data " + this.$route.meta.label;
                case "customer-show":
                    return "Lihat Data " + this.$route.meta.label;
                default:
                    return "Default Title";
            }
        },
        getActionButton() {
            switch (this.$route.name) {
                case "customer-create":
                    return "Tambahkan";
                case "customer-edit":
                    return "Ubah";
                default:
                    return "Default Text";
            }
        },
    },
    created() {
        this.action = this.$route.meta.action;
        this.id = this.$route.params.id;
    },
};
</script>

<style lang=""></style>

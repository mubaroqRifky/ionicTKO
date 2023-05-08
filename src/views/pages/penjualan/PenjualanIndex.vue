<template lang="">
    <header
        class="px-4 bg-primary text-white shadow-sm flex items-center fixed left-0 right-0 h-14 z-30 mobile-width-constraint"
    >
        <h2 class="flex-1 text-center font-bold text-md">Penjualan</h2>
    </header>

    <section class="mt-14 px-4 py-7 overflow-auto scroll-hidden">
        <div class="grid gap-5">
            <CustomSelect
                dir="col"
                :api="api_customer"
                class="lg:w-3/4"
                :reduce="(val) => ({ selected: val.kd_customer, data: val })"
                label_option="nm_customer"
                placeholder="Pilih Customer"
                :value="form.kd_customer"
                :required="true"
                :disabled="loading || loadData"
                :validity="errors.kd_customer"
                @select="(val) => selectSearchHandler(val, 'kd_customer')"
            />
            <CustomInput
                placeholder="Nama Petani"
                required
                :validity="errors.nama_petani"
            />
            <CustomInput
                placeholder="Tanggal Delivery"
                type="date"
                required
                :validity="errors.tgl_delivery"
            />
            <CustomInput
                placeholder="Alamat Pengiriman"
                type="textarea"
                required
                :validity="errors.delivery_address"
            />
            <CustomInput
                placeholder="Keterangan"
                type="textarea"
                required
                :validity="errors.keterangan"
            />
        </div>

        <div class="grid mt-5">
            <button class="btn btn-secondary">Lanjutkan</button>
        </div>
    </section>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";

import CustomInput from "@/components/input/CustomInput.vue";

import InputValidation from "@/controllers/state/InputValidation";
import Modal from "@/controllers/state/Modal";
import Loading from "@/controllers/state/Loading";

import Customer from "@/apis/Customer";

export default {
    data() {
        return {
            api_customer: new Customer(),

            form: {},
            errors: {},
        };
    },
    components: { IconArrowLeft, CustomInput },
    computed: {
        loading() {
            return Loading.get();
        },
        getErrorsState() {
            return InputValidation.get();
        },
    },
    methods: {
        async selectSearchHandler({ selected, data }, key) {
            try {
                this[key] = selected || "";
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
    },
};
</script>

<style lang=""></style>

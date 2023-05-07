<template lang="">
    <header
        class="px-4 bg-primary text-white shadow-sm flex items-center fixed left-0 right-0 h-14 z-30 mobile-width-constraint"
    >
        <h2 class="flex-1 text-center font-bold text-md">Penjualan</h2>
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
                placeholder="Tanggal Delivery"
                type="date"
                required
                :validity="errors.tgl_delivery"
            />
            <CustomInput
                placeholder="Kolam Tujuan"
                type="select"
                required
                :validity="errors.kd_kolam"
            />
            <CustomInput
                placeholder="Alamat Pengiriman"
                type="textarea"
                required
                :validity="errors.alamat_kirim"
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

export default {
    data() {
        return {
            form: {},
            errors: {},
        };
    },
    components: { IconArrowLeft, CustomInput },
};
</script>

<style lang=""></style>

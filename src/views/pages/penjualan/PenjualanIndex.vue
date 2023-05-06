<template lang="">
    <header
        class="px-4 bg-primary text-white shadow-sm flex items-center fixed left-0 right-0 h-14 z-30"
    >
        <!-- <button
            aria-label="Back Button"
            alt="Back Button"
            @click="$router.go(-1)"
        >
            <IconArrowLeft width="30px" />
        </button> -->

        <h2 class="flex-1 text-center font-bold text-md">Penjualan</h2>
    </header>

    <section class="mt-14 px-4 py-7">
        <div class="grid gap-5">
            <CustomInput placeholder="Nama Customer" />
            <CustomInput placeholder="Nama Petani" />
            <CustomInput placeholder="Nama Petani" type="date" />
            <CustomInput placeholder="Nama Petani" type="select" />
            <CustomInput placeholder="Alamat Pengiriman" type="textarea" />
            <CustomInput placeholder="Keterangan" type="textarea" />
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
    components: { IconArrowLeft, CustomInput },
};
</script>

<style lang=""></style>

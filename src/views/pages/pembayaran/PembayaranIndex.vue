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

        <h2 class="flex-1 text-center font-bold text-md">Pembayaran</h2>
    </header>

    <div class="sticky top-14 z-10 bg-gray p-4">
        <InputSearch placeholder="Search" :icon="true" />

        <div
            class="flex gap-1 items-center justify-end mt-4"
            style="font-size: 0.7rem"
        >
            <span>Berdasarkan tanggal</span>
            <IconFilter />
        </div>
    </div>

    <section class="mt-10 px-4 py-4 grid gap-4 text-sm">
        <div
            class="card-container overflow-hidden"
            v-for="(item, index) in 15"
            :key="index"
        >
            <div class="px-6 py-6">
                <div class="grid grid-cols-2 gap-2">
                    <p class="font-bold">SO/123/456</p>
                    <p class="text-right">14-03-2023</p>
                    <p>Vincent Valentine</p>
                    <p class="font-bold text-primary text-right">
                        Rp. 15.000.000
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconFilter from "@/components/icons/IconFilter.vue";

import InputSearch from "@/components/input/InputSearch.vue";

export default {
    components: { IconArrowLeft, IconEdit, IconFilter, InputSearch },
};
</script>

<style lang=""></style>

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

        <h2 class="flex-1 text-center font-bold text-md">Customer</h2>
    </header>

    <div class="sticky top-14 z-10 bg-gray p-4">
        <InputSearch placeholder="Cari Customer" :icon="true" />
    </div>

    <section class="mt-10 px-4 py-4 grid gap-4 text-sm">
        <div
            class="card-container overflow-hidden"
            v-for="(item, index) in 15"
            :key="index"
        >
            <div class="px-6 py-6">
                <div class="grid grid-cols-2 gap-4">
                    <p class="font-bold">Vincent</p>
                    <button
                        class="flex gap-1 items-center justify-end self-end text-primary"
                    >
                        Edit
                        <IconEdit width="15px" />
                    </button>
                    <p>West Java</p>
                    <p class="text-right">West Java 1</p>
                    <p class="col-span-2">Jl Kebembem 3 Rt.006 Rw.07</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconEdit from "@/components/icons/IconEdit.vue";

import InputSearch from "@/components/input/InputSearch.vue";

export default {
    components: { IconArrowLeft, IconEdit, InputSearch },
};
</script>

<style lang=""></style>

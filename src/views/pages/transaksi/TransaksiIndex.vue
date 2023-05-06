<template lang="">
    <header
        class="px-6 bg-primary shadow-sm flex gap-4 items-center justify-between fixed left-0 right-0 h-14 z-30"
    >
        <!-- <button
            aria-label="Back Button"
            alt="Back Button"
            @click="$router.go(-1)"
        >
            <IconArrowLeft width="30px" />
        </button> -->

        <div class="flex-1">
            <InputSearch placeholder="Search" :icon="true" classInput="py-2" />
        </div>
    </header>

    <section class="sticky top-14 z-20 text-sm bg-softGray">
        <div
            class="flex overflow-x-auto scroll-hidden border-b-4 border-solid border-darkGray"
        >
            <button class="px-2 min-w-[6rem] h-14 leading-4">
                Open Waiting
            </button>
            <button class="px-2 min-w-[6rem] h-14 leading-4">
                Open Approved
            </button>
            <button class="px-2 min-w-[6rem] h-14 leading-4">
                Open Partial
            </button>
            <button class="px-2 min-w-[6rem] h-14 leading-4">Terkirim</button>
            <button class="px-2 min-w-[6rem] h-14 leading-4">Close</button>
        </div>
    </section>

    <div class="sticky top-[7rem] z-10 bg-softGray p-4">
        <div
            class="flex gap-1 items-center justify-end"
            style="font-size: 0.7rem"
        >
            <span>Filter by date</span>
            <IconFilter />
        </div>
    </div>

    <section class="mt-9 px-4 py-4 grid gap-4 text-sm">
        <div
            class="card-container overflow-hidden"
            v-for="(item, index) in 15"
            :key="index"
        >
            <div class="px-6 py-6">
                <div class="grid grid-cols-2 gap-2">
                    <p class="font-bold">SO/123/456</p>
                    <p class="text-right">14-03-2023</p>
                    <p class="col-span-2">Vincent Valentine</p>
                    <p>Black Panther</p>
                    <p class="text-right">2000</p>
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

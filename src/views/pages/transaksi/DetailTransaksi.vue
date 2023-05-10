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

        <h2 class="flex-1 text-center font-bold text-md -ml-6">
            Detail Transaksi
        </h2>
    </header>

    <section
        class="mt-14 px-4 py-6 grid gap-3 text-sm overflow-auto scroll-hidden h-full content-start"
    >
        <div
            class="flex justify-between items-center gap-2 mb-2"
            :class="loadData ? 'card-container px-4 py-4' : ''"
        >
            <div v-if="!loadData">
                <p>Transaksi</p>
                <p>{{ data.kd_order_header }}</p>
            </div>

            <div v-if="!loadData" :style="{ color: getStatusColor }">
                <p>{{ data.status_order_desc }}</p>
            </div>

            <div v-if="loadData" class="w-32">
                <p class="skeleton p-2"></p>
                <p class="skeleton p-2"></p>
            </div>

            <div v-if="loadData" class="w-16">
                <p class="skeleton p-2"></p>
            </div>
        </div>

        <div class="card-container overlay-hidden" v-if="!loadData">
            <div class="grid gap-2 px-4 py-4">
                <article
                    class="px-4 py-2 rounded-md border border-solid border-gray"
                >
                    {{ data.nm_customer }}
                </article>
                <article
                    class="px-4 py-2 rounded-md border border-solid border-gray"
                >
                    {{ data.order_date }}
                </article>
                <article
                    class="px-4 py-2 rounded-md border border-solid border-gray"
                >
                    {{ data.keterangan }}
                </article>
            </div>
        </div>

        <div class="card-container overlay-hidden" v-if="loadData">
            <div class="grid gap-2 px-4 py-4">
                <article
                    class="px-4 py-3 rounded-md border border-solid border-gray skeleton"
                ></article>
                <article
                    class="px-4 py-3 rounded-md border border-solid border-gray skeleton"
                ></article>
                <article
                    class="px-4 py-3 rounded-md border border-solid border-gray skeleton"
                ></article>
            </div>
        </div>

        <div
            class="card-container overflow-hidden"
            v-if="data?.detail?.length && !loadData"
        >
            <div class="px-4 py-2 text-sm grid gap-2 text-right">
                <div class="flex gap-2 items-center -mb-2">
                    <div class="flex-1"></div>
                    <div class="w-14">Order</div>
                </div>
                <div
                    class="flex gap-2 items-center p-1 border-b-4 border-solid border-softGray"
                    v-for="(item, index) in data.detail"
                    :key="index"
                >
                    <div class="flex-1 text-left">{{ item.nm_benih }}</div>
                    <div class="w-14">{{ item.qty }}</div>
                </div>
            </div>
        </div>

        <div class="card-container overflow-hidden" v-if="loadData">
            <div class="px-4 py-2 text-sm grid gap-2 text-right">
                <div class="flex gap-2 items-center -mb-2">
                    <div class="flex-1"></div>
                    <div class="w-14 skeleton"></div>
                </div>
                <div
                    class="flex gap-2 items-center p-1 border-b-4 border-solid border-softGray"
                    v-for="(item, index) in 2"
                    :key="index"
                >
                    <div class="flex-1 text-left skeleton p-2"></div>
                    <div class="min-w-[5rem] skeleton p-2"></div>
                </div>
            </div>
        </div>

        <div
            class="grid grid-cols-2 gap-x-2 gap-y-4 mt-4"
            v-if="data.status_order == STATUS[0].value"
        >
            <button class="btn btn-md btn-tertiary">Batal</button>
            <button class="btn btn-md btn-secondary">Ubah</button>
        </div>

        <div
            class="grid gap-x-2 gap-y-4 mt-4"
            v-if="data.status_order == STATUS[2].value"
        >
            <button class="btn btn-md btn-secondary">Kirim</button>
        </div>
    </section>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconSearchNotFound from "@/components/icons/IconSearchNotFound.vue";

import InputSearch from "@/components/input/InputSearch.vue";

import Order from "@/apis/Order";

export default {
    data() {
        return {
            data: {},

            loadData: false,

            api: new Order(),

            STATUS: [
                {
                    key: "Open Waiting",
                    text: "Waiting",
                    value: "OP",
                    bgColor: "#9D762B",
                    color: "white",
                },
                {
                    key: "Confirmed",
                    text: "Confirmed",
                    value: "CF",
                    bgColor: "green",
                    color: "white",
                },
                {
                    key: "Open Aproved",
                    text: "Approve",
                    value: "AP",
                    bgColor: "#D2A400",
                    color: "white",
                },
                {
                    key: "Open Partial",
                    text: "Partial",
                    value: "PR",
                    bgColor: "#0093D2",
                    color: "white",
                },
                {
                    key: "Close",
                    text: "Close",
                    value: "CL",
                    bgColor: "#FAFF05",
                    color: "black",
                },
                {
                    key: "Close With Reason",
                    text: "Ditolak",
                    value: "CR",
                    bgColor: "red",
                    color: "white",
                },
            ],
        };
    },
    components: {
        IconArrowLeft,
    },
    computed: {
        getStatusColor() {
            const data = this.STATUS.find(
                (val) => val.value == this.data.status_order
            );

            if (data) {
                return data.bgColor;
            } else {
                return "#000";
            }
        },
    },
    methods: {
        async getDetailTransaksi(id) {
            try {
                this.loadData = true;
                const { data } = await this.api.getData({ id });

                this.data = data.data;
                this.loadData = false;
            } catch (error) {
                this.loadData = false;
                throw new Error(error);
            }
        },
    },
    created() {
        const { id } = this.$route.params;
        this.id = id;
    },
    mounted() {
        this.getDetailTransaksi(this.id);
    },
};
</script>

<style lang=""></style>

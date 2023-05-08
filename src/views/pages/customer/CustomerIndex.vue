<template lang="">
    <header
        class="px-4 bg-primary text-white shadow-sm flex items-center fixed left-0 right-0 h-14 z-30 mobile-width-constraint"
    >
        <h2 class="flex-1 text-center font-bold text-md">Customer</h2>
    </header>

    <div class="sticky top-14 z-10 bg-softGray p-4 flex gap-2 items-center">
        <InputSearch
            placeholder="Cari Customer"
            :icon="true"
            class="flex-1"
            @input="searchHandler"
        />

        <button @click="$router.push({ name: 'customer-create' })">
            <IconAdd />
        </button>
    </div>

    <section
        class="mt-10 px-4 py-4 grid gap-4 text-sm overflow-auto scroll-hidden"
        @scroll="scrollHandler"
    >
        <div
            class="card-container"
            v-if="!loadData"
            v-for="(item, index) in data"
            :key="index"
        >
            <div class="px-6 py-6" @click="showHandler(item)">
                <div class="grid grid-cols-2 gap-4">
                    <p class="font-bold">{{ item.nm_customer || "-" }}</p>
                    <button
                        class="flex gap-1 items-center justify-end self-end text-primary"
                        @click.self.stop="editHandler(item)"
                    >
                        Edit
                        <IconEdit width="15px" />
                    </button>
                    <p class="col-span-2">{{ item.customer_address || "-" }}</p>
                    <p>{{ item.area_operation_name || "-" }}</p>
                    <p class="text-right">{{ item.sub_area_name || "-" }}</p>
                </div>
            </div>
        </div>

        <div
            class="card-container"
            v-for="(item, index) in 5"
            :key="index"
            v-if="loadData || loadMore"
        >
            <div class="px-6 py-6">
                <div class="grid grid-cols-2 gap-4">
                    <p class="font-bold skeleton"></p>
                    <p class="font-bold skeleton"></p>
                    <p class="col-span-2 skeleton"></p>
                    <p class="skeleton"></p>
                    <p class="text-right skeleton"></p>
                </div>
            </div>
        </div>

        <div v-if="!data.length && !loadData && !loadMore">
            <p class="text-center text-darkGray text-lg mt-4">No data found.</p>
        </div>
    </section>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconAdd from "@/components/icons/IconAdd.vue";

import InputSearch from "@/components/input/InputSearch.vue";

import Customer from "@/apis/Customer";

export default {
    data() {
        return {
            page: 1,
            minPage: 5,
            totalPage: 1,
            totalData: 1,
            currentTotal: 1,

            search: "",
            timeoutSearch: null,

            loadData: false,
            loadMore: false,

            api: new Customer(),
            data: [],
        };
    },
    components: { IconArrowLeft, IconEdit, InputSearch, IconAdd },
    methods: {
        scrollHandler(e) {
            const {
                target: { scrollHeight, scrollTop, clientHeight },
            } = e;

            if (
                scrollHeight - (scrollTop + clientHeight) <= 5 &&
                !this.loadData &&
                !this.loadMore &&
                this.page < this.totalPage
            ) {
                this.loadMoreHandler();
            }
        },
        async loadMoreHandler() {
            try {
                const dataParams = { _page: ++this.page };
                const params = this.getSearchParams(dataParams, this.search);

                this.loadMore = true;
                const { data } = await this.api.getData({ params });

                this.totalPage = Math.ceil(
                    data.meta.total / data.meta.per_page
                );
                this.totalData = data.meta.total;
                this.currentTotal = data.meta.to;
                this.minPage = data.meta.per_page;

                this.setLoadMoreTimeout(data);
            } catch (error) {
                this.setLoadMoreTimeout();
                throw new ErrorHandler(error);
            }
        },
        setLoadMoreTimeout(data = [], result = false, timeout = 500) {
            setTimeout(() => {
                this.data = [...this.data, ...data.data];

                this.loadMore = result;
            }, timeout);
        },

        showHandler(item) {
            this.$router.push({
                name: "customer-show",
                params: { id: item.kd_customer },
            });
        },
        editHandler(item) {
            this.$router.push({
                name: "customer-edit",
                params: { id: item.kd_customer },
            });
        },

        searchHandler(e) {
            const value = e.target.value;
            clearTimeout(this.timeoutSearch);
            this.timeoutSearch = setTimeout(() => {
                this.searchDataHandler(value);
            }, 250);
        },
        searchDataHandler(value) {
            const params = this.getSearchParams(null, value);
            this.getDataIndex(params);
        },
        loadDataIndex(data) {
            const params = this.getSearchParams(data);
            this.getDataIndex(params);
        },
        setLoadDataTimeout(result = false, timeout = 250) {
            setTimeout(() => {
                this.loadData = result;
            }, timeout);
        },
        getSearchParams(data, search = "") {
            const page = {
                page: data?._page || 1,
                per_page: data?._minPage || this.minPage,
                search,
            };

            const params = Object.assign({}, page);
            return params;
        },
        async getDataIndex(params) {
            try {
                this.data = [];
                this.loadData = true;
                const { data } = await this.api.getData({ params });

                this.data = data.data;

                this.totalPage = Math.ceil(
                    data.meta.total / data.meta.per_page
                );
                this.totalData = data.meta.total;
                this.currentTotal = data.meta.to;
                this.minPage = data.meta.per_page;

                this.setLoadDataTimeout();
            } catch (error) {
                this.setLoadDataTimeout();
                throw new ErrorHandler(error);
            }
        },
    },
    mounted() {
        this.loadDataIndex();
    },
};
</script>

<style lang=""></style>

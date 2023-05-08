<template lang="">
    <header
        class="px-6 bg-primary shadow-sm flex items-center fixed left-0 right-0 h-14 z-30 mobile-width-constraint"
    >
        <div class="flex-1">
            <InputSearch
                placeholder="Search"
                :icon="true"
                classInput="py-2"
                @input="searchHandler"
            />
        </div>
    </header>

    <section class="sticky top-14 z-20 text-sm bg-white">
        <div
            class="flex overflow-x-auto scroll-hidden relative"
            id="tab-container"
        >
            <span
                class="h-1 w-[6rem] block absolute bottom-0 z-20 transition-all"
                :style="{
                    transform: `translateX(${activeTab * 100}%)`,
                    background: borderColor,
                }"
            ></span>
            <button
                class="px-2 min-w-[6rem] h-14 leading-4 transition-all outline-none"
                v-for="(item, index) in STATUS"
                :key="index"
                @click="tabHandler(index, item)"
            >
                {{ item.key }}
            </button>
        </div>
        <hr class="absolute bottom-0 h-1 w-full border-none bg-gray" />
    </section>

    <div class="sticky top-[7rem] z-10 bg-softGray p-4">
        <div class="flex justify-end" style="font-size: 0.7rem">
            <button class="flex gap-1 items-center">
                <span>Filter by date</span>
                <IconFilter />
            </button>
        </div>
    </div>

    <section
        class="mt-10 px-4 py-4 grid gap-4 text-sm overflow-auto scroll-hidden"
        id="slide-container"
        @scroll="scrollHandler"
    >
        <div
            class="card-container overflow-hidden"
            v-for="(item, index) in data"
            :key="index"
        >
            <div class="px-4 py-4 text-sm">
                <div class="flex justify-end mb-2">
                    <span
                        class="px-4 border border-gray border-solid rounded-md text-white"
                        :style="{
                            fontSize: '0.7rem',
                            background: borderColor,
                            color: STATUS[activeTab].color,
                        }"
                        >{{ item.status_order_desc }}</span
                    >
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <p class="font-bold">{{ item.kd_order_header }}</p>
                    <p class="text-right">{{ item.order_date }}</p>
                    <p class="col-span-2">{{ item.nm_customer }}</p>
                    <p>{{ item.highest_order["nm_benih,"] }}</p>
                    <p class="text-right">
                        {{ item.highest_order.qty_formatted }}
                    </p>
                </div>
            </div>
        </div>

        <div
            class="card-container overflow-hidden"
            v-for="(item, index) in 5"
            v-if="loadData || loadMore"
            :key="index"
        >
            <div class="px-6 py-6">
                <div class="flex justify-end mb-2">
                    <p class="skeleton max-w-[10rem]"></p>
                </div>
                <div class="grid grid-cols-2 gap-y-2 gap-x-6">
                    <p class="font-bold skeleton"></p>
                    <p class="text-right skeleton"></p>
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
import IconFilter from "@/components/icons/IconFilter.vue";

import InputSearch from "@/components/input/InputSearch.vue";

import Order from "@/apis/Order";

export default {
    data() {
        return {
            page: 1,
            minPage: 10,
            totalPage: 1,
            totalData: 1,
            currentTotal: 1,

            search: "",
            timeoutSearch: null,

            loadData: false,
            loadMore: false,

            api: new Order(),
            data: [],

            activeTab: null,
            borderColor: "",

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
    components: { IconArrowLeft, IconEdit, IconFilter, InputSearch },
    watch: {},
    methods: {
        tabHandler(index, item) {
            this.activeTab = index;
            this.borderColor = item.bgColor;
            this.loadDataIndex();

            const tabContainer = document.getElementById("tab-container");
            tabContainer.scrollTo({
                behavior: "smooth",
                left: 96 * index,
            });
        },

        scrollHandler(e) {
            const {
                target: { scrollHeight, scrollTop, clientHeight },
            } = e;

            if (
                scrollHeight - (scrollTop + clientHeight) <= 5 &&
                !this.loadData &&
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

                this.data = [...this.data, ...data.data];

                this.totalPage = Math.ceil(
                    data.meta.total / data.meta.per_page
                );
                this.totalData = data.meta.total;
                this.currentTotal = data.meta.to;
                this.minPage = data.meta.per_page;

                this.loadMore = false;
            } catch (error) {
                this.loadMore = false;
                throw new ErrorHandler(error);
            }
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
        getSearchParams(data, search = "") {
            const page = {
                page: data?._page || 1,
                per_page: data?._minPage || this.minPage,
                status: this.STATUS[this.activeTab].value,
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

                this.loadData = false;
            } catch (error) {
                this.loadData = false;
                throw new ErrorHandler(error);
            }
        },

        addSlideListener(contentContainer, callback) {
            contentContainer.addEventListener(
                "touchstart",
                (e) =>
                    (this.start = {
                        clientX: e.changedTouches[0].clientX,
                        timeStamp: e.timeStamp,
                    })
            );

            contentContainer.addEventListener("touchmove", (e) => {
                const result = e.changedTouches[0].clientX - this.start.clientX;
                contentContainer.style.transition = "none";
                contentContainer.style.transform = `translateX(${
                    result / 5
                }px)`;
            });

            contentContainer.addEventListener("touchend", (e) => {
                this.end = {
                    clientX: e.changedTouches[0].clientX,
                    timeStamp: e.timeStamp,
                };

                contentContainer.style.transition = `all .2s ease`;
                contentContainer.style.transform = `none`;

                callback(this.start, this.end);
            });
        },
        slideHandler(start, end) {
            let active = this.activeTab;

            const { clientX: startClientX, timeStamp: startTimeStamp } = start;
            const { clientX: endClientX, timeStamp: endTimeStamp } = end;

            if (
                endClientX - startClientX > 50 &&
                endTimeStamp - startTimeStamp < 500
            ) {
                if (active > 0) {
                    const currentActive = active - 1;
                    this.tabHandler(currentActive, this.STATUS[currentActive]);
                }
            } else if (
                startClientX - endClientX > 50 &&
                endTimeStamp - startTimeStamp < 500
            ) {
                if (active < this.STATUS.length - 1) {
                    const currentActive = active + 1;
                    this.tabHandler(currentActive, this.STATUS[currentActive]);
                }
            }
        },
    },
    created() {
        this.borderColor = this.STATUS[0].bgColor;
        this.activeTab = 0;
    },
    mounted() {
        const contentContainer = document.getElementById("slide-container");
        this.addSlideListener(contentContainer, this.slideHandler);

        this.loadDataIndex();
    },
};
</script>

<style lang=""></style>

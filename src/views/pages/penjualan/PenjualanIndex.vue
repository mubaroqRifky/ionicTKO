<template lang="">
    <header
        class="px-4 bg-primary text-white shadow-sm flex items-center fixed left-0 right-0 h-14 z-30 mobile-width-constraint"
    >
        <button aria-label="Back Button" alt="Back Button" @click="backHandler">
            <IconArrowLeft width="30px" />
        </button>

        <h2
            class="flex-1 text-center font-bold text-md"
            :class="page_show != PAGE_SHOW.FORM ? '-ml-6' : ''"
        >
            {{ getTitle }}
        </h2>
    </header>

    <section
        class="mt-14 px-4 py-7 overflow-auto scroll-hidden"
        v-if="page_show == PAGE_SHOW.FORM"
    >
        <div class="grid gap-5">
            <CustomSelect
                dir="col"
                :api="api_customer"
                class="lg:w-3/4"
                :reduce="(val) => ({ selected: val.kd_customer, data: val })"
                :createOption="
                    (val) => ({
                        text: `${val.kd_customer} | ${val.nm_customer}${
                            val.area_operation_name
                                ? ' | ' + val.area_operation_name
                                : ''
                        }`,
                        ...val,
                    })
                "
                label_option="text"
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
                :disabled="loading || loadData"
                :value="form.nama_petani"
                :validity="errors.nama_petani"
                @inputs="(val) => inputHandler(val, 'nama_petani')"
            />
            <CustomInput
                placeholder="Tanggal Delivery"
                type="date"
                required
                :disabled="loading || loadData"
                :value="form.tgl_delivery"
                :validity="errors.tgl_delivery"
                @inputs="(val) => inputDateHandler(val, 'tgl_delivery')"
            />
            <CustomInput
                placeholder="Alamat Pengiriman"
                type="textarea"
                required
                :disabled="loading || loadData"
                :value="form.delivery_address"
                :validity="errors.delivery_address"
                @inputs="(val) => inputHandler(val, 'delivery_address')"
            />
            <CustomInput
                placeholder="Keterangan"
                type="textarea"
                required
                :disabled="loading || loadData"
                :value="form.keterangan"
                :validity="errors.keterangan"
                @inputs="(val) => inputHandler(val, 'keterangan')"
            />
        </div>

        <div class="grid mt-5">
            <button
                class="btn btn-secondary"
                @click="pageHandler(PAGE_SHOW.SELECTION)"
            >
                Lanjutkan
            </button>
        </div>
    </section>

    <div
        class="sticky top-14 z-10 bg-softGray p-4"
        v-if="page_show == PAGE_SHOW.SELECTION"
    >
        <InputSearch placeholder="Search" :icon="true" @input="searchHandler" />

        <div class="flex justify-end mt-4" style="font-size: 0.7rem">
            <button class="flex gap-1 items-center">
                <span>Filter by date</span>
                <IconFilter />
            </button>
        </div>
    </div>

    <section
        class="mt-14 px-4 pb-28 pt-2 overflow-auto scroll-hidden"
        :class="!details.length ? 'min-h-full' : ''"
        @scroll="scrollHandler"
        v-if="page_show == PAGE_SHOW.SELECTION"
    >
        <div class="grid grid-cols-2 gap-x-4 gap-y-6">
            <div
                class="grid gap-2"
                v-if="!loadData"
                v-for="(item, index) in details"
                :key="index"
            >
                <div class="card-container overlay-hidden px-3 py-3 grid gap-4">
                    <div class="font-bold text-center text-xs">
                        <div
                            class="w-full h-32 bg-gray mb-2 rounded-xl overflow-hidden object-contain flex justify-center items-center"
                        >
                            <img
                                v-if="item.image"
                                :src="item.image"
                                :alt="item.nm_benih"
                                class="w-full h-full object-contain overflow-hidden rounded-xl"
                            />
                        </div>
                        <h3 class="mb-2">
                            {{ `${item.nm_benih} - ${item.kd_benih}` }}
                        </h3>
                        <div style="font-size: 0.7rem">
                            <p>{{ item.size || "-" }}</p>
                            <p>{{ `${item.price}/${item.unit}` }}</p>
                        </div>
                    </div>
                </div>

                <div
                    class="flex justify-between items-center gap-2 bg-primary rounded-md px-4 text-white"
                >
                    <button
                        class="font-bold text-lg w-4"
                        @click="qtyHandler(item, 'minus')"
                    >
                        -
                    </button>
                    <input
                        class="w-full bg-primary outline-none border-none text-center"
                        type="number"
                        v-model="form_detail[item.kd_benih][0]"
                    />
                    <button
                        class="font-bold text-lg w-4"
                        @click="qtyHandler(item, 'plus')"
                    >
                        +
                    </button>
                </div>
            </div>

            <div
                class="grid gap-2"
                v-if="loadData || loadMore"
                v-for="(item, index) in 6"
                :key="index"
            >
                <div class="card-container overlay-hidden px-3 py-3 grid gap-4">
                    <div class="font-bold text-center text-xs">
                        <div
                            class="w-full h-32 bg-gray mb-2 rounded-lg overflow-hidden object-contain flex justify-center items-center skeleton"
                        ></div>
                        <h3 class="mb-2 text-sm skeleton"></h3>
                        <p class="skeleton"></p>
                        <p class="skeleton"></p>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="flex flex-col justify-center text-darkGray h-full -mt-[30%]"
            v-if="!details.length && !loadData && !loadMore"
        >
            <div class="flex flex-col justify-center items-center gap-2">
                <IconSearchNotFound width="100px" />
                <p class="text-center text-base">No data found.</p>
            </div>
        </div>

        <div
            class="grid mt-5 fixed bottom-0 left-0 right-0 p-4 bg-white outline-none border-gray border-t-2 border-solid"
        >
            <button
                class="btn btn-secondary"
                :disabled="canGoToDetail"
                @click="pageHandler(PAGE_SHOW.DETAILS)"
            >
                Lanjutkan
            </button>
        </div>
    </section>

    <section
        class="mt-14 px-4 py-7 overflow-auto scroll-hidden grid gap-4"
        v-if="page_show == PAGE_SHOW.DETAILS"
    >
        <div class="card-container overflow-hidden">
            <div class="px-4 py-4 text-sm grid gap-4">
                <CustomInput
                    placeholder="Pilih Customer"
                    :value="nm_customer"
                    :disabled="true"
                />
                <CustomInput
                    placeholder="Nama Petani"
                    :value="form.nama_petani"
                    :disabled="true"
                />
                <CustomInput
                    placeholder="Tanggal Delivery"
                    type="date"
                    :value="form.tgl_delivery"
                    :disabled="true"
                />
            </div>
        </div>

        <div class="card-container overflow-hidden">
            <div class="px-3 py-3 text-xs grid gap-2 text-right">
                <div class="flex gap-2 items-center">
                    <div class="flex-1"></div>
                    <div class="w-14">Order</div>
                    <div class="w-24">Harga</div>
                </div>
                <div
                    class="flex gap-2 items-center border border-solid border-gray-dark rounded-md p-1"
                    style="font-size: 0.7rem"
                    v-for="(item, index) in Object.values(form_detail).filter(
                        (val) => val[0] > 0
                    )"
                    :key="index"
                >
                    <div class="flex-1 text-left">{{ item[2] }}</div>
                    <div class="w-14">{{ item[0] }}</div>
                    <div class="w-24">Rp {{ item[1] }}</div>
                </div>
                <div class="flex flex-col justify-end mt-2">
                    <span>Harga Total</span>
                    <p class="font-bold">Rp. {{ hagaTotal }}</p>
                </div>
            </div>
        </div>

        <div class="grid mt-5">
            <button class="btn btn-secondary" @click="prosesHandler">
                Simpan
            </button>
        </div>
    </section>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconFilter from "@/components/icons/IconFilter.vue";
import IconSearchNotFound from "@/components/icons/IconSearchNotFound.vue";

import CustomInput from "@/components/input/CustomInput.vue";

import InputValidation from "@/controllers/state/InputValidation";
import Modal from "@/controllers/state/Modal";
import Loading from "@/controllers/state/Loading";

import Customer from "@/apis/Customer";
import Order from "@/apis/Order";

import moment from "moment";

export default {
    data() {
        return {
            page: 1,
            minPage: 6,
            totalPage: 1,
            totalData: 1,
            currentTotal: 1,

            search: "",
            timeoutSearch: null,

            loadData: false,
            loadMore: false,

            api_customer: new Customer(),
            api: new Order(),

            form: {
                kd_customer: "",
                nama_petani: "",
                tgl_delivery: "",
                delivery_address: "",
                keterangan: "",
            },
            form_detail: {},
            errors: {},
            nm_customer: "",

            details: [],

            page_show: "",
            PAGE_SHOW: {
                FORM: "form",
                SELECTION: "selection",
                DETAILS: "details",
            },
        };
    },
    components: { IconArrowLeft, IconFilter, IconSearchNotFound, CustomInput },
    watch: {
        getErrorsState(newValue) {
            this.errors = newValue;
        },
    },
    computed: {
        loading() {
            return Loading.get();
        },
        getErrorsState() {
            return InputValidation.get();
        },
        getTitle() {
            switch (this.page_show) {
                case this.PAGE_SHOW.FORM:
                    return "Penjualan";
                case this.PAGE_SHOW.SELECTION:
                    return "Pilih Item";
                case this.PAGE_SHOW.DETAILS:
                    return "Konfirmasi";
                default:
            }
        },
        canGoToDetail() {
            const formDetailArray = Object.values(this.form_detail);
            return !formDetailArray.some((val) => val[0] > 0);
        },
        hagaTotal() {
            return Object.values(this.form_detail).reduce((prev, curr) => {
                const [qty, price] = curr;
                if (qty > 0) {
                    return qty * price;
                } else {
                    return prev;
                }
            }, 0);
        },
    },
    methods: {
        qtyHandler(item, type) {
            // value, harga
            if (type == "plus") {
                this.form_detail[item.kd_benih][0]++;
                this.form_detail[item.kd_benih][1] = item.price;
                this.form_detail[item.kd_benih][2] = item.nm_benih;
            } else {
                this.form_detail[item.kd_benih][0]--;
                this.form_detail[item.kd_benih][1] = item.price;
                this.form_detail[item.kd_benih][2] = item.nm_benih;
            }

            console.log(this.form_detail, "form qty");
        },
        inputHandler(val, key) {
            this.form[key] = val;
        },
        inputDateHandler(date, key) {
            const result = moment(date).format("YYYY-MM-DD");

            this.form[key] = result;
        },
        async selectSearchHandler({ selected, data }, key) {
            try {
                this.form[key] = selected || "";
                if (key == "kd_customer") {
                    this.nm_customer = data?.nm_customer || "";
                }
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },

        backHandler() {
            const pageQueue = [
                this.PAGE_SHOW.FORM,
                this.PAGE_SHOW.SELECTION,
                this.PAGE_SHOW.DETAILS,
            ];

            const findIndex = pageQueue.findIndex(
                (val) => val == this.page_show
            );
            if (findIndex > 0) {
                this.pageHandler(pageQueue[findIndex - 1]);
            } else {
                this.$router.go(-1);
            }
        },
        pageHandler(show) {
            switch (show) {
                case this.PAGE_SHOW.FORM:
                    break;
                case this.PAGE_SHOW.SELECTION:
                    this.loadDataBenih();
                    break;
                case this.PAGE_SHOW.DETAILS:
                    if (!Object.keys(this.form_detail).length) return;
                    break;
                default:
                    break;
            }

            this.page_show = show;
        },

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
                const { data } = await this.api.getData({
                    id: "benih",
                    params,
                });

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
                this.details = [...this.details, ...data.data];
                this.defineForm(this.details);

                this.loadMore = result;
            }, timeout);
        },

        searchHandler(e) {
            const value = e.target.value || "";
            this.search = value;
            this.page = 1;
            this.details = [];

            clearTimeout(this.timeoutSearch);
            this.timeoutSearch = setTimeout(() => {
                this.searchDataHandler(value);
            }, 250);
        },
        searchDataHandler(value) {
            const params = this.getSearchParams(null, value);
            this.getDataBenih(params);
        },
        loadDataBenih(data) {
            const params = this.getSearchParams(data);
            this.getDataBenih(params);
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
        async getDataBenih(params) {
            try {
                this.details = [];
                this.loadData = true;
                const { data } = await this.api.getData({
                    id: "benih",
                    params,
                });

                this.details = data.data;
                this.defineForm(this.details);

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

        defineForm(data) {
            data.forEach((val) => {
                if (!this.form_detail[val.kd_benih]) {
                    this.form_detail[val.kd_benih] = [0];
                }
            });
        },

        prosesHandler() {
            Modal.confirm("Yakin ingin simpan data?");
            Modal.onconfirm = this.submitData;
        },
        async submitData() {
            try {
                Loading.start();

                const detail = [];
                for (const key in this.form_detail) {
                    if (this.form_detail[key][0] > 0) {
                        detail.push({
                            kd_benih: key,
                            qty: this.form_detail[key][0],
                        });
                    }
                }

                this.form.detail = detail;
                const { data } = await this.api.postData(this.form);
                Modal.success(data.message);
                Modal.onclose = () => {
                    this.$router.replace({ name: "home" });
                };
                Loading.stop();
            } catch (error) {
                Loading.stop();
                Modal.close();
                if (
                    error.response.data.data.exception == "ValidationException"
                ) {
                    this.pageHandler(this.PAGE_SHOW.FORM);
                }
                throw new ErrorHandler(error);
            }
        },
    },
    created() {
        this.page_show = this.PAGE_SHOW.FORM;
    },
};
</script>

<style lang=""></style>

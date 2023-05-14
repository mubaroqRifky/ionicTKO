<template lang="">
    <section
        class="flex flex-col gap-4 pb-6 overflow-hidden"
        :class="className"
    >
        <div
            class="flex flex-col-reverse md:flex-row gap-4 justify-between items-start md:items-center"
            v-if="selection || search"
        >
            <SelectMinPage
                v-if="selection"
                :values="[5, 10, 50, 100]"
                :minPage="paginate._minPage"
                :totalData="paginate._totalData"
                :currentTotal="paginate._currentTotal"
                @select="minPageHandler"
            />

            <InputSearch
                v-if="search"
                class="w-full md:w-auto"
                :placeholder="`Search ${content}`"
                classInput="px-4 py-2 text-xs  min-w-[12rem]"
                :clearable="true"
                @search="(value) => $emit('search', value)"
                @clear="(value) => $emit('search', '')"
            />
        </div>

        <div class="overflow-x-auto">
            <table class="w-full custom" :class="tableClass">
                <thead
                    class="text-white font-bold text-left text-xs"
                    :class="theadClass"
                >
                    <tr
                        class="bg-primary rounded-bl-none rounded-br-none"
                        :class="rowClass"
                        style="background: #c40001 !important"
                    >
                        <th
                            :style="{
                                width: /checklist/gi.test(item)
                                    ? '60px'
                                    : width || '100%',
                            }"
                            class="p-4 bg-primary whitespace-nowrap w-full text-center text-white"
                            :class="
                                index == '0'
                                    ? 'rounded-tl-xl '
                                    : index == fields.length - 1
                                    ? 'rounded-tr-xl '
                                    : ''
                            "
                            v-for="(item, index) in fields"
                            :key="index"
                            @click="sortHandler(item)"
                            v-html="
                                item && typeof item == 'string'
                                    ? /checklist/gi.test(item)
                                        ? `
                                        <input type='checkbox' value='all' onchange='selectAllHandler(this)' />
                                        `
                                        : item
                                    : item.text
                            "
                        ></th>
                    </tr>
                </thead>

                <tbody class="text-xs" :class="tbodyClass">
                    <tr
                        v-for="(item, index) in paginate._dataTableShow"
                        v-if="showData"
                        :key="index"
                        :class="rowClass"
                        @click="$emit('checked', item)"
                    >
                        <slot
                            name="checklist"
                            :value="item.id"
                            :index="index"
                            :item="item"
                        ></slot>

                        <td
                            class="text-center"
                            v-if="fields[0] == '#'"
                            :style="{ width: width || '100%' }"
                        >
                            {{ index + 1 }}
                        </td>

                        <slot
                            v-for="(val, i) in data_show"
                            :keys="typeof val == 'string' ? val : val.field"
                            :value="getValue(val, item)"
                            :col="i"
                            :name="`data`"
                            :index="index"
                            :item="item"
                            :field="val.field"
                        ></slot>

                        <slot name="actions" :item="item" :index="index"></slot>
                    </tr>

                    <tr
                        v-if="showSkeleton"
                        v-for="(item, index) in minPage"
                        :key="index"
                        class="loading"
                        :class="rowClass"
                    >
                        <td
                            v-for="(item, idx) in fields"
                            :key="idx"
                            class="px-4 py-1 align-middle flex-1"
                        >
                            <p class="skeleton mt-2"></p>
                        </td>
                    </tr>

                    <tr v-if="showNoData" :class="noDataClass">
                        <td :colspan="fields.length">
                            <p>No Records Found.</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <CustomPaginate
            v-if="items.length && paging"
            :theme="theme"
            :page="paginate._page"
            :minPage="paginate._minPage"
            :totalPage="paginate._totalPage"
            :totalData="paginate._totalData"
            :currentTotal="paginate._currentTotal"
            @paging="paginateHandler"
        />
    </section>
</template>
<script>
import Paginate from "vuejs-paginate-next";
import PaginateHelper from "@/helpers/Paginate";

import SelectMinPage from "./SelectMinPage.vue";
import CustomPaginate from "./CustomPaginate.vue";
// import NoDataInTable from "./NoDataInTable.vue";

import { format } from "date-fns";

export default {
    data() {
        return {
            sort: [],
            data: this.items,
            paginate: new PaginateHelper({
                minPage: this.minPage,
                method: this.mode,
            }),
        };
    },
    props: {
        content: "",
        mode: {
            type: String,
            default: "client",
        },
        fields: {
            type: Array,
            required: false,
            default: function () {
                return [];
            },
        },
        items: {
            type: Array,
            required: false,
            default: function () {
                return [];
            },
        },
        meta: {
            type: Object,
            required: false,
            default: function () {
                return {};
            },
        },
        load: {
            type: Boolean,
            required: false,
            default: false,
        },
        search: {
            type: Boolean,
            required: false,
            default: true,
        },
        selection: {
            type: Boolean,
            required: false,
            default: true,
        },
        paging: {
            type: Boolean,
            required: false,
            default: true,
        },
        minPage: {
            default: 5,
        },

        theme: {
            default: "blue",
        },
        width: {
            default: "",
        },
        className: {
            default: "",
        },
        tableClass: {
            default: "min-w-[60rem]",
        },
        theadClass: {
            default: "",
        },
        tbodyClass: {
            default: "",
        },
        rowClass: {
            default: "text-gray-dark",
        },
        noDataClass: {
            default: "text-gray-dark nodata",
        },
    },
    components: {
        Paginate,
        CustomPaginate,
        SelectMinPage,
        // NoDataInTable,
    },
    watch: {
        items(newVal, oldVal) {
            this.data = newVal;
            this.paginate.getDataTable(this.data);
        },
        meta(newVal, oldVal) {
            this.paginate.setTotalData(newVal.total);
            this.paginate.setTotalPage(newVal.total, newVal.per_page);
            this.paginate._currentTotal = newVal.to;
            this.paginate._page = newVal.current_page;
            this.paginate._minPage = newVal.per_page;
        },
        load(newValue) {
            this.paginate.loading = newValue;
        },
        showSkeleton() {},
        showNoData() {},
    },
    computed: {
        showTheData() {
            return this.paginate._dataTableShow;
        },
        data_show() {
            return this.fields.filter((val) => {
                return (
                    val &&
                    !/action/gi.test(val) &&
                    !/action/gi.test(val.field) &&
                    !/checklist/gi.test(val) &&
                    !/#/gi.test(val)
                );
            });
        },
        showData() {
            return !this.paginate.loading && !this.load;
        },
        showSkeleton() {
            return this.paginate.loading || this.load;
        },
        showNoData() {
            return !this.items.length && !this.paginate.loading && !this.load;
        },
    },
    methods: {
        selectAllHandler(el) {
            const table = el?.offsetParent?.offsetParent;
            const inputsCheck = table.querySelectorAll(
                'tbody input[type="checkbox"]'
            );

            if (el.checked && table) {
                inputsCheck.forEach((val) => {
                    if (!val.checked) val.click();
                });
            } else {
                inputsCheck.forEach((val) => {
                    if (val.checked) val.click();
                });
            }
        },
        paginateHandler(page) {
            this.paginate.loading = true;
            setTimeout(() => {
                this.paginate.paginateHandler(page);
                this.paginate.loading = false;
            }, 200);
        },
        minPageHandler(value) {
            this.paginate.loading = true;
            setTimeout(() => {
                this.paginate.minPageHandler(value);
                this.paginate.loading = false;
            }, 200);
        },
        getFieldSorted(value) {
            const index = this.sort.findIndex((val) => val.key == value);
            if (index >= 0) {
                if (this.sort[index].sort == "ASC") {
                    this.sort[index].sort = "DESC";
                } else {
                    this.sort.splice(index, 1);
                }
            } else {
                this.sort.push({ key: value, sort: "ASC" });
            }

            return this.sort;
        },
        sortHandler(item) {
            const value = typeof item == "string" ? item : item.field;

            if (/action/gi.test(value) || /checklist/gi.test(value)) return;

            const sort = this.getFieldSorted(value);

            this.$emit("sort", sort);
        },
        getValue(val, item) {
            return typeof val == "string"
                ? item[val]
                : this.getField(val, item);
        },
        getField(val, item) {
            if (val.field.match(/\./)) {
                const attr = val.field.split(".");
                return this.getDeepAttr(attr, item);
            } else {
                return val.type == "date"
                    ? format(item[val.field], "DD-MM-YYYY")
                    : item[val.field];
            }
        },
        getDeepAttr(arr, item) {
            const firstAttr = arr.shift();

            if (!firstAttr && typeof item == "object") return item;

            if (item[firstAttr] == undefined || item[firstAttr] == null)
                return "";

            if (typeof item[firstAttr] != "object") return item[firstAttr];

            return this.getDeepAttr(arr, item[firstAttr]);
        },
    },
    created() {
        this.paginate.getDataTable(this.data);
        window.selectAllHandler = this.selectAllHandler;
    },
    mounted() {
        if (this.mode == "server") {
            this.paginate.refreshDataServer = () => {
                this.$emit("page", this.paginate);
            };
        }
    },
    updated() {},
};
</script>
<style lang="scss">
table.custom {
    tbody {
        tr {
            @apply hover:bg-softGray cursor-pointer;

            &:not(:last-child) {
                @apply border-solid;
            }

            &.nodata,
            &.loading {
                @apply cursor-default;
            }

            &.nodata {
                td {
                    @apply px-6 py-2 rounded-br-xl rounded-bl-xl overflow-hidden;
                }
            }
        }

        td {
            @apply px-4 py-2 align-middle;
        }
    }
}
</style>

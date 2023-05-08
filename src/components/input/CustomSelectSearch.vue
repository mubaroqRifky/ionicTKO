<template lang="">
    <div class="">
        <label
            class="label-container"
            :class="dir == 'row' ? 'grid md:flex gap-2 md:gap-4' : 'grid gap-1'"
        >
            <span
                class="whitespace-normal text-xs mt-1"
                :class="spanClass"
                v-if="label"
            >
                {{ label }}
                <i v-if="required" class="text-danger">*</i>
            </span>

            <div
                class="w-full relative input-wrapper flex-1"
                :class="[
                    required && validity.message
                        ? 'danger focus-error'
                        : 'primary focus-primary',
                    '',
                ]"
            >
                <input
                    type="text"
                    :class="[
                        gundul ? 'input-border' : 'input-base',
                        classContainer,
                    ]"
                    style="padding-right: 2.5rem"
                    :placeholder="placeholder"
                    :required="required"
                    :disabled="disabled"
                    v-model="input_value"
                    @focus="focusInputHandler"
                    @blur="blurInputHandler"
                    @input="typeInputHandler"
                />

                <IconClose
                    v-if="input_value"
                    className="absolute text-darkGray right-5 top-1/2 -translate-y-1/2 z-10 mr-2.5"
                    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
                    @click.stop="!disabled && clearInputHandler"
                    :bold="true"
                />

                <IconArrow
                    className="absolute text-darkGray right-2 top-1/2 -translate-y-1/2 z-10 transform transition-all"
                    :class="[
                        list_input ? 'rotate-180' : 'rotate-0',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                    ]"
                    :bold="true"
                />

                <span
                    class="absolute right-1 transform z-10 icon-error top-1/2 -translate-y-1/2"
                    :class="[disabled ? 'bg-softGray' : 'bg-white']"
                    v-if="required && validity.message"
                >
                    <IconInputError
                        className="text-danger "
                        width="20px"
                        height="20px"
                    />

                    <p
                        class="text-danger text-xs absolute hidden input-tooltip"
                    >
                        {{ validity.message }}
                    </p>
                </span>

                <ul
                    v-show="list_input"
                    class="bg-white max-h-40 overflow-auto text-sm rounded-b-md shadow-md absolute z-20 top-full left-0 right-0"
                    :class="list_input ? 'list_open' : ''"
                    @scroll="scrollHandler"
                >
                    <li
                        v-for="(item, index) in getOptionsCreate"
                        :key="index"
                        @click.stop="selectInputHandler(item)"
                    >
                        <p
                            class="block focus:outline-none focus:bg-success focus:text-white p-2 cursor-pointer hover:bg-lightGray hover:text-gray-dark"
                            :class="
                                this.input_value == item[label_option]
                                    ? 'bg-success text-white selected'
                                    : ''
                            "
                            @focus="listFocus"
                        >
                            {{ item[label_option] }}
                        </p>
                    </li>

                    <li
                        v-if="loadInput"
                        class="p-2 hover:bg-lightGray"
                        v-for="(item, i) in 5"
                        :key="i"
                    >
                        <p class="skeleton"></p>
                    </li>

                    <p v-if="!options_list.length && !loadInput" class="p-2">
                        Tidak ada data
                    </p>
                </ul>
            </div>
        </label>
    </div>
</template>

<script>
import IconClose from "@/components/icons/IconClose.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import IconInputError from "@/components/icons/IconInputError.vue";

export default {
    data() {
        return {
            input_value: "",
            list_input: false,
            options_list: [],
            list_selected: [],
            search_timeout: null,
            selected: false,
            meta_input: {},
            loadInput: false,
            firstInit: false,
        };
    },
    components: { IconClose, IconInputError, IconArrow },
    props: {
        api: {
            type: Object,
            default: function () {
                return {};
            },
            required: true,
        },
        params: {
            type: Object,
            default: function () {
                return {};
            },
        },
        createOption: {
            type: Function,
            default: function (option) {
                return option;
            },
        },
        reduce: {
            type: Function,
            default: function (option) {
                return option.id;
            },
        },
        dir: {
            default: "row",
        },
        label_option: {
            default: "text",
        },
        placeholder: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        required: {
            default: false,
        },
        disabled: {
            default: false,
        },
        gundul: {
            type: Boolean,
            default: false,
        },
        validity: {
            default: function () {
                return {};
            },
        },
        value: {
            default: "",
        },
        spanClass: {
            default: "w-full md:w-44",
        },
        classContainer: {
            default: "border-gray-dark",
        },
    },
    computed: {
        getOptionsCreate() {
            return this.options_list.map(this.createOption);
        },
    },
    watch: {
        async value(newValue) {
            if (newValue && !this.selected) {
                this.firstInit = true;
                await this.searchInputDataHandler(newValue);

                const [hasil] = this.getOptionsCreate;
                this.selectInputHandler(hasil);
            }
        },
    },
    methods: {
        getListSelected(lists) {
            return lists.map(this.reduce);
        },
        listFocus() {
            clearTimeout(this.search_timeout);
        },
        selectInputHandler(item) {
            if (!item) {
                this.selected = false;
                this.list_selected = [];
                this.input_value = "";
                this.$emit("select", "");
                return;
            }

            this.selected = true;
            this.list_selected = [item];
            this.input_value = item[this.label_option];
            this.list_input = false;

            if (!this.firstInit) {
                const hasil = this.getListSelected(this.list_selected);
                this.$emit("select", hasil[0]);
            } else {
                this.firstInit = false;
            }
        },
        scrollHandler(e) {
            const { target } = e;
            const { scrollHeight, clientHeight, scrollTop } = target;

            if (
                scrollHeight - clientHeight - scrollTop <= 1 &&
                !this.loadInput
            ) {
                if (this.meta_input.current_page >= this.meta_input.last_page)
                    return;

                const data = {
                    _page: ++this.meta_input.current_page,
                };

                this.loadInputDataIndex(data, this.input_value);
            }
        },
        clearInputHandler() {
            this.input_value = "";
            this.list_selected = [];
            this.isClear = true;
            setTimeout(() => {
                this.isClear = false;
            }, 120);
            this.$emit("select", "");
        },
        scrollFocus() {
            if (this.selected) {
                setTimeout(() => {
                    const container = document.querySelector(".list_open");
                    const listActive = container.querySelector(".selected");

                    if (container && listActive) {
                        container.scrollTo({
                            behavior: "smooth",
                            top: listActive.offsetTop,
                        });
                    }
                }, 0);
            }
        },
        focusInputHandler() {
            this.scrollFocus();

            if (this.options_list.length) {
                this.list_input = true;
            }

            if (this.input_value == "") {
                this.list_input = true;
                this.searchInputDataHandler("");
            }
        },
        blurInputHandler() {
            clearTimeout(this.search_timeout);
            this.search_timeout = setTimeout(() => {
                if (!this.isClear) {
                    this.list_input = false;
                }
                if (!this.selected) this.selectInputHandler();
            }, 120);
        },

        async typeInputHandler(e) {
            const { target } = e;
            this.selected = false;

            if (!this.selected) {
                clearTimeout(this.search_timeout);
                this.search_timeout = setTimeout(() => {
                    this.searchInputDataHandler(target.value);
                }, 250);
            }
        },
        async searchInputDataHandler(value) {
            const params = this.getInputSearchParams(null, value);
            this.options_list = [];
            await this.getData(params);
        },
        loadInputDataIndex(data, search = "") {
            const params = this.getInputSearchParams(data, search);
            this.getData(params);
        },
        getInputSearchParams(data, search = "") {
            const page = {
                page: data?._page || 1,
                per_page: data?._minPage || this.minPage,
                search,
            };

            const params = Object.assign({}, page, this.params);
            return params;
        },
        async getData(params) {
            try {
                if (this.api.hasOwnProperty("path_url")) {
                    this.loadInput = true;
                    const { data } = await this.api.getData({ params });
                    this.options_list = [...this.options_list, ...data.data];
                    this.meta_input = data.meta;
                    this.loadInput = false;
                }
            } catch (error) {
                this.loadInput = false;
                throw new ErrorHandler(error);
            }
        },
    },
};
</script>

<style lang=""></style>

<template lang="">
    <span class="relative block rounded-xl" :class="className">
        <input
            type="text"
            :placeholder="placeholder"
            class="input-search"
            :class="classInput"
            :style="{ 'padding-right': icon ? '40px' : '' }"
            v-model="search"
            @keyup.enter="searchHandler"
        />

        <IconSearch
            v-if="icon"
            className="absolute text-primary right-4 top-1/2 -translate-y-1/2 pointer-events-none "
            width="20px"
        />

        <IconClose
            v-if="clearable && search && isSearch"
            className="absolute text-primary right-0 top-1/2 -translate-y-1/2 cursor-pointer"
            width="30px"
            @click="clearHandler"
        />
    </span>
</template>

<script>
import IconSearch from "@/components/icons/IconSearch.vue";
import IconClose from "@/components/icons/IconClose.vue";

export default {
    data() {
        return { search: "", isSearch: false };
    },
    props: {
        placeholder: "",
        className: "",
        classInput: {
            default: "py-3",
        },
        icon: {
            type: Boolean,
            required: false,
            default: false,
        },
        clearable: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    components: { IconSearch, IconClose },
    watch: {
        search(newValue) {
            if (this.isSearch && newValue == "") {
                this.clearHandler();
            }
        },
    },
    methods: {
        searchHandler() {
            if (this.search == "") return;
            this.$emit("search", this.search);
            this.isSearch = true;
        },
        clearHandler() {
            this.$emit("clear");
            this.search = "";
            this.isSearch = false;
        },
    },
};
</script>

<style lang="scss">
.input-search {
    @apply w-full text-sm rounded-2xl px-5 border-gray border outline-none outline-offset-0 focus:outline-primaryTransparent focus:border-primaryOutline;
}
</style>

<template lang="">
    <div class="flex-1 grid md:flex items-center gap-4 filter-table">
        <CustomSelect
            v-if="!$slots.filter"
            v-for="(item, index) in filters"
            class="md:max-w-[15rem]"
            :placeholder="item.text"
            :api="item.api"
            :params="item.params"
            :reduce="(val) => val[item.id]"
            :create-option="
                (val) => ({
                    text: `${val[item.name]}`,
                    ...val,
                })
            "
            label_option="text"
            @select="(val) => filterHandler(val, index)"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            filter_value: {},
        };
    },
    props: {
        filters: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },
    watch: {},
    methods: {
        filterHandler(value, key) {
            this.filter_value = value;
            this.$emit("select", { value: this.filter_value, key });
        },
    },
};
</script>

<style lang="scss">
.filter-table {
    .vs__dropdown-toggle {
        border: 1px solid #c40001 !important;
        padding-bottom: 2px;
    }

    .vs__search {
        color: #c40001;
        font-size: 14px;
        padding: 4px 10px;
    }

    .input-base {
        @apply pl-2 py-1.5 rounded-md w-full;
        border: 1px solid #c40001 !important;
    }
}
</style>

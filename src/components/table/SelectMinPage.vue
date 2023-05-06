<template lang="">
    <div class="select-show-page-container text-xs text-gray-dark">
        <p>Show</p>
        <select
            class="rounded-full font-bold outline-none focus:outline focus:outline-primaryTransparent focus:border-primaryOutline"
            @change="minPagehandler"
            :disabled="!totalData"
        >
            <option selected disabled>Select</option>
            <option
                v-for="(item, index) in values"
                :key="index"
                :value="item"
                :selected="minPage == item ? true : false"
                :disabled="item > totalData"
            >
                {{ item }}
            </option>
            <option value="all" :selected="minPage > 1000000000 ? true : false">
                all
            </option>
        </select>
        <p v-if="totalData" style="margin: 0">
            {{ currentTotal }} of {{ totalData }} entries
        </p>
    </div>
</template>

<script>
export default {
    props: {
        values: {
            type: Array,
            default: function () {
                return [];
            },
        },
        currentTotal: {
            default: 0,
        },
        minPage: {
            default: 0,
        },
        totalData: {
            default: 0,
        },
    },
    methods: {
        minPagehandler(evt) {
            const { target } = evt;
            this.$emit("select", target.value);
        },
    },
};
</script>

<style lang="scss">
.select-show-page-container {
    display: flex;
    gap: 1em;
    align-items: center;

    select {
        padding: 5px 1em;
        border: 1px solid lightgray;
    }
}
</style>

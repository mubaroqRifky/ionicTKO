<template lang="">
    <div class="paginate-container text-xs" :style="getTheme(theme)">
        <Paginate
            :page-count="totalPage"
            :click-handler="paginateHandler"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            v-model="pages"
            :page-range="3"
            :margin-pages="2"
            :page-class="'page-item'"
        >
        </Paginate>
    </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";

export default {
    data() {
        return {
            paged: 0,
        };
    },
    props: {
        page: {
            type: Number,
            required: true,
            default: 1,
        },
        minPage: {
            required: true,
            default: 10,
        },
        totalData: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPage: {
            type: Number,
            required: true,
            default: 0,
        },
        currentTotal: {
            type: Number,
            required: false,
            default: 0,
        },
        theme: {
            type: String,
            required: false,
            default: "green",
        },
    },
    components: { Paginate },
    watch: {
        page(newData, oldData) {
            this.pages = newData;
        },
        minPage(newValue, oldValue) {},
    },
    computed: {
        pages: {
            get() {
                return this.paged;
            },
            set(value) {
                this.paged = value;
            },
        },
    },
    methods: {
        getTheme(value) {
            switch (value) {
                case "green":
                    return {
                        "--primary": "#2EAF8B",
                        "--primaryTransparent": "#1387664f",
                    };
                case "blue":
                    return {
                        "--primary": "#C40001",
                        "--primaryTransparent": "#F8AAB3",
                    };
                default:
                    return;
            }
        },
        paginateHandler(page) {
            this.$emit("paging", page);
        },
        selectMinPage(evt) {
            const { target } = evt;
            this.$emit("minPageChange", target.value);
        },
    },
};
</script>

<style lang="scss">
.paginate-container {
    @apply flex justify-center;
    gap: 1em;
    align-items: center;
    padding: 0 1em;
}

ul.pagination {
    color: gray;
    font-size: 12px;
    justify-content: center;
    display: flex;

    li {
        a {
            cursor: pointer;
            border: 1px solid lightgray;
            text-align: center;
            background-color: white;
            padding: 5px 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                background-color: var(--primary);
                color: white !important;
                border: 1px solid var(--primary);
            }
        }

        &.page-item {
            min-width: 40px;

            &.active {
                z-index: 5;
                a {
                    color: white;
                    background-color: var(--primary);
                    border: 1px solid var(--primary);
                    outline: 3.5px solid var(--primaryTransparent);
                }
            }
        }

        &.disabled {
            a {
                color: lightgray;

                &:hover {
                    background: white;
                    color: lightgray !important;
                    border: 1px solid lightgray;
                }
            }
        }
    }
}
</style>

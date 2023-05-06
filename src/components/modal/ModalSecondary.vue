<template lang="">
    <div
        class="fixed top-0 left-0 right-0 bottom-0 bg-transparent flex justify-center items-center z-40"
        @click.self.stop="$emit('close')"
    >
        <div
            class="modal-body modal-glass relative flex flex-col justify-center"
        >
            <div class="py-6 px-4 shadow-md">
                <h2 class="text-primary text-lg font-bold text-center">
                    {{ content }}
                </h2>
            </div>

            <div
                class="gap-5 flex flex-col py-8 px-6"
                :class="type == MODAL.APPROVE ? 'items-center' : ''"
            >
                <p
                    class="text-center"
                    style="line-height: 2rem"
                    v-if="subcontent"
                    v-html="subcontent"
                ></p>

                <slot name="content" v-if="type == MODAL.REJECT"></slot>

                <div
                    class="w-full md:w-auto flex flex-col-reverse md:flex-row gap-3 md:gap-4 items-center justify-end"
                    :class="type == MODAL.APPROVE ? 'mt-2' : ''"
                    v-if="
                        (type == MODAL.REJECT || type == MODAL.APPROVE) &&
                        !$slots.action
                    "
                >
                    <button
                        class="btn btn-secondary w-full md:w-28 justify-center"
                        @click="$emit('close')"
                        alt="Cancel"
                    >
                        Batal
                    </button>
                    <button
                        class="btn btn-primary w-full md:w-28 justify-center gap-4"
                        @click="!loading && $emit('proses')"
                        :disabled="loading"
                        alt="Process"
                    >
                        Ya
                        <BounceLoaderVue
                            :loading="loading"
                            :color="'white'"
                            :size="'20px'"
                            class="absolute right-3"
                        ></BounceLoaderVue>
                    </button>
                </div>

                <slot name="action" v-if="type == MODAL.REJECT"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import IconClose from "../icons/IconClose.vue";
import IconSuccess from "../icons/IconSuccess.vue";
import IconError from "../icons/IconError.vue";
import IconWarning from "../icons/IconWarning.vue";
import IconQuestion from "../icons/IconQuestion.vue";
import IconLogout from "../icons/IconLogout.vue";

import BounceLoaderVue from "vue-spinner/src/BounceLoader.vue";
import Loading from "../../controllers/state/Loading";

export default {
    data() {
        return {
            MODAL: {
                INFO: "info",
                REJECT: "reject",
                APPROVE: "approve",
            },
        };
    },
    components: {
        IconSuccess,
        IconError,
        IconWarning,
        IconQuestion,
        IconLogout,
        IconClose,
        BounceLoaderVue,
    },
    watch: {
        selected(newVal, oldVal) {
            this.data_selected = newVal;
        },
    },
    props: {
        content: {
            type: String,
            default: "Data Belum Lengkap",
        },
        type: {
            type: String,
            default: "warning",
        },
        subcontent: {
            type: String,
            default:
                "Anda belum mengisi sumber pengambilan benih. Silahkan isi minimal 1 Sumber Pengambilan Benih sebelum menyimpan data Approval ini.",
        },
    },
    computed: {
        loading() {
            return Loading.get();
        },
    },
    methods: {
        selectHandler(value) {
            this.data_selected = value;
            this.$emit("select", this.data_selected);
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
.modal-glass {
    background: linear-gradient(
        148.05deg,
        rgba(255, 255, 255, 0.8) 9.93%,
        rgba(255, 255, 255, 0.5) 91.86%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);
}
.modal-body {
    @apply w-10/12 max-w-lg bg-white;

    border-radius: 15px;

    .btn-close-modal {
        @apply bg-gray-dark text-white rounded-full p-1 w-6 h-6 flex justify-center items-center -top-2 -right-2 absolute;
    }
}
</style>

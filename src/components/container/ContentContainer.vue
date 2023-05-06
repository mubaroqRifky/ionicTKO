<template lang="">
    <div
        class="grid px-4 md:px-8 gap-4 pt-4 content-start items-start flex-1"
        :class="[
            scroll
                ? 'overflow-y-auto overflow-x-hidden scrollbar-secondary'
                : '',
            classContainer,
        ]"
    >
        <div class="grid gap-2 md:flex md:gap-4 justify-between" v-if="title">
            <div class="flex items-center gap-3">
                <button
                    v-if="back"
                    aria-label="Back Button"
                    class="border-2 border-primary rounded-lg p-1 text-primary h-6 w-6 flex justify-center items-center"
                    @click="$router.go(-1)"
                    alt="Go Back"
                >
                    <IconArrowLeft width="10px" />
                </button>

                <div class="flex items-center gap-2 text-primary">
                    <slot name="iconTitle"></slot>
                    <h2 class="font-bold">{{ title }}</h2>
                </div>
            </div> 
        </div>

        <slot></slot>
    </div>

    <Transition name="ghost">
        <ModalConfirmation
            v-if="modal && modal.show"
            :type="modal.type"
            :content="modal.content"
            :subcontent="modal.subcontent"
            @close="closeModalHandler"
            @proses="prosesHandler"
        />
    </Transition>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue"; 

export default {
    data() {
        return {
            date: "",
            interval: 0,
        };
    },
    emits: ["close", "proses"],
    props: {
        title: {
            type: String,
            default: "Title Here",
        },
        back: {
            type: Boolean,
            default: false,
        },
        scroll: {
            type: Boolean,
            default: true,
        },
        modal: {
            type: Object,
            default: function () {
                return {};
            },
        },
        close: "",
        proses: "",
        classContainer: {
            type: String,
            default: "",
        },
    },
    components: { IconArrowLeft }, 
    methods: { 
        closeModalHandler() {
            this.$emit("close");
        },
        prosesHandler() {
            this.$emit("proses");
        },
    }, 
};
</script>

<style lang=""></style>

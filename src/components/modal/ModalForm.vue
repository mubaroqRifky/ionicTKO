<template lang="">
    <section
        class="fixed top-0 left-0 right-0 bottom-0 bg-transparent z-40 overflow-auto"
        :class="center ? 'grid justify-center items-center' : ''"
        @click.self.stop="$emit('close')"
    >
        <div
            class="bg-white rounded-xl px-10 py-10 grid gap-10 w-[80%] md:w-3/5 absolute mt-10 top-1/2 md:top-0 -translate-y-1/2 md:translate-y-0 left-1/2 -translate-x-1/2"
        >
            <h2 class="text-primary text-center font-bold mt-4">
                {{ title }}
            </h2>

            <div class="grid gap-4">
                <slot></slot>
            </div>

            <div class="flex gap-2" :class="actionClass" v-if="action">
                <button
                    class="btn btn-secondary"
                    @click="$emit('close')"
                    :disabled="loading"
                    alt="Cancel"
                >
                    Batal
                </button>
                <button
                    class="btn btn-secondary"
                    @click="$emit('proses')"
                    :disabled="loading"
                    alt="Save"
                >
                    Simpan
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

export default {
    props: {
        title: {
            default: "Default Title",
        },
        action: {
            default: "create",
        },
        center: {
            default: false,
        },
        action: {
            default: true,
        },
        loading: {
            default: false,
        },
        actionClass: {
            default: "items-center mt-10",
        },
    },
    components: { BounceLoader },
};
</script>

<style lang=""></style>

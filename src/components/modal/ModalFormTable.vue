<template lang="">
    <section
        class="fixed top-0 left-0 right-0 bottom-0 bg-transparent z-40 overflow-auto"
        :class="center ? 'grid justify-center items-center' : ''"
        @click.self.stop="$emit('close')"
    >
        <div
            class="bg-softGray rounded-xl grid w-[90%] absolute mt-10 left-1/2 -translate-x-1/2 overflow-hidden"
            :class="classContainer"
        >
            <header class="p-6 shadow-sm bg-white">
                <h2 class="text-primary text-center font-bold">
                    {{ title }}
                </h2>
            </header>

            <slot name="caption"></slot>

            <section class="p-6">
                <div class="grid gap-4 overflow-auto">
                    <slot></slot>
                </div>

                <div
                    class="flex gap-2 justify-end"
                    :class="actionClass"
                    v-if="action"
                >
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
                        <BounceLoader
                            :loading="loading"
                            :color="'white'"
                            :size="'20px'"
                            class="absolute right-3"
                        ></BounceLoader>
                    </button>
                </div>
            </section>
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
            default: "items-center",
        },
        classContainer: {
            default: "md:w-3/5",
        },
    },
    components: { BounceLoader },
};
</script>

<style lang=""></style>

<template lang="">
    <section
        class="fixed top-0 left-0 right-0 bottom-0 bg-transparent z-40 overflow-auto grid justify-center items-center"
        @click.self.stop="$emit('close')"
        v-if="src"
    >
        <div
            class="rounded-sm p-4 grid w-[90%] md:w-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 justify-center items-center bg-white"
        >
            <img
                :src="src"
                :alt="alt"
                class="rounded-sm overflow-hidden w-full h-full object-contain"
            />
        </div>
    </section>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: "",
        },
        alt: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang=""></style>

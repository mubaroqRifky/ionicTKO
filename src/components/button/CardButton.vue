<template lang="">
    <button
        class="rounded-2xl h-auto grid gap-1 px-4 py-4 justify-center justify-items-center text-white content-start transition-all"
        :class="'bg-primary hover:bg-[#f84949] active:bg-[#ff2a2a]'"
        @click="name ? clickHandler(name) : redirectHandler(link)"
    >
        <component :is="icon" width="50px" height="30px"></component>
        <h3 class="font-bold md:text-left text-sm leading-4 text-center">
            {{ text }}
        </h3>
    </button>
</template>

<script>
export default {
    components: {},
    props: {
        text: {
            type: String,
            default: "Default Text",
        },
        icon: {
            type: Object,
        },
        name: {
            type: String,
            default: "",
        },
        link: {
            type: String,
            default: "",
        },
    },
    methods: {
        clickHandler(name) {
            this.$emit("press");
            this.$router.push({ name });
        },
        async redirectHandler(link) {
            window.open(link, "_blank");
        },
    },
};
</script>

<style lang=""></style>

<template lang="">
    <span :style="styles" :class="className">
        <svg
            :style="{ width, height }"
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19 7L1 7M1 7L7 0.999999M1 7L7 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </span>
</template>

<script>
export default {
    props: ["width", "height", "styles", "className"],
};
</script>

<style lang=""></style>

<template lang="">
    <span :style="styles" :class="className">
        <svg
            :style="{ width, height }"
            width="65"
            height="52"
            viewBox="0 0 65 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.0656 52H37.8097V31.7121H49.2471V52H56.9714V23.7941L32.0178 9.01279L7.0656 23.7941V52ZM0 19.2685L32.3947 0L65 19.3347L62.605 23.5018L32.3807 5.5799L2.39553 23.4159L0 19.2695V19.2685ZM16.942 31.7501H29.8269V42.7612H16.942V31.7501Z"
                fill="currentColor"
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

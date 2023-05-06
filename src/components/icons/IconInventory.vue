<template lang="">
    <span :style="styles" :class="className">
        <svg
            :style="{ width, height }"
            width="53"
            height="61"
            viewBox="0 0 53 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M39.7496 7.69401L51.102 14.2855L42.9988 18.9902L19.37 4.14127L26.4983 0.0020752L39.7481 7.69601L39.7496 7.69401ZM35.2203 23.5088L26.4997 28.571L13.2499 20.8775L1.89802 14.2855L11.591 8.65994L35.2203 23.5088ZM25.5463 30.2269V61.0001L13.2499 53.8601L0 46.1667V15.3934L12.2969 22.5334L25.5463 30.2269ZM27.4532 61.0001V30.2269L37.0477 24.6563L37.1188 24.7008V32.9896L45.0649 28.0655V20.2876L44.8278 20.1376L53 15.3924V46.1657L39.7496 53.8591L27.4532 61.0001Z"
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

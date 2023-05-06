<template lang="">
    <span :style="styles" :class="className">
        <svg
            :style="{ width, height }"
            width="64"
            height="53"
            viewBox="0 0 64 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.88092 49.1132H59.6805V47.5701L61.6396 48.9285L63.6 50.2875L61.6396 51.6459L59.6805 53V51.4569H1.54139V3.92391H0L1.35738 1.96268L2.70995 0L4.06685 1.96268L5.42375 3.92391H3.88237L3.88092 49.1132Z"
                fill="currentColor"
            />
            <path
                d="M13.6286 34.8285H6.05713V46.9428H13.6286V34.8285Z"
                fill="currentColor"
            />
            <path
                d="M22.7145 30.2858H15.1431V46.9429H22.7145V30.2858Z"
                fill="currentColor"
            />
            <path
                d="M31.7999 22.7142H24.2285V46.9428H31.7999V22.7142Z"
                fill="currentColor"
            />
            <path
                d="M40.8854 16.6572H33.314V46.9429H40.8854V16.6572Z"
                fill="currentColor"
            />
            <path
                d="M49.9718 10.6001H42.4004V46.943H49.9718V10.6001Z"
                fill="currentColor"
            />
            <path
                d="M59.0571 3.02856H53V46.9428H59.0571V3.02856Z"
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

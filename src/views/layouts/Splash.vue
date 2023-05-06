<template>
    <div class="bg-splash relative">
        <div class="text-white grid justify-center">
            <IconTakingOrder width="250px" height="250px" />
        </div>
    </div>
</template>

<script>
import IconTakingOrder from "@/components/icons/IconCPP.vue";

export default {
    components: {
        IconTakingOrder,
    },
};
</script>

<style lang="scss" scoped>
.bg-splash {
    @apply w-screen h-screen overflow-hidden bg-no-repeat bg-cover flex flex-col justify-center items-center;
    background-image: url("../../assets/images/bg-login.png");
}
</style>

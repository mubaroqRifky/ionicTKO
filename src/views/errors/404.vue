<template>
    <div class="bg-splash relative">
        <div
            class="text-white grid gap-4 justify-center items-center content-center justify-items-center"
        >
            <IconTakingOrder />
            <h1 class="text-9xl font-bold">404</h1>
            <h2 class="text-4xl font-bold">Page Not Found</h2>
            <p class="text-center px-6">
                The page you are looking for doesn't exist or an other error
                occured.
            </p>

            <router-link replace :to="{ name: 'home' }" class="btn btn-primary"
                >Go to Home Page</router-link
            >
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
    background-image: url("@/assets/images/bg-login.png");
}
</style>

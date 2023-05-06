<template lang="">
    <!-- <Sidebar /> -->
    <main id="main" class="mobile-width-constraint scroll-hidden">
        <!-- <Header /> -->
        <router-view></router-view>
    </main>
    <NavBottom />
</template>

<script>
import NavBottom from "./NavBottom.vue";

export default {
    components: { NavBottom },
};
</script>

<style lang="scss">
#main {
    @apply bg-gray flex-1 flex flex-col overflow-auto;
}
</style>

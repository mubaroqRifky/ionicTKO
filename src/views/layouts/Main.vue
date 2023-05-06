<template lang="">
    <!-- <Sidebar /> -->
    <main id="main">
        <!-- <Header /> -->
        <router-view></router-view>
    </main>
</template>

<script>
export default {
    components: {},
};
</script>

<style lang="scss">
#main {
    @apply max-w-md w-full m-auto bg-gray flex-1 flex flex-col;
}
</style>

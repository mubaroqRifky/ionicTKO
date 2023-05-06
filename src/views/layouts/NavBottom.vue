<template lang="">
    <div
        class="flex items-center justify-around mobile-width-constraint border-t border-solid border-lightGray"
    >
        <button
            class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px]"
            @click="$router.push({ name: 'home' })"
        >
            <IconMenuHome width="22px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">Home</p>
        </button>
        <button class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px]">
            <IconMitra width="30px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">Penjualan</p>
        </button>
        <button class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px]">
            <IconList width="22px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">List Transaksi</p>
        </button>
        <button class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px]">
            <IconCustomer width="49px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">Customer</p>
        </button>
        <button class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px]">
            <IconPembayaran width="25px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">Penghapusan</p>
        </button>
    </div>
</template>

<script>
import IconMenuHome from "@/components/icons/IconMenuHome.vue";
import IconMitra from "@/components/icons/IconMitra.vue";
import IconList from "@/components/icons/IconList.vue";
import IconCustomer from "@/components/icons/IconCustomer.vue";
import IconPembayaran from "@/components/icons/IconPembayaran.vue";

export default {
    components: {
        IconMenuHome,
        IconMitra,
        IconList,
        IconCustomer,
        IconPembayaran,
    },
};
</script>

<style lang=""></style>

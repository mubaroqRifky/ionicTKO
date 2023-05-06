<template lang="">
    <div
        class="flex items-center justify-around mobile-width-constraint border-t border-solid border-lightGray"
    >
        <router-link
            class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px] nav"
            :to="{ name: 'home' }"
        >
            <IconMenuHome width="22px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">Home</p>
        </router-link>
        <router-link
            class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px] nav"
            :to="{ name: 'penjualan' }"
        >
            <IconMitra width="30px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">Penjualan</p>
        </router-link>
        <router-link
            class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px] nav"
            :to="{ name: 'transaksi' }"
        >
            <IconList width="22px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">List Transaksi</p>
        </router-link>
        <router-link
            class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px] nav"
            :to="{ name: 'customer' }"
        >
            <IconCustomer width="49px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">Customer</p>
        </router-link>
        <router-link
            class="px-2 py-2 grid justify-items-center flex-1 max-w-[80px] nav"
            :to="{ name: 'pembayaran' }"
        >
            <IconPembayaran width="25px" height="30px" />
            <p class="mt-1" style="font-size: 0.5rem">Pembayaran</p>
        </router-link>
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

<style lang="scss">
.nav {
    &.router-link-active {
        @apply text-primary;
    }
}
</style>

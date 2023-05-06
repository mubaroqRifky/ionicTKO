<template lang="">
    <section class="px-4 py-6 grid gap-4">
        <div class="card-container">
            <div class="px-6 py-6 pr-5 flex gap-4">
                <div class="rounded-full bg-darkGray w-20 h-20 object-contain">
                    <img src="" alt="" />
                </div>
                <div class="grid flex-1 self-center gap-1 text-sm">
                    <p class="font-bold">Benson</p>
                    <p>234882348</p>
                    <p>Jawa Timur</p>
                </div>
                <div class="grid">
                    <button class="self-start text-gray-dark">
                        <IconBell width="30px" height="22px" />
                    </button>
                    <button
                        class="self-end text-primary"
                        @click="confirmLogoutHandler"
                    >
                        <IconLogout width="30px" height="30px" />
                    </button>
                </div>
            </div>
        </div>

        <div class="card-container flex items-center justify-center">
            <div class="p-6 grid grid-cols-2 gap-6 justify-items-center">
                <button
                    class="grid gap-2 justify-items-center text-xs"
                    @click="$router.push({ name: 'penjualan' })"
                >
                    <div
                        class="rounded-full bg-primary w-14 h-14 object-contain flex justify-center items-center text-white"
                    >
                        <IconMitra width="35px" height="35px" />
                    </div>
                    <p>Penjualan</p>
                </button>

                <button
                    class="grid gap-2 justify-items-center text-xs"
                    @click="$router.push({ name: 'transaksi' })"
                >
                    <div
                        class="rounded-full bg-primary w-14 h-14 object-contain flex justify-center items-center text-white"
                    >
                        <IconList width="23px" height="23px" />
                    </div>
                    <p>List Transaksi</p>
                </button>

                <button
                    class="grid gap-2 justify-items-center text-xs"
                    @click="$router.push({ name: 'customer' })"
                >
                    <div
                        class="rounded-full bg-primary w-14 h-14 object-contain flex justify-center items-center text-white"
                    >
                        <IconCustomer width="50px" height="50px" />
                    </div>
                    <p>Customer</p>
                </button>

                <button
                    class="grid gap-2 justify-items-center text-xs"
                    @click="$router.push({ name: 'pembayaran' })"
                >
                    <div
                        class="rounded-full bg-primary w-14 h-14 object-contain flex justify-center items-center text-white"
                    >
                        <IconPembayaran width="30px" height="30px" />
                    </div>
                    <p>Pembayaran</p>
                </button>
            </div>
        </div>

        <div class="card-container overflow-hidden">
            <div class="px-4 py-3 flex gap-4 bg-primary text-white">
                List Transaksi
            </div>
            <ul class="text-xs max-h-4xl overflow-auto scrollbar-secondary">
                <li
                    class="flex px-4 py-4 gap-2 justify-between"
                    v-for="(item, index) in 50"
                    :key="index"
                >
                    <p class="w-[30%]">SO/123/45</p>
                    <p class="flex-1">Nama Customer</p>
                    <p class="w-[25%]">21-05-2023</p>
                </li>
            </ul>
        </div>
    </section>

    <Transition name="ghost">
        <ModalConfirmation
            v-if="getModalState.show"
            :type="getModalState.type"
            :content="getModalState.content"
            :subcontent="getModalState.subcontent"
            @close="closeModalHandler"
            @proses="Modal.onconfirm"
        />
    </Transition>
</template>

<script>
import IconBell from "@/components/icons/IconBell.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import IconMitra from "@/components/icons/IconMitra.vue";
import IconList from "@/components/icons/IconList.vue";
import IconCustomer from "@/components/icons/IconCustomer.vue";
import IconPembayaran from "@/components/icons/IconPembayaran.vue";

import Modal from "@/controllers/state/Modal";
import UserGoogle from "@/controllers/state/UserGoogle";
import User from "@/controllers/state/User";

import Logout from "@/apis/Logout";
import Loading from "@/controllers/state/Loading";

export default {
    data() {
        return {
            name: "",
            nik: "",
            userData: null,

            api: new Logout(),

            Modal,
        };
    },
    components: {
        IconBell,
        IconLogout,
        IconMitra,
        IconList,
        IconCustomer,
        IconPembayaran,
    },
    watch: {
        userData(newValue) {
            if (newValue) {
                this.name = newValue.name;
                this.nik = newValue.nik;
            }
        },
    },
    computed: {
        getModalState() {
            return Modal.get();
        },
        getUserState() {
            return this.$store.getters.guser || {};
        },
    },
    methods: {
        closeModalHandler() {
            try {
                Modal.close();
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
        confirmLogoutHandler() {
            console.log("ini");
            try {
                Modal.logout("Yakin ingin logout?");
                Modal.onconfirm = this.logoutHandler;
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
        removeSession() {
            User.remove();
            UserGoogle.remove();
            this.closeModalHandler();
            this.$router.push({ name: "login" });
        },
        async logoutHandler() {
            Loading.start();
            try {
                await this.api.postData();
            } catch (error) {
                console.error(error);
            }
            Loading.stop();
            this.removeSession();
        },
    },
    mounted() {},
};
</script>

<style lang="scss"></style>

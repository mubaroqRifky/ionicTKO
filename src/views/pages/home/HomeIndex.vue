<template lang="">
    <section class="px-4 py-6 grid gap-4 overflow-auto scroll-hidden">
        <div class="card-container">
            <div class="px-6 py-6 pr-5 flex gap-4">
                <div
                    class="rounded-full bg-gray w-20 h-20 object-contain flex justify-center items-center text-gray-dark"
                >
                    <img
                        v-if="getUserState.picture"
                        :src="getUserState.picture"
                        :alt="name"
                        class="w-full h-full rounded-full"
                        referrerpolicy="no-referrer"
                    />
                    <IconAvatar width="50px" v-else />
                </div>
                <div class="grid flex-1 self-center gap-1 text-sm">
                    <p class="font-bold">{{ name }}</p>
                    <p>{{ nik }}</p>
                    <p>{{ area }}</p>
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
</template>

<script>
import IconBell from "@/components/icons/IconBell.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import IconMitra from "@/components/icons/IconMitra.vue";
import IconList from "@/components/icons/IconList.vue";
import IconCustomer from "@/components/icons/IconCustomer.vue";
import IconPembayaran from "@/components/icons/IconPembayaran.vue";
import IconAvatar from "@/components/icons/IconAvatar.vue";

import Modal from "@/controllers/state/Modal";
import UserGoogle from "@/controllers/state/UserGoogle";
import User from "@/controllers/state/User";
import { G_USER } from "@/store/states/userGoogleState";

import Logout from "@/apis/Logout";
import Loading from "@/controllers/state/Loading";

export default {
    data() {
        return {
            name: "",
            nik: "",
            area: "Jakarta",
            userData: null,

            api: new Logout(),
        };
    },
    components: {
        IconBell,
        IconLogout,
        IconMitra,
        IconList,
        IconCustomer,
        IconPembayaran,
        IconAvatar,
    },
    watch: {
        userData(newValue) {
            if (newValue) {
                this.name = newValue.name;
                this.nik = newValue.nik;
                this.area = newValue.area;
            }
        },
    },
    computed: {
        getUserState() {
            return this.$store.getters.guser || {};
        },
    },
    methods: {
        confirmLogoutHandler() {
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
            Modal.close();
            this.$router.replace({ name: "login" });
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
    created() {
        const user = localStorage.getItem("_user");
        const guser = localStorage.getItem("_guser");

        if (user) {
            const { name, nik } = JSON.parse(user);
            this.name = name;
            this.nik = nik;
        }

        if (guser) {
            const result = JSON.parse(guser);

            this.$store.dispatch(G_USER.ACTION, {
                type: G_USER.SET,
                payload: result,
            });
        }
    },
    mounted() {},
};
</script>

<style lang="scss"></style>

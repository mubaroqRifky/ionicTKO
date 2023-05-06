<template lang="">
    <header
        class="px-8 py-4 flex justify-between items-center gap-4 text-white md:text-gray-dark shadow-sm bg-primary sm:bg-white z-10 relative md:static"
    >
        <div class="justify-between lg:flex items-center gap-4">
            <button aria-label="Button Menu Bar" @click="sidebarHandler">
                <IconBar width="20px" />
            </button>

            <InputSearch
                class="hidden lg:flex"
                placeholder="Search..."
                icon
                className="min-w-[25rem]"
            />
        </div>

        <div class="flex gap-4 items-center">
            <div class="md:relative">
                <button
                    class="bg-lightGray w-9 h-9 rounded-full text-primary flex items-center justify-center"
                    aria-label="Button Notifikasi"
                    @click="notif_dropdown = !notif_dropdown"
                    @blur="blurHandler('notif_dropdown')"
                    alt="Notification"
                >
                    <IconBell width="16px" />
                </button>

                <div
                    class="absolute z-10 left-8 md:left-auto md:right-0 mt-2 w-[80%] md:w-96 md:max-w-xs notif-popup"
                    v-if="notif_dropdown"
                >
                    <ul
                        class="px-6 py-4 overflow-y-auto scrollbar-secondary max-h-80"
                    >
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order sudah selesai</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order sudah selesai</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order sudah selesai</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order sudah selesai</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order sudah selesai</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order baru!</li>
                        <li>Ada 1 Sales Order sudah selesai</li>
                        <li>Ada 1 Sales Order baru!</li>
                    </ul>
                </div>
            </div>

            <div class="flex text-sm font-bold cursor-pointer relative">
                <button
                    class="flex gap-4 items-center"
                    @click="logout_dropdown = !logout_dropdown"
                    @blur="blurHandler('logout_dropdown')"
                    aria-label="Profile Button"
                    alt="Profile"
                >
                    <div
                        class="w-9 h-9 rounded-full overflow-hidden bg-lightGray flex items-center justify-center text-primary"
                    >
                        <img
                            v-if="getUserState.picture"
                            :src="getUserState.picture"
                            :alt="name"
                            class="w-full h-full rounded-full"
                            referrerpolicy="no-referrer"
                        />
                        <IconAvatar width="20px" v-else />
                    </div>

                    <div class="hidden md:grid">
                        <p class="leading-4 flex-1">Hi, {{ name }}</p>
                        <p class="font-normal" v-if="nik">{{ nik }}</p>
                    </div>
                </button>

                <div
                    class="rounded-lg w-full text-center absolute z-10 top-full right-0 mt-2 text-gray-dark shadow-md bg-primaryTransparent grid min-w-[10rem] max-w-[10rem] overflow-hidden font-normal"
                    v-if="logout_dropdown"
                >
                    <button
                        class="border-b-0 px-4 py-2 hover:bg-primary active:bg-[#ff2a2a] hover:text-white transition-all flex items-center gap-1 justify-center"
                        @click.self="confirmLogoutHandler"
                        alt="Sign Out"
                    >
                        <IconLogout width="16px" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </header>

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
import IconBar from "@/components/icons/IconBar.vue";
import IconSetting from "@/components/icons/IconSetting.vue";
import IconBell from "@/components/icons/IconBell.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import IconAvatar from "@/components/icons/IconAvatar.vue";
import IconLogout from "@/components/icons/IconLogout.vue";

import avatar from "../../assets/images/avatar.png";

import UserGoogle from "@/controllers/state/UserGoogle";
import User from "@/controllers/state/User";
import ErrorHandler from "@/exceptions/ErrorHandler";
import Modal from "@/controllers/state/Modal";
import Sidebar from "@/controllers/state/Sidebar";

import Logout from "@/apis/Logout";
import Loading from "@/controllers/state/Loading";

import { G_USER } from "@/store/states/userGoogleState";

export default {
    data() {
        return {
            avatar,
            name: "",
            nik: "",
            logout_dropdown: false,
            notif_dropdown: false,
            userData: null,

            api: new Logout(),
            Modal,
        };
    },
    components: {
        IconBar,
        IconSetting,
        IconBell,
        IconArrow,
        IconAvatar,
        IconLogout,
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
        blurHandler(key) {
            setTimeout(() => {
                this[key] = false;
            }, 100);
        },
        sidebarHandler() {
            if (Sidebar.get().open) {
                Sidebar.close();
            } else {
                Sidebar.open();
            }
        },
        closeModalHandler() {
            try {
                Modal.close();
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
        confirmLogoutHandler() {
            try {
                this.logout_dropdown = false;

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

<style lang="scss">
.notif-popup {
    background: linear-gradient(
        148.05deg,
        rgba(255, 255, 255, 0.8) 9.93%,
        rgba(255, 255, 255, 0.5) 91.86%
    );
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    color: black;

    ul {
        li {
            padding: 2rem 0.5rem;

            &:not(:last-child) {
                border-bottom: 1px solid gray;
            }
        }
    }
}
</style>

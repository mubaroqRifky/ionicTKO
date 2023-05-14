<template lang="">
    <!-- <Sidebar /> -->
    <main id="main" class="mobile-width-constraint">
        <!-- <Header /> -->
        <router-view></router-view>
    </main>
    <NavBottom
        v-if="
            $route.name == 'home' ||
            $route.name == 'transaksi' ||
            $route.name == 'customer' ||
            $route.name == 'pembayaran'
        "
    />

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
import NavBottom from "./NavBottom.vue";
import Modal from "@/controllers/state/Modal";

import { StatusBar, Style } from "@capacitor/status-bar";
import { isPlatform } from "@ionic/vue";

export default {
    data() {
        return {
            Modal,
        };
    },
    components: { NavBottom },
    computed: {
        getModalState() {
            return Modal.get();
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
    },
    created() {
        console.log(Style);
        if (isPlatform("mobile") && !isPlatform("mobileweb")) {
            StatusBar.setOverlaysWebView({ overlay: false });
            StatusBar.setStyle({ style: Style.Dark });
            StatusBar.setBackgroundColor({ color: "#c40001" });
        }
    },
};
</script>

<style lang="scss">
#main {
    @apply bg-softGray flex-1 flex flex-col overflow-hidden;
}
</style>

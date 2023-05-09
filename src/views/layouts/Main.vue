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
            console.log("close");
            try {
                Modal.close();
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
    },
};
</script>

<style lang="scss">
#main {
    @apply bg-softGray flex-1 flex flex-col overflow-hidden;
}
</style>

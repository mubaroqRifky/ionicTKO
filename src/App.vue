<template>
    <ion-app>
        <RouterView v-if="!splash"> </RouterView>
        <SplashScreen v-else />
    </ion-app>
</template>

<script>
import { IonApp } from "@ionic/vue";
import { App as CapacitorApp } from "@capacitor/app";
import { Dialog } from "@capacitor/dialog";

export default {
    data() {
        return {
            splash: true,
        };
    },
    components: { IonApp },
    created() {
        setTimeout(() => {
            this.splash = false;
        }, 1000);
    },
    mounted() {
        CapacitorApp.addListener("backButton", ({ canGoBack }) => {
            if (!canGoBack) {
                Dialog.confirm({
                    title: "Confirm",
                    message: `Are you sure to exit the App?`,
                }).then(({ value }) => {
                    if (value) CapacitorApp.exitApp();
                });
            }
        });
    },
};
</script>

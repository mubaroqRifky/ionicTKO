<template>
    <ion-app>
        <RouterView v-if="!splash"> </RouterView>
        <SplashScreen v-else />
    </ion-app>
</template>

<script>
import { IonApp } from "@ionic/vue";

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
};
</script>

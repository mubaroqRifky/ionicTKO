<template lang="">
    <div class="bg-login mobile-width-constraint relative">
        <div
            class="login-form-container flex flex-col items-center justify-center justify-items-center content-center gap-4"
        >
            <div class="text-primary grid justify-center">
                <IconTakingOrder
                    class="cursor-pointer"
                    width="120px"
                    @click="$router.push({ name: 'request' })"
                />
            </div>
            <h1 class="text-4xl font-extrabold text-primary text-center mb-6">
                Welcome!
            </h1>
            <p class="text-center text-sm leading-5">
                Harap Login menggunakan <br />
                Email CPP Anda yang sudah tersambung di Handphone
            </p>

            <button
                class="w-full border px-4 py-2 rounded-3xl flex gap-2 items-center justify-center justify-items-center font-semibold hover:bg-lightGray transition-all hover:border-primary mt-4"
                :class="
                    loading &&
                    'bg-[lightgray] hover:bg-[lightgray] border-[lightgray] hover:border-[lightgray] text-white'
                "
                :disabled="loading"
                @click="googleLoginHandler"
                alt="Sign In"
            >
                <IconGoogle width="25px" />
                Login with Google
            </button>

            <GoogleLogin
                ref="ref_btn"
                class="hidden"
                :params="params"
                :renderParams="renderParams"
                :success="onsuccess"
            />
        </div>
    </div>

    <Transition name="ghost">
        <ModalConfirmation
            v-if="getModalState.show"
            :type="getModalState.type"
            :content="getModalState.content"
            :subcontent="getModalState.subcontent"
            @close="closeModalHandler"
        />
    </Transition>
</template>

<script>
import IconTakingOrder from "@/components/icons/IconCPP.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";

import GoogleLogin from "@/components/button/GoogleLogin.vue";
import Login from "@/apis/Login";

// import LineLoading from "@/assets/animations/loading-lines.json";
import UserGoogle from "@/controllers/state/UserGoogle";
import User from "@/controllers/state/User";

import Modal from "@/controllers/state/Modal";
import InputValidation from "@/controllers/state/InputValidation";

export default {
    name: "Login",
    data() {
        return {
            params: {
                client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true,
            },

            ref_btn: null,
            // LineLoading,

            api: new Login(),
            loading: false,
            loading: false,

            form: {
                access_token: null,
            },

            errors: {
                email: {
                    value: true,
                },
                message: {
                    value: true,
                },
            },
        };
    },
    components: { IconTakingOrder, IconGoogle, GoogleLogin },
    watch: {
        getErrorsState(newValue) {
            this.errors = newValue;
        },
    },
    computed: {
        getModalState() {
            return Modal.get();
        },
        getErrorsState() {
            return InputValidation.get();
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
        inputHandler(value, key) {
            this.form[key] = value;
        },

        async loginHandler(id_token) {
            try {
                this.loading = true;
                const { data } = await this.api.postData({ ...this.form });

                setTimeout(async () => {
                    await User.set(data.data.token);
                    UserGoogle.set(id_token);
                    this.$router.push({ name: "home" });
                    this.loading = false;
                }, 1000);
            } catch (error) {
                this.loading = false;
                UserGoogle.remove();
                throw new ErrorHandler(error);
            }
        },

        googleLoginHandler() {
            try {
                const btn = this.$refs?.ref_btn?.btn;
                if (btn) {
                    btn.click();
                } else {
                    throw new Error("Hey Login Google Belum Siap!");
                }
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
        async onsuccess(response) {
            try {
                const id_token = response.credential;
                console.log(id_token, "id_token");

                this.loading = true;
                this.form.access_token = id_token;
                this.loginHandler(id_token);
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
    },
    created() {},
    mounted() {},
};
</script>

<style lang="scss" scoped>
.bg-login {
    @apply h-screen overflow-hidden bg-no-repeat bg-cover flex flex-col justify-center items-center;
    background-image: url("@/assets/images/bg-login.png");
}

.login-form-container {
    @apply w-[85%] min-h-[25rem] p-8 px-6 bg-white;

    border-radius: 60px;
}
</style>

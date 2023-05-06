<template>
    <span
        class="backdrop"
        :class="view == 'mobile' && side_open ? 'z-40' : '-z-40'"
        @click="sidebarHandler"
    ></span>
    <aside
        class="sidebar scrollbar-secondary"
        :class="
            side_open
                ? 'min-w-fit w-[14rem] md:max-w-[14rem]'
                : 'min-w-fit w-[5rem]'
        "
        :style="{
            transition: 'all .15s ease',
            position: view == 'mobile' ? 'absolute' : 'relative',
            transform:
                view == 'mobile' && !open
                    ? 'translateX(-100%)'
                    : 'translateX(0)',
        }"
        @mouseover="!open && mouseHandler('open')"
        @mouseleave="!open && mouseHandler('close')"
    >
        <div
            class="text-primary grid justify-center"
            :class="!side_open ? 'p-0' : 'p-0'"
        >
            <IconTakingOrder
                class="cursor-pointer"
                :width="side_open ? '110px' : '50px'"
                :height="!side_open ? '80px' : '130px'"
                @click="$router.push({ name: 'dashboard' })"
            />
        </div>

        <nav class="navbar-container scrollbar-secondary">
            <ul class="navbar">
                <template v-for="(item, index) in menu" :key="index">
                    <li
                        class="navbar-list"
                        :class="[
                            side_open
                                ? 'min-w-fit w-[12rem] md:max-w-[12rem]'
                                : 'min-w-fit w-[3.4rem]',
                            item.child && 'has-child',
                        ]"
                        :style="{ transition: 'all .15s ease' }"
                        :data-link="item.text"
                        v-if="
                            !item.child
                                ? getPermission.includes(item.permit) ||
                                  getRoles.includes(ROLES.ADMIN)
                                : item.child.some(
                                      (val) =>
                                          getPermission.includes(val.permit) ||
                                          getRoles.includes(ROLES.ADMIN)
                                  )
                        "
                    >
                        <router-link
                            class="menu-btn"
                            :class="[
                                item.child &&
                                    boldParent(item) &&
                                    'router-link-active',
                                !side_open && 'justify-center',
                            ]"
                            :to="{ name: item.name }"
                        >
                            <component
                                class="text-primary"
                                width="18px"
                                height="18px"
                                :is="item.icon"
                            ></component>

                            <p
                                class="flex-1"
                                :class="!text_show && 'absolute opacity-0'"
                            >
                                {{ item.text }}
                            </p>

                            <IconArrow
                                class="text-primary inline-block"
                                v-if="item.child && side_open"
                                width="10px"
                            />
                        </router-link>

                        <ul
                            class="navbar-child"
                            v-if="
                                item.child && side_open
                                    ? showChildMenu(item)
                                    : false
                            "
                        >
                            <template v-for="(child, i) in item.child">
                                <li
                                    class="navbar-list"
                                    :data-link="child.text"
                                    :key="i"
                                    v-if="
                                        getPermission.includes(child.permit) ||
                                        getRoles.includes(ROLES.ADMIN)
                                    "
                                >
                                    <router-link
                                        class="menu-btn"
                                        :to="{ name: child.name }"
                                        :class="[
                                            boldChild(child),
                                            !side_open && 'justify-center',
                                        ]"
                                    >
                                        <component
                                            class="text-primary"
                                            width="18px"
                                            height="18px"
                                            v-if="child.icon"
                                            :is="child.icon"
                                        ></component>
                                        <p
                                            :class="[
                                                !text_show &&
                                                    'absolute opacity-0',
                                                !child.icon ? 'ml-6' : '',
                                            ]"
                                        >
                                            {{ child.text }}
                                        </p>
                                    </router-link>
                                </li>
                            </template>
                        </ul>
                    </li>
                </template>
            </ul>
        </nav>
    </aside>
</template>

<script>
import IconTakingOrder from "@/components/icons/IconCPP.vue";
import IconArrow from "@/components/icons/IconArrow.vue";

import menu from "@/static/menu";
import Sidebar from "@/controllers/state/Sidebar";
import ErrorHandler from "@/exceptions/ErrorHandler";

export default {
    data() {
        return {
            user_name: "",
            user_email: "",
            open: Sidebar.get().open,
            side_open: false,
            text_show: true,
            menu,
            timeout: null,
            view: null,

            ROLES: {
                ADMIN: "ADMINISTRATOR",
            },
        };
    },
    props: {
        viewMobile: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    components: { IconTakingOrder, IconArrow },
    watch: {
        $route: {
            handler: function (tes) {},
        },
        open(newValue) {
            this.side_open = newValue;
            this.text_show = newValue;
        },
        getSidebarState(newValue) {
            this.open = newValue.open;
        },
    },
    computed: {
        getSidebarState() {
            return Sidebar.get();
        },
        getUserData() {
            return {};
        },
        getUserImage() {
            return localStorage.getItem("user_image");
        },
        getRoles() {
            let data = localStorage.getItem("_user");
            if (data) {
                const { roles } = JSON.parse(data);
                data = roles;
            }

            return data || [];
        },
        getPermission() {
            let data = localStorage.getItem("_user");
            if (data) {
                const { permissions } = JSON.parse(data);
                data = permissions;
            }

            return data || [];
        },
    },
    methods: {
        sidebarHandler() {
            if (Sidebar.get().open) {
                Sidebar.close();
            } else {
                Sidebar.open();
            }
        },
        mouseHandler(show) {
            let open = true;
            if (show == "open") {
                open = true;
            } else {
                open = false;
            }

            this.text_show = open;
            this.side_open = open;
        },
        showChildMenu(item) {
            if (this.$route.meta.hasChild && this.$route.name == item.name) {
                return true;
            } else if (item.child.some((val) => val.name == this.$route.name)) {
                return true;
            } else if (
                this.$route.meta.parent &&
                item.child.some((val) => val.name == this.$route.meta.parent)
            ) {
                return true;
            } else if (this.$route.meta.parent == item.name) {
                return true;
            }
            return false;
        },
        boldParent(item) {
            if (item.child.some((val) => val.name == this.$route.name)) {
                return true;
            } else if (
                this.$route.meta.parent &&
                item.child.some((val) => val.name == this.$route.meta.parent)
            ) {
                return true;
            }
        },
        boldChild(child) {
            if (
                this.$route.meta.child == child.name ||
                this.$route.meta.parent == child.name ||
                this.$route.name == child.name
            ) {
                return "router-link-active";
            }
        },
        async redirect(item) {
            window.open(item.link, "_blank");
            try {
                console.log(item.link, "link");
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
        setViewMobile(windowElement) {
            if (windowElement.innerWidth > 768) {
                this.view = "desktop";
                Sidebar.open();
            } else if (windowElement.innerWidth > 425) {
                this.view = "tablet";
                Sidebar.close();
            } else {
                this.view = "mobile";
                Sidebar.close();
            }
        },
        resizeHandler(evt) {
            this.setViewMobile(evt.target);
        },
    },
    created() {
        this.open = Sidebar.get().open;
        this.side_open = Sidebar.get().open;
    },
    mounted() {
        window.addEventListener("resize", this.resizeHandler);

        this.setViewMobile(window);
    },
    unmounted() {
        window.removeEventListener("resize", this.resizeHandler);
    },
};
</script>

<style lang="scss" scoped>
.backdrop {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.201);
    position: fixed;
}
.sidebar {
    @apply grid relative max-h-screen content-start transition-transform z-40 top-0 bottom-0 bg-white border-r border-lightGray border-solid;

    @media only screen and (max-width: 426px) {
        @apply absolute top-0 bottom-0 z-40;
    }

    .navbar-container {
        @apply overflow-y-auto overflow-x-clip pb-2;

        .navbar {
            @apply leading-4;
            font-size: 13px;

            @media only screen and (max-width: 765px) {
                @apply grid gap-2 pt-4;
            }

            @media only screen and (max-width: 426px) {
                @apply grid gap-2 pt-0;
            }

            .navbar-list {
                @apply mx-4 md:my-3 relative;

                &:not([class*="has-child"]) {
                    @apply flex;
                }

                > a,
                button {
                    @apply transition-all hover:bg-primaryTransparent flex flex-1 items-center;
                    > span {
                        &:first-child {
                            @apply self-start;
                            margin-top: 4px;
                        }

                        &:last-child {
                            @apply transition-all;
                        }
                    }
                    &.router-link-active {
                        @apply bg-primaryTransparent;

                        > span:last-child {
                            transform: rotate(180deg);
                        }
                    }
                }

                &:hover {
                    &::after {
                        @apply block md:hidden;
                    }
                }
            }
        }

        .navbar-child {
            @apply rounded-xl mt-3 grid gap-2;
            li.navbar-list {
                @apply mx-0 my-0 relative flex;
            }
        }
    }

    .logout-btn {
        @apply grid absolute bottom-4 md:bottom-0 left-0 right-0 px-4 md:px-8 md:py-4;
        font-size: 0.8rem;
    }

    .menu-btn {
        @apply flex px-3 py-2 gap-2 items-center rounded-xl text-left;
        min-height: 40px;

        > span {
            &:last-child {
                /* @apply hidden md:block; */
            }
        }
    }
}
</style>

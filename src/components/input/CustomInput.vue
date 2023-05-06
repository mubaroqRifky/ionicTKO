<template lang="">
    <span class="relative">
        <label
            class="label-container"
            :class="dir == 'row' ? 'grid md:flex gap-2 md:gap-4' : 'grid gap-1'"
        >
            <span
                class="whitespace-normal text-xs mt-1"
                :class="spanClass"
                v-if="label"
            >
                {{ label }}
                <i v-if="required" class="text-danger">*</i>
            </span>

            <div
                class="w-full relative input-wrapper flex-1"
                :class="[
                    required && validity.message
                        ? 'danger focus-error'
                        : 'primary focus-primary',
                    '',
                ]"
            >
                <input
                    v-if="
                        type == 'text' ||
                        type == 'number' ||
                        type == 'email' ||
                        type == 'password' ||
                        type == 'checkbox'
                    "
                    :type="type"
                    :class="[
                        gundul ? 'input-border' : 'input-base',
                        classContainer,
                    ]"
                    :readonly="readonly"
                    :placeholder="placeholder"
                    v-model="content"
                    :disabled="disabled"
                    @input="handleInput"
                    :style="{
                        'padding-right': type == 'number' && '5px',
                        width: type == 'checkbox' && 'auto',
                    }"
                />

                <slot v-if="type == 'button'" name="button"></slot>

                <v-select
                    v-if="type == 'select'"
                    :options="options"
                    :reduce="reduce"
                    :label="optionLabel"
                    :placeholder="placeholder"
                    v-model="content"
                    :disabled="disabled"
                ></v-select>

                <slot v-if="type == 'file'" name="file"></slot>

                <Datepicker
                    v-if="
                        type == 'date' || type == 'month' || type == 'date-time'
                    "
                    position="center"
                    format="dd/MM/yyyy"
                    preview-format="dd/MM/yyyy"
                    :enable-time-picker="false"
                    :day-names="[
                        'Sen',
                        'Sel',
                        'Rab',
                        'Kam',
                        'Jum',
                        'Sab',
                        'Min',
                    ]"
                    v-model="content"
                    :disabled="disabled"
                    :auto-apply="true"
                    :placeholder="placeholder"
                    locale="id-ID"
                ></Datepicker>

                <textarea
                    v-if="type == 'textarea'"
                    rows="5"
                    class="h-full"
                    :class="[
                        required && validity.message
                            ? gundul
                                ? 'danger'
                                : 'danger focus-error'
                            : gundul
                            ? 'primary'
                            : 'primary focus-primary',
                        gundul ? 'input-border' : 'input-base',
                        classContainer,
                    ]"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    v-model="content"
                    @input="handleInput"
                ></textarea>

                <span
                    class="absolute right-1 transform z-10 icon-error"
                    :class="[
                        disabled ? 'bg-softGray' : 'bg-white',
                        type == 'textarea'
                            ? 'top-4 -translate-y-1/2'
                            : 'top-1/2 -translate-y-1/2',
                    ]"
                    v-if="required && validity.message"
                >
                    <IconInputError
                        className="text-danger "
                        width="20px"
                        height="20px"
                    />

                    <p
                        class="text-danger text-xs absolute hidden input-tooltip"
                    >
                        {{ validity.message }}
                    </p>
                </span>

                <IconSearch
                    v-if="icon == 'search'"
                    className="absolute text-primary right-2 top-1/2 -translate-y-1/2 pointer-events-none "
                    width="20px"
                />
            </div>
        </label>

        <span
            class="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 icon-error cursor-pointer mt-3.5 md:mt-0"
            v-if="info"
            title="info"
            @click="$emit('showInfo')"
        >
            <IconInputInfo
                className="text-danger "
                width="20px"
                height="20px"
            />
        </span>
    </span>
</template>

<script>
import IconInputError from "../icons/IconInputError.vue";
import IconInputInfo from "../icons/IconInputInfo.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

export default {
    name: "InputText",
    data() {
        return {
            content: this.value,
            invalid: this.validity,
        };
    },
    components: { IconInputError, IconInputInfo, IconSearch },
    props: {
        options: {
            type: Array,
            default: function () {
                return [];
            },
        },
        type: {
            type: String,
            default: "text",
        },
        label: {
            type: String,
            default: "",
        },
        spanClass: {
            default: "w-full md:w-44",
        },
        placeholder: {
            type: String,
            default: "",
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        value: {
            default: "",
        },
        dir: {
            default: "row",
        },
        info: {
            type: Boolean,
            default: false,
        },
        classContainer: {
            default: "",
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        gundul: {
            type: Boolean,
            default: false,
        },
        validity: {
            type: Object,
            default: function () {
                return {
                    value: true,
                };
            },
        },
        reduce: {
            type: Function,
            default: function () {},
        },
        optionLabel: {
            type: String,
            default: "label",
        },
        icon: {
            type: String,
            default: "",
        },
    },
    watch: {
        validity(newValue, oldValue) {
            this.getInvalid = newValue;
        },

        value(newValue) {
            this.content = newValue;
        },
        disabled(newValue) {},
        content(newValue, oldValue) {
            switch (this.type) {
                case "select":
                    this.getInvalid.message = "";
                    this.$emit("inputs", newValue);
                    break;
                case "date":
                    this.getInvalid.message = "";
                    if (!!newValue) this.$emit("inputs", newValue);
                    break;
                default:
                    break;
            }
        },
    },
    computed: {
        getInvalid: {
            get() {
                return this.invalid;
            },
            set(value) {
                this.invalid = value;
            },
        },
    },
    methods: {
        handleInput(e) {
            this.getInvalid.message = "";
            this.$emit("inputs", this.content);
        },
    },
};
</script>

<style lang="scss">
.input-base {
    @apply rounded-md px-4 py-4 text-sm w-full outline-2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
}

.input-border {
    @apply py-2 px-2 text-sm w-full border-b;
    border-width: 0.5px;

    &:disabled {
        @apply bg-softGray border-none;
    }
}

.input-wrapper {
    &.primary {
        input,
        textarea {
            /* @apply border-gray-dark; */

            &:disabled {
                @apply bg-softGray border-darkGray;
            }
        }
    }

    &.danger {
        input,
        textarea {
            @apply border-danger;

            &:disabled {
                @apply bg-softGray border-darkGray;
            }
        }

        .vs__search {
            border: none !important;
        }

        .vs__dropdown-toggle,
        .dp__input_reg {
            border: 1px solid #c92e2e !important;
        }
    }

    &.focus-primary {
        input,
        textarea {
            &.input-base:focus {
                @apply outline outline-primaryTransparent border-primaryOutline;
            }
        }
    }

    &.focus-error {
        input,
        textarea {
            &.input-base:focus {
                @apply outline  outline-dangerOutline;
            }
        }
    }
}

.label-container {
    /* @apply items-baseline; */
}

.icon-error {
    &:hover p {
        @apply block absolute;
        line-height: 12px;

        &.input-tooltip {
            right: 0;
            bottom: 20px;
            width: max-content;
            max-width: 150px;
            background: #ffe1e1;
            padding: 5px 10px;
            border-radius: 5px;
        }

        &.input-tooltip-success {
            right: 0;
            bottom: 20px;
            width: max-content;
            max-width: 150px;
            background: rgb(228, 247, 230);
            padding: 5px 10px;
            border-radius: 5px;
        }
    }
}

.mx-datepicker {
    width: 100%;
}

.vs__dropdown-toggle,
.dp__input_reg {
    /* border: 1px solid black !important; */
    border: none;
    border-radius: 0.375rem !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
    @apply bg-white px-4 py-3.5;
}
.dp__disabled {
    border-color: #b7bcc5 !important;
}

.dp__input_icon {
    left: auto;
    right: 0;
}

.vs__search {
    padding: 0 !important;
    font-size: 14px !important;
    color: gray !important;
}

.vs--disabled {
    .vs__dropdown-toggle {
        @apply bg-softGray;
        border-color: #b7bcc5 !important;
    }

    .vs__search {
        border: none !important;
        background: transparent !important;
    }
}
</style>

<template lang="">
    <header
        class="px-4 bg-primary text-white shadow-sm flex items-center fixed left-0 right-0 h-14 z-30 mobile-width-constraint"
    >
        <button
            aria-label="Back Button"
            alt="Back Button"
            @click="$router.go(-1)"
        >
            <IconArrowLeft width="30px" />
        </button>

        <h2 class="flex-1 text-center font-bold text-md -ml-6">
            {{ getTitle }}
        </h2>
    </header>

    <section class="mt-14 px-4 py-7 overflow-auto scroll-hidden">
        <div class="grid gap-5">
            <CustomInput
                placeholder="Nama Customer"
                required
                :disabled="loading || loadData"
                :validity="errors.nm_customer"
            />
            <CustomInput
                placeholder="NIK"
                required
                :disabled="loading || loadData"
                :validity="errors.nik"
            />
            <CustomInput
                placeholder="Alamat Customer"
                type="textarea"
                required
                :disabled="loading || loadData"
                :validity="errors.customer_address"
            />
            <CustomInput
                placeholder="Nomor Telepon"
                required
                :disabled="loading || loadData"
                :validity="errors.telp_customer"
            />
            <CustomInput
                placeholder="Email"
                type="email"
                required
                :disabled="loading || loadData"
                :validity="errors.email_customer"
            />
            <CustomSelect
                dir="col"
                :api="api_operation"
                class="lg:w-3/4"
                :reduce="
                    (val) => ({ selected: val.marea_operation_id, data: val })
                "
                label_option="marea_operation_name"
                placeholder="Pilih Area Operation"
                label="Area Operation"
                :value="form.area_operation_code"
                :required="true"
                :disabled="loading || loadData"
                :validity="errors.area_operation_code"
                @select="
                    (val) => selectSearchHandler(val, 'area_operation_code')
                "
            />
            <CustomInput
                dir="col"
                class="lg:w-3/4"
                label="Area"
                type="select"
                required
                :disabled="loading || loadData || !form.area_operation_code"
                :options="options.sub_area"
                placeholder="Pilih Area"
                :value="form.sub_area"
                :validity="errors.sub_area"
                @inputs="(val) => selectHandler(val, 'sub_area')"
                :reduce="(val) => val.marea_id"
                optionLabel="marea_name"
            />
            <CustomInput
                placeholder="Jumlah Kolam"
                type="number"
                required
                :disabled="loading || loadData"
                :validity="errors.jml_kolam"
            />
            <CustomSelect
                dir="col"
                :api="api_pakan"
                class="lg:w-3/4"
                :reduce="(val) => ({ selected: val.mfeed_id, data: val })"
                :create-option="
                    (val) => ({
                        text: `${val.mfeed_code} - ${val.mcompany_feed_name}`,
                        ...val,
                    })
                "
                label_option="text"
                placeholder="Pilih Pakan"
                label="Pakan"
                :value="form.kd_pakan1"
                :required="true"
                :disabled="loading || loadData"
                :validity="errors.kd_pakan1"
                @select="(val) => selectSearchHandler(val, 'kd_pakan1')"
            />
            <CustomInput
                dir="col"
                class="lg:w-3/4"
                label="Metode Pembayaran"
                type="select"
                required
                :disabled="loading || loadData"
                :options="options.metode_bayar"
                placeholder="Pilih Metode Pembayaran"
                :value="form.metode_bayar"
                :validity="errors.metode_bayar"
                @inputs="(val) => selectHandler(val, 'metode_bayar')"
                :reduce="(val) => val.method_code"
                optionLabel="method_name"
            />
            <CustomInput
                placeholder="Keterangan"
                type="textarea"
                required
                :disabled="loading || loadData"
                :validity="errors.keterangan"
            />
        </div>

        <div class="grid mt-5" v-if="action != PAGE_ACTION.SHOW">
            <button class="btn btn-secondary" @click="prosesHandler">
                {{ getActionButton }}
            </button>
        </div>
    </section>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconAdd from "@/components/icons/IconAdd.vue";

import InputSearch from "@/components/input/InputSearch.vue";
import CustomInput from "@/components/input/CustomInput.vue";

import InputValidation from "@/controllers/state/InputValidation";
import Modal from "@/controllers/state/Modal";
import Loading from "@/controllers/state/Loading";

import Customer from "@/apis/Customer";
import Area from "@/apis/Area";
import Pakan from "@/apis/Pakan";
import Payment from "@/apis/Payment";

export default {
    data() {
        return {
            page: 1,
            minPage: 10,
            totalPage: 1,
            totalData: 1,
            currentTotal: 1,

            search: "",
            timeoutSearch: null,

            loadData: false,
            loadMore: false,

            api_payment: new Payment(),
            api_pakan: new Pakan(),
            api_area: new Area(),
            api_operation: new Area("area/operation"),
            api: new Customer(),

            form: {
                nm_customer: "",
                customer_address: "",
                nik: "",
                telp_customer: "",
                email_customer: "",
                area_operation_code: "",
                sub_area: "",
                jml_kolam: "",
                kd_pakan1: "",
                metode_bayar: "",
                keterangan: "",
            },
            errors: {},

            options: {
                area_operation_code: [],
                sub_area: [],
                kd_pakan1: [],
                metode_bayar: [],
            },

            action: "",
            id: "",
            PAGE_ACTION: {
                CREATE: "create",
                EDIT: "edit",
                SHOW: "show",
            },
        };
    },
    components: { IconArrowLeft, IconEdit, InputSearch, IconAdd, CustomInput },
    getErrorsState(newValue) {
        this.errors = newValue;
    },
    computed: {
        loading() {
            return Loading.get();
        },
        getErrorsState() {
            return InputValidation.get();
        },
        getTitle() {
            switch (this.$route.name) {
                case "customer-create":
                    return "Isi Data " + this.$route.meta.label;
                case "customer-edit":
                    return "Edit Data " + this.$route.meta.label;
                case "customer-show":
                    return "Lihat Data " + this.$route.meta.label;
                default:
                    return "Default Title";
            }
        },
        getActionButton() {
            switch (this.$route.name) {
                case "customer-create":
                    return "Tambahkan";
                case "customer-edit":
                    return "Ubah";
                default:
                    return "Default Text";
            }
        },
    },
    methods: {
        pushNotFound() {
            this.$router
                .replace({
                    name: "not-found",
                    params: { pathMatch: "404" },
                })
                .catch(() => {});
        },
        actionRoute(action, id) {
            switch (action) {
                case this.PAGE_ACTION.CREATE:
                    break;
                case this.PAGE_ACTION.EDIT:
                    if (!id) this.pushNotFound();
                    else this.getDataById(id);
                    break;
                case this.PAGE_ACTION.SHOW:
                    break;
                default:
                    this.pushNotFound();
                    break;
            }
        },

        async selectSearchHandler({ selected, data }, key) {
            try {
                this[key] = selected || "";
                switch (key) {
                    case "area_operation_code":
                        if (selected && data) {
                            await this.getDataSubArea(selected);
                            this.form[key] = data?.marea_operation_name || "";
                        }
                        this.form.sub_area = "";
                        break;
                    case "kd_pakan1":
                        this.form[key] = data?.mfeed_code || "";
                        break;
                    default:
                        break;
                }
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
        async selectHandler(value, key) {
            try {
                this.form[key] = value;
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },

        prosesHandler() {
            Modal.confirm("Yakin ingin simpan data?");
            Modal.onconfirm = this.submitData;
        },
        async submitData() {
            try {
                Loading.start();

                let options = {};
                if (this.action == this.PAGE_ACTION.EDIT) {
                    options.id = this.id;
                    options.method = "put";
                } else {
                    options.method = "post";
                }

                const { data } = await this.api.postData(this.form, options);
                Modal.success(data.message);
                Modal.onclose = () => {
                    this.$router.replace({ name: "customer" });
                };
                Loading.stop();
            } catch (error) {
                Loading.stop();
                Modal.close();
                throw new ErrorHandler(error);
            }
        },

        async getDataById(id) {
            try {
                Loading.start();
                const {
                    data: { data },
                } = await this.api.getData({ id });

                await this.getDataSubArea(data.area_operation_code);

                for (const key in this.form) this.form[key] = data[key] || "";

                this.area_operation_code = data.area_operation_code;
                this.kd_pakan1 = data.kd_pakan1;
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },

        async getDataSubArea(operation_id) {
            try {
                Loading.start();
                const { data } = await this.api_area.getData({
                    params: {
                        marea_operation_id: operation_id,
                    },
                });

                this.options.sub_area = data.data;
                Loading.stop();
            } catch (error) {
                Loading.stop();
                throw new ErrorHandler(error);
            }
        },
        async getDataList() {
            try {
                const params = {
                    per_page: 1000,
                };

                const { data } = await this.api_payment.getData({
                    params,
                    id: "method",
                });

                this.options.metode_bayar = data.data;
            } catch (error) {
                throw new ErrorHandler(error);
            }
        },
    },
    created() {
        this.action = this.$route.meta.action;
        this.id = this.$route.params.id;

        this.getDataList();
        this.actionRoute(this.action, this.id);
    },
};
</script>

<style lang=""></style>

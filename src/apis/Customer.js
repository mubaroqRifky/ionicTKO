import BaseAPI from "./BaseAPI";

export default class Customer extends BaseAPI {
    path_url = "customer";

    /**
     * @payload create, edit {
     *  area_operation_code
     *  customer_address
     *  email_customer
     *  jml_kolam
     *  kd_pakan1
     *  keterangan
     *  metode_bayar
     *  nik
     *  nm_customer
     *  sub_area
     *  telp_customer
     * }
     *
     * @params delete, show, edit { id }
     */
    constructor(path_url) {
        super(path_url);
    }
}

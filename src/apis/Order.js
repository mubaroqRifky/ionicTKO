import BaseAPI from "./BaseAPI";

export default class Order extends BaseAPI {
    path_url = "order";

    /**
     * @payload create, edit {
     *  kd_mitra
     *  tipe_konstruksi
     *  bentuk_kolam
     *  luas_kolam
     * }
     *
     * @params delete, show, edit { id }
     */
    constructor(path_url) {
        super(path_url);
        if (path_url) this.path_url = path_url;
    }
}

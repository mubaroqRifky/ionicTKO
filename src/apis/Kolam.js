import BaseAPI from "./BaseAPI";

export default class Kolam extends BaseAPI {
    path_url = "kolamasd";

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

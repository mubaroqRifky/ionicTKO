import BaseAPI from "./BaseAPI";

export default class Mitra extends BaseAPI {
    path_url = "mitra";

    /**
     * @payload create, edit {
     *  nm_mitra
     *  marea_operation_id
     *  marea_id
     *  location
     *  status_mitra
     *  kecamatan
     *  kabupaten
     *  provinsi
     * }
     *
     * @params delete, show, edit { id }
     */
    constructor(path_url) {
        super(path_url);
    }
}

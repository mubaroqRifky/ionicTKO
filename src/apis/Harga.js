import BaseAPI from "./BaseAPI";

export default class Harga extends BaseAPI {
    path_url = "price";

    /**
     * @payload create, edit {
     *  area_operation
     *  area_id
     *  kd_benih
     *  price
     *  valid_from
     *  valid_to
     * }
     *
     * @params delete, show, edit { id }
     */
    constructor(path_url) {
        super(path_url);
    }
}

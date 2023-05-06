import BaseAPI from "./BaseAPI";

export default class Benih extends BaseAPI {
    path_url = "benih";

    /**
     * @payload create {
     *  kd_benih
     *  nm_benih
     *  size
     *  unit
     *  image
     * }
     *
     * @payload edit {
     *  _method
     *  nm_benih
     *  size
     *  unit
     *  image
     * }
     *
     * @params delete, show, edit { id }
     */
    constructor(path_url) {
        super(path_url);
    }
}

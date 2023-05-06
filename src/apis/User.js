import BaseAPI from "./BaseAPI";

export default class User extends BaseAPI {
    path_url = "user";

    /**
     * @payload create, edit { nik, name, email }
     *
     * @params delete, show, edit { id }
     *
     * @prepend sync/roles @payload
     * { id, roles[] }
     *
     * @prepend sync/permissions @payload
     * { id, permissions[] }
     *
     * @prepend sync/area @payload
     * { id, area[] }
     */
    constructor(path_url) {
        super(path_url);
    }
}

import BaseAPI from "./BaseAPI";

export default class Role extends BaseAPI {
    path_url = "role";

    /**
     * @payload create, edit { name }
     *
     * @params delete, show, edit { id }
     *
     * @prepend sync/permissions @payload
     * { id, permissions[] }
     */
    constructor(path_url) {
        super(path_url);
    }
}

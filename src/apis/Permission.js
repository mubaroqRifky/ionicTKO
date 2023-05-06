import BaseAPI from "./BaseAPI";

export default class Permission extends BaseAPI {
    path_url = "permission";

    /**
     * @payload create, edit { name, description }
     *
     * @params delete, show, edit { id }
     */
    constructor(path_url) {
        super(path_url);
    }
}

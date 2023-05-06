import BaseAPI from "./BaseAPI";

export default class Profile extends BaseAPI {
    path_url = "profile";

    constructor(path_url) {
        super(path_url);
    }
}

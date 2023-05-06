import BaseAPI from "./BaseAPI";

export default class Logs extends BaseAPI {
    path_url = "log";

    constructor(path_url) {
        super(path_url);
    }
}

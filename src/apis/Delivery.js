import BaseAPI from "./BaseAPI";

export default class Delivery extends BaseAPI {
    path_url = "delivery";

    constructor(path_url) {
        super(path_url);
    }
}

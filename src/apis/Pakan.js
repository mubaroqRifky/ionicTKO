import BaseAPI from "./BaseAPI";

export default class Pakan extends BaseAPI {
    path_url = "feed";

    /**
     * @params Get All
     * { id: company }
     *
     * @query_params Get by Company
     * { mcompany_feed_id }
     */
    constructor(path_url) {
        super(path_url);
    }
}

import BaseAPI from "./BaseAPI";

export default class Area extends BaseAPI {
    path_url = "area";

    /**
     * @params Get All Area Operation
     * { id: operation }
     *
     * @query_params Get Area by Operation ID
     * { marea_operation_id }
     *
     * @params Get Sub Area Area ID { id: sub }
     * @query_params Get Sub Area Area ID
     * { marea_id }
     */
    constructor(path_url) {
        super(path_url);
        if (path_url) {
            this.path_url = path_url;
        }
    }
}

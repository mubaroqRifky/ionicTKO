import BaseAPI from "./BaseAPI";

export default class Payment extends BaseAPI {
    path_url = "payment";

    /**
     * @params Get All Payment Method
     * { id: method }
     *
     * @params Get All Tipe Konstruksi
     * { id: tipekonstruksi }
     *
     * @params Get All Bentuk Kolam
     * { id: bentuk }
     *
     * @params Get All Status Mitra
     * { id: status }
     */
    constructor(path_url) {
        super(path_url);
    }
}

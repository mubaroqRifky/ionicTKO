import BaseAPI from "./BaseAPI";

export default class Approval extends BaseAPI {
    path_url = "approval";

    /**
     * @query_params Get All Approval
     * { status[] }
     *
     * @params Get Detail Approval
     * { id }
     *
     * @params Get Stock List { id: stock }
     * @query_params Get Stock List {
     *  kd_order_header
     *  kd_benih
     *  area_id
     * }
     *
     * @params Booking Stock { id: stock } @payload
     * {
     *  kd_order_header
     *  kd_benih
     *  detail[] { kd_mitra, area_id, qty_booked, qty_allowance }
     * }
     *
     *  @params Approve { id } @payload
     *  {
     *  approve,
     *  reason @only if approve false
     * }
     */
    constructor(path_url) {
        super(path_url);
    }
}

module.exports = function (request, response, next) {
    paginationCurrentPage = request.body.current_page
    paginationLimitPage = request.body.limit_page
    paginationOffset = (paginationCurrentPage * paginationLimitPage) - paginationLimitPage
    paginationTotalPage = Math.ceil(paginationCountRowsPage / paginationLimitPage)
}
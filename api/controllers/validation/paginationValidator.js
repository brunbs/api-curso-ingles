exports.paginationValidatorBuilder = function(givenPage, givenSize, givenOrder) {

    let page = 0;
    if (!Number.isNaN(givenPage) && givenPage > 0) {
        page = givenPage;
    }

    let size = 10;
    if (!Number.isNaN(givenSize) && givenSize > 0 && givenSize < 10) {
        size = givenSize;
    }

    let order = 'ASC';
    if (givenOrder === 'DESC') {
        order = givenOrder;
    }

    return {order, page, size};
}
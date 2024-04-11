
async function pagination(model, page, numItemsPage, modelInclude) {
    let offset;
    let next;

    if (page === 0) {
        offset = 0;
    } else {
        offset = page * numItemsPage;
    }

    const options = {
        limit: numItemsPage,
        offset: offset
    };

    if (modelInclude) {
        options.include = [{ model: modelInclude }];
    }

    const { count, rows } = await model.findAndCountAll(options);

    next = offset + numItemsPage < count;

    const numPages = parseInt(count / numItemsPage);

    return { data: rows, next, numPages };
}

module.exports = pagination;

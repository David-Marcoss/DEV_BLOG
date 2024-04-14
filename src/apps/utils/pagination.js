
async function pagination(model, page, numItemsPage, modelInclude, ordering) {
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
        options.include = modelInclude.map(e => ({ model: e }));
    }

    if(ordering){
        options.ordering = [["id","DESC"]]
    }

    const { count, rows } = await model.findAndCountAll(options);

    next = offset + numItemsPage < count;

    const numPages = parseInt(count / numItemsPage);

    return { data: rows, next, numPages };
}

module.exports = pagination;

const calcPagnationData = ({ total, page, perPage }) => {
    const totalPages = Math.ceil((total / perPage));
    console.log(totalPages)
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
        totalPages,
        hasNextPage,
        hasPrevPage,
    }
};

export default calcPagnationData;

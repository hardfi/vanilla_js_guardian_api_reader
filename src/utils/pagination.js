export const pageDown = (pagination, callback) => {
    const { currentPage } = pagination;
    if (currentPage > 1) {
        pagination.currentPage--;
        callback();
    }
};

export const pageUp = (pagination, callback) => {
    const { currentPage, pages } = pagination;
    if (currentPage < pages) {
        pagination.currentPage++;
        callback();
    }
};

export const updateCurrentPageNumber = (
    pagination,
    currentPageId,
    totalPagesId
) => {
    const { currentPage, pages } = pagination;
    const pageContainer = document.getElementById(currentPageId);
    const totalPagesContainer = document.getElementById(totalPagesId);
    pageContainer.innerText = currentPage;
    totalPagesContainer.innerText = pages;
};

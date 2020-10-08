import { PAGE_SIZE } from '../constants';

export class Pagination {
    constructor({ currentPage = 1, pages = 1, total = 1 }) {
        this.currentPage = currentPage;
        this.pageSize = PAGE_SIZE;
        this.pages = pages;
        this.total = total;
    }
}

import { api_fetch } from './utils/fetch';
import { formatDateForApi, subtractDays } from './utils/date';
import { Article } from './models/article.model';
import {
    DAYS_BACK,
    INPUT_DEBOUNCE_TIME,
    STORAGE_READ_LATER_KEY,
} from './constants';
import { Pagination } from './models/pagination.model';
import { pageDown, pageUp, updateCurrentPageNumber } from './utils/pagination';
import { getArticleTemplate, getReadLaterArticleTemplate } from './templates';
import localStorage from './utils/localStorage';
import { debounce } from './utils/debounce';
import { warning } from './utils/toast';

window.addEventListener('DOMContentLoaded', () => {
    let pagination = new Pagination({});
    let articles = [];
    let searchQuery = '';
    let section = '';
    let isTopMenuOpen = false;

    const getArticles = () => {
        const startDate = formatDateForApi(subtractDays(new Date(), DAYS_BACK));
        api_fetch(
            { q: searchQuery, 'from-date': startDate, section },
            pagination
        ).then((response) => {
            pagination = new Pagination(response);
            articles = response.results.map((article) => new Article(article));
            updateCurrentPageNumber(pagination, 'pageNumber', 'totalPages');
            renderArticles();
        });
    };

    const initSubscribers = () => {
        const buttonUp = document.querySelector('.button-up');
        const buttonDown = document.querySelector('.button-down');
        const newsContentSearch = document.getElementById('newsContentSearch');
        const sectionSelect = document.getElementById('sectionSelect');
        const readLaterPopUp = document.querySelector('.readLaterPopUp');
        const readLaterIcon = document.getElementById('readLaterIcon');
        const debouncedGetArticles = debounce(getArticles, INPUT_DEBOUNCE_TIME);

        newsContentSearch.addEventListener('input', ({ target }) => {
            searchQuery = target.value;
            debouncedGetArticles();
        });
        sectionSelect.addEventListener('change', ({ target }) => {
            section = target.value;
            getArticles();
        });
        buttonDown.addEventListener('click', () =>
            pageDown(pagination, getArticles)
        );
        buttonUp.addEventListener('click', () => pageUp(pagination, getArticles));
        readLaterPopUp.addEventListener('click', (e) => e.stopPropagation());
        readLaterIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleReadLaterMenu();
        });
    };

    const readLaterAdd = (article) => {
        const readLater =
      JSON.parse(localStorage.get(STORAGE_READ_LATER_KEY)) || [];
        if (!readLater.find((a) => a.id === article.id)) {
            localStorage.set(
                STORAGE_READ_LATER_KEY,
                JSON.stringify([...readLater, article])
            );
            renderReadLaterList();
        } else {
            warning('You have already added this article to your Read Later list');
        }
    };

    const readLaterRemove = (article) => {
        const readLater = JSON.parse(localStorage.get(STORAGE_READ_LATER_KEY));
        const elementToRemoveIndex = readLater.findIndex(
            (a) => a.id === article.id
        );
        readLater.splice(elementToRemoveIndex, 1);
        localStorage.set(STORAGE_READ_LATER_KEY, JSON.stringify(readLater));
        renderReadLaterList();
    };

    const renderArticles = () => {
        const newsList = document.querySelector('.newsList');
        const emptyInfoContainer = document.getElementById('emptyList');
        newsList.innerHTML = '';
        if (!articles.length) {
            emptyInfoContainer.style.display = 'block';
        } else {
            articles.forEach((article, id) => {
                const listElement = document.createElement('div');
                listElement.innerHTML = getArticleTemplate(article, id);
                newsList.appendChild(listElement);
                const readLaterButton = document.getElementById('readLater-' + id);
                readLaterButton.addEventListener('click', () => readLaterAdd(article));
            });
            emptyInfoContainer.style.display = 'none';
        }
    };

    const renderReadLaterList = () => {
        const readLater =
      JSON.parse(localStorage.get(STORAGE_READ_LATER_KEY)) || [];
        const readLaterListContainer = document.getElementById('readLaterList');
        readLaterListContainer.innerHTML = '';
        if (readLater.length) {
            readLater.forEach((article, id) => {
                const listElement = document.createElement('div');
                listElement.innerHTML = getReadLaterArticleTemplate(article, id);
                readLaterListContainer.appendChild(listElement);
                const readLaterRm = document.getElementById('removeReadLater-' + id);
                readLaterRm.addEventListener('click', () => readLaterRemove(article));
            });
        }
        updateReadLaterNotification(readLater);
    };

    const updateReadLaterNotification = (articles) => {
        const notificationContainer = document.getElementById('notification');
        if (articles.length) {
            notificationContainer.innerText = articles.length;
            notificationContainer.style.display = 'initial';
        } else {
            notificationContainer.style.display = 'none';
        }
    };

    const toggleReadLaterMenu = () => {
        const body = document.querySelector('body');
        isTopMenuOpen = !isTopMenuOpen;
        document.querySelector('.readLaterPopUp').classList.toggle('show');
        if (isTopMenuOpen) {
            body.addEventListener('click', toggleReadLaterMenu);
        } else {
            body.removeEventListener('click', toggleReadLaterMenu);
        }
    };

    (function onInit() {
        getArticles();
        initSubscribers();
        renderReadLaterList();
    })();
});

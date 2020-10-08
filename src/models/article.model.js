export class Article {
    constructor({ id, webTitle, sectionName, webPublicationDate, webUrl }) {
        this.title = webTitle;
        this.sectionName = sectionName;
        this.publicationDate = webPublicationDate;
        this.url = webUrl;
        this.id = id;
    }
}

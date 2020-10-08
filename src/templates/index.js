export const getArticleTemplate = (article, id) => {
    const { title, sectionName, publicationDate, url } = article;

    return `
            <article class="news">
                <div class="articleBody">
                    <header>
                        <h3>${title}</h3>
                    </header>
                    <section class="newsDetails">
                        <ul>
                            <li><strong>Section Name:</strong> ${sectionName}</li>
                            <li><strong>Publication Date:</strong> ${publicationDate}</li>
                        </ul>
                    </section>
                </div>
                <section class="newsActions">
                    <a href="${url}" target="_blank" class="button">Full article</a>
                    <button class="button button-outline" id="readLater-${id}">Read Later</button>
                </section>
            </article>
        `;
};

export const getReadLaterArticleTemplate = (article, id) => {
    const { title, url } = article;

    return `
        <h5 class="readLaterItem-title">${title}</h5>
        <section class="readLaterItem-buttons">
            <a href="${url}" target="_blank" class="button button-href">Read</a>
            <button class="button" id="removeReadLater-${id}">Remove</button>
        </section>
    `;
};

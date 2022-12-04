/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-panel',
      images: '.book__image',
    },
    books: {
      list: '.books-list',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(
      document.querySelector(select.templateOf.bookTemplate).innerHTML
    ),
  };

  function renderBooksList() {

    for (let book of dataSource.books) {
      const generatedHTML = templates.bookTemplate(book);
      const domElement = utils.createDOMFromHTML(generatedHTML);
      const booksList = document.querySelector(select.books.list);
      booksList.appendChild(domElement);
    }
  }

  renderBooksList();
  
}
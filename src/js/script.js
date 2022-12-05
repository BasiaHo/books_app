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
      filtersForm: '.filters',
    },
    books: {
      list: '.books-list',
      bookImage: 'a.book__image',
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

  let favoritesBooks = [];

  function addToFavorites(event) {
    if (event.target.offsetParent.classList.contains('book__image')) {
      const clickedBook = event.target.offsetParent;
      event.preventDefault();

      const bookId = clickedBook.getAttribute('data-id');
      const bookFavorite = favoritesBooks.indexOf(bookId);

      if (bookFavorite < 0) {
        favoritesBooks.push(bookId);
      } else if (bookFavorite >= 0) {
        favoritesBooks.splice(bookFavorite, 1);
      }
      clickedBook.classList.toggle('favorite');
    }
  }

  function initAction() {
    const booksList = document.querySelector(select.books.list);
    booksList.addEventListener('dblclick', addToFavorites);
  }

  let filters = [];

  initAction();
}

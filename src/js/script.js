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
    const clickedBook = this;
    event.preventDefault();

    const bookId = clickedBook.getAttribute('data-id');
    const bookFavorite = favoritesBooks.indexOf(bookId);

    if (bookFavorite < 0) {
      favoritesBooks.push(bookId);
    } else if (bookFavorite >= 0) {
      favoritesBooks.splice(bookFavorite, 1);
    }
    console.log(favoritesBooks);
    clickedBook.classList.toggle('favorite');
  }

  function initAction() {
    const bookImage = document.querySelectorAll(select.books.bookImage);
    for (image of bookImage) {
      image.addEventListener('dblclick', addToFavorites);
    }
  }

  initAction();
}

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
      bookById: (id) => `.book__image[data-id="${id}"]`,
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(
      document.querySelector(select.templateOf.bookTemplate).innerHTML
    ),
  };

  function renderBooksList() {
    for (let book of dataSource.books) {
      console.log(book);
      const generatedHTML = templates.bookTemplate(book);
      const domElement = utils.createDOMFromHTML(generatedHTML);
      const booksList = document.querySelector(select.books.list);
      booksList.appendChild(domElement);
    }
  }

  renderBooksList();

  let favoritesBooks = [];

  function handleFavorites(event) {
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

  let filters = [];

  function handleFilters(event) {
    if (event.target.checked) {
      filters.push(event.target.value);
    } else {
      const filterIndex = filters.indexOf(event.target.value);
      filters.splice(filterIndex, 1);
    }

    filterBooks();
  }

  function filterBooks() {
    for (const book of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
        }
      }

      const bookElem = document.querySelector(select.books.bookById(book.id));

      if (shouldBeHidden) {
        bookElem.classList.add('hidden');
      } else {
        bookElem.classList.remove('hidden');
      }
    }
  }

  function initAction() {
    const booksList = document.querySelector(select.books.list);
    booksList.addEventListener('dblclick', handleFavorites);

    const filtersForm = document.querySelector(select.containerOf.filtersForm);
    filtersForm.addEventListener('click', handleFilters);

    filterBooks();
  }

  initAction();
}

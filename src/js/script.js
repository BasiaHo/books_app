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
      rating: '.book__rating__fill',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(
      document.querySelector(select.templateOf.bookTemplate).innerHTML
    ),
  };

  function renderBooksList() {
    //const ratingWidth =

    for (let book of dataSource.books) {
      console.log(book);
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = ratingWidth(book.rating);

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

  function determineRatingBgc(rating) {
    if (rating < 6) {
    return "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
    }
    else if (rating > 6 && rating <= 8) {
        return "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
        }
    else if (rating  > 8 && rating <= 9) {
        return "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
        }
    else if (rating > 9) {
        return "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
    }
  }

  function ratingWidth(rating) {
    return rating*10;
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

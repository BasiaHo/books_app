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

  class BooksList {
    constructor(element) {
      const thisBooksList = this;

      thisBooksList.favoritesBooks = [];
      thisBooksList.filters = [];

      thisBooksList.initData();
      thisBooksList.getElements(element);
      thisBooksList.renderBooksList();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(element) {
      const thisBooksList = this;

      thisBooksList.dom = {};

      thisBooksList.dom.wrapper = element;
      thisBooksList.dom.filtersForm = document.querySelector(
        select.containerOf.filtersForm
      );
    }

    renderBooksList() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = thisBooksList.determineRatingWidth(book.rating);

        const generatedHTML = templates.bookTemplate(book);
        const domElement = utils.createDOMFromHTML(generatedHTML);

        thisBooksList.dom.wrapper.appendChild(domElement);
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.dom.wrapper.addEventListener(
        'dblclick',
        thisBooksList.handleFavorites.bind(thisBooksList)
      );
      thisBooksList.dom.filtersForm.addEventListener(
        'click',
        thisBooksList.handleFilters.bind(thisBooksList)
      );

      thisBooksList.filterBooks();
    }

    handleFavorites(event) {
      const thisBooksList = this;

      if (event.target.offsetParent.classList.contains('book__image')) {
        const clickedBook = event.target.offsetParent;
        event.preventDefault();

        const bookId = clickedBook.getAttribute('data-id');
        const bookFavorite = thisBooksList.favoritesBooks.indexOf(bookId);

        if (bookFavorite < 0) {
          thisBooksList.favoritesBooks.push(bookId);
        } else if (bookFavorite >= 0) {
          thisBooksList.favoritesBooks.splice(bookFavorite, 1);
        }
        clickedBook.classList.toggle('favorite');
      }
    }

    handleFilters(event) {
      const thisBooksList = this;

      if (event.target.checked) {
        thisBooksList.filters.push(event.target.value);
      } else {
        const filterIndex = thisBooksList.filters.indexOf(event.target.value);
        thisBooksList.filters.splice(filterIndex, 1);
      }

      thisBooksList.filterBooks();
    }

    filterBooks() {
      const thisBooksList = this;

      for (const book of thisBooksList.data) {
        let shouldBeHidden = false;

        for (const filter of thisBooksList.filters) {
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

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }

    determineRatingWidth(rating) {
      return rating * 10;
    }
  }

  const booksListElem = document.querySelector(select.books.list);
  new BooksList(booksListElem);
}

function getTotalBooksCount(books) {
  return getLength(books);
}

function getTotalAccountsCount(accounts) {
  return getLength(accounts);
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (books[i].borrows[j].returned === false) {
        count++;
      }
    }
  }
  return count;
}

function getMostCommonGenres(books) {
  let result = [];
  let countedGenres = [];
  const allGenres = books.map((book) => book.genre);
  const allGenreObjects = books.map((book) =>
    genreCount(allGenres, book.genre)
  );
  for (let i = 0; i < allGenreObjects.length; i++) {
    if (
      countedGenres.includes(allGenreObjects[i]) === false &&
      countedGenres.length < 5
    ) {
      countedGenres.push(allGenreObjects[i]);
    }
  }
  countedGenres.sort((objA, objB) => objB.count - objA.count);
  return countedGenres;
}

function getMostPopularBooks(books) {
  let result = [];
  const fullList = books.map((book) => makeBorrowCountObj(book));
  fullList.sort((bookA, bookB) => bookB.count - bookA.count);
  for (let i = 0; i < fullList.length; i++) {
    if (result.length < 5) result.push(fullList[i]);
  }
  return result;
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  const authorsPlusTheirBooks = addBooksToAuthor(authors, books);
  const complete = authorsPlusTheirBooks.map((author) =>
    makeNewAuthorObj(author)
  );
  complete.sort((authorA, authorB) => authorB.count - authorA.count);
  for (let i = 0; i < complete.length; i++) {
    if (result.length < 5) {
      result.push(complete[i]);
    }
  }
  return result;
}

////////////////////////////
// helper functions below //
////////////////////////////

//function below simply returns the given array's length
function getLength(array) {
  return array.length;
}
// the function below will accept an array of genres as well as a chosen genre from that array. It will filter the genres array to only hold those matching the chosen genre, then returns an object that holds the name and number of times that genre appeared in the array.
function genreCount(genresArr, chosenGenre) {
  let result = {};
  const filteredGenres = genresArr.filter((genre) => genre === chosenGenre);
  const totalGenreCount = filteredGenres.length;
  result.name = chosenGenre;
  result.count = totalGenreCount;
  return result;
}
// the function below accepts a book as an argument. will return an object that holds the title of and number of times that book was borrowed as key-value pairs.
function makeBorrowCountObj(book) {
  let borrowCountObj = {};
  borrowCountObj.name = book.title;
  borrowCountObj.count = book.borrows.length;
  return borrowCountObj;
}
// the function below accepts a books array, authors array, and an empty array to later be returned. It will first filter the books to only hold those written by a particular author, then adds those books to that author's object. It then pushes that updated author object to the empty array.
function addBooksToAuthor(authorsArr, booksArr, returnArr = []) {
  for (let i = 0; i < authorsArr.length; i++) {
    let author = authorsArr[i];
    let filtered = booksArr.filter((book) => book.authorId === author.id);
    author.writtenBooks = filtered;
    returnArr.push(author);
  }
  return returnArr;
}
// the function below uses the reduce method to create an object that will display an author's popularity based on the number of times their books are borrowed.
function makeNewAuthorObj(author) {
  let newObj = {};
  let borrowCounts = [];
  for (let i = 0; i < author.writtenBooks.length; i++) {
    borrowCounts.push(author.writtenBooks[i].borrows.length);
  }
  const totalCount = borrowCounts.reduce((acc, count) => acc + count, 0);
  newObj.name = `${author.name.first} ${author.name.last}`;
  newObj.count = totalCount;
  return newObj;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

function findAccountById(accounts, id) {
  let chosen = {};
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === id) {
      chosen = accounts[i];
    }
  }
  return chosen;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((account1, account2) =>
    account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (books[i].borrows[j].id === account.id) {
        result++;
      }
    }
  }
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = [];

  for (let i = 0; i < books.length; i++) {
    if (
      books[i].borrows[0].id === account.id &&
      books[i].borrows[0].returned === false
    ) {
      result.push(books[i]);
    }
  }
  result.forEach((book) => addInfo(book, authors));
  return result;
}

////////////////////////////
// helper functions below //
////////////////////////////

// the function below will find an author from an array of authors that wrote the book given as an argumen, then add that author's info to the book's object.
function addInfo(book, authors) {
  let found = authors.find((author) => author.id === book.authorId);
  book.author = found;
  return book;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

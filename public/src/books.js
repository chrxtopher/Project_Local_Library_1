function findAuthorById(authors, id) {
  return findItem(authors, id);
}

function findBookById(books, id) {
  return findItem(books, id);
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  const noReturned = books.filter((book) => book.borrows[0].returned === false);
  const yesReturned = books.filter((book) => book.borrows[0].returned === true);
  result.push(noReturned, yesReturned);
  return result;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  for (let i = 0; i < book.borrows.length; i++) {
    let found = accounts.find((account) => account.id === book.borrows[i].id);
    found.returned = book.borrows[i].returned;
    if (result.length < 10) result.push(found);
  }
  return result;
}

////////////////////////////
// helper functions below //
////////////////////////////

// the function below will find an item in a given array that has the same id as the given itemID
function findItem(items, itemID) {
  let found = items.find((chosen) => chosen.id === itemID);
  return found;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

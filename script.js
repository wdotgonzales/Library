const submitButton = document.querySelector('.submitButton');
const bookInput = document.querySelector('#book');
const authorInput = document.querySelector('#author');
const statusInput = document.querySelector('#status');
const container = document.querySelector('.container');
const table = document.querySelector('.table');

function clearValues(){
    bookInput.value = '';
    authorInput.value = '';
    statusInput.value = 'Read'
}

function checkInputIfEmpty(){
    if(bookInput.value == '' || authorInput.value == ''){
        alert("Please enter your Book/Author's name")
        submitButton.attributes('disabled','disabled');
    } else {
        submitButton.removeAttribute('disabled');
    }
}
    
let myLibrary = [];
    
function Book(book,author,status){
    this.book = book.value;
    this.author = author.value;
    this.status = status.value;
}

function addBookToLibrary(book){
    myLibrary.splice(0,0,{Book : book.book , Author : book.author , Status : book.status});
}

function deleteElement(element){
    element.remove();
}

function deleteObject(valueToRemove1,valueToRemove2){
    myLibrary = myLibrary.filter(myLibrary => myLibrary.Book !== valueToRemove1 || myLibrary.Author !== valueToRemove2);
}

function changeStatusValue(statusButton,p1,p2){
    if(statusButton.textContent == 'Read'){
        statusButton.textContent = 'Not Read';

        let extractedValue = myLibrary.filter(item => item.Book == p1.textContent || item.Author == p2.textContent);
        myLibrary = myLibrary.filter(item => item.Book !== p1.textContent || item.Author !== p2.textContent);
        extractedValue[0].Status = 'Not Read';
        myLibrary.splice(0,0,extractedValue[0]);
        console.log(myLibrary);

    } else {
        statusButton.textContent = 'Read'

        let extractedValue = myLibrary.filter(item => item.Book == p1.textContent || item.Author == p2.textContent);
        myLibrary = myLibrary.filter(item => item.Book !== p1.textContent || item.Author !== p2.textContent);
        extractedValue[0].Status = 'Read';
        myLibrary.splice(0,0,extractedValue[0]);
        console.log(myLibrary);
    }
}


function showArrayItems(arr){
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const statusButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    const div = document.createElement('div');
    const hr = document.createElement('hr');

    p1.textContent = arr[0].Book;
    p1.classList.add('p1');
    p2.textContent = arr[0].Author;
    p2.classList.add('p2');

    statusButton.textContent = arr[0].Status;
    statusButton.value = arr[0].Status;
    statusButton.classList.add('statusButton');

    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');


    div.append(p1);
    div.append(p2);
    div.append(statusButton);
    div.append(deleteButton);
    div.classList.add('row');
    table.append(div);
    table.append(hr);

    deleteButton.addEventListener('click',() => {
        deleteElement(div);
        deleteElement(hr);
        deleteObject(p1.textContent,p2.textContent);
        
        console.log(myLibrary);
    });

    statusButton.addEventListener('click',() => {
        changeStatusValue(statusButton,p1,p2);
    })
}

submitButton.addEventListener('click',() =>{
    checkInputIfEmpty();
    const book = new Book(bookInput,authorInput,statusInput);
    clearValues();
    addBookToLibrary(book);
    showArrayItems(myLibrary);

    console.log(myLibrary);
})


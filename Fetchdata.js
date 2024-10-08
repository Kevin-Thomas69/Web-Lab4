async function fetchdata() {
    try {
        const response = await fetch('book.xml');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const xmlDoc = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlDoc, "application/xml");
        const books = xml.getElementsByTagName("book");

        let htmlContent = '';
        for (let i = 0; i < books.length; i++) {
            const title = books[i].getElementsByTagName("title")[0].textContent;
            const author = books[i].getElementsByTagName("author")[0].textContent;
            const price = books[i].getElementsByTagName("price")[0].textContent;
            htmlContent += `Book ID: ${books[i].getAttribute('id')}<br>Title: ${title}<br>Author: ${author}<br>Price: $${price}<br><br>`;
        }
        document.getElementById("bookList").innerHTML = htmlContent;
    } catch (error) {
        console.error(`Could not fetch books: ${error}`);
        document.getElementById("bookList").innerHTML = `Error: ${error.message}`;
    }
}
document.addEventListener('DOMContentLoaded', fetchdata);
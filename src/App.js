import "./App.css";
import Pagination from "./components/Pagination";
import bookData from "./assets/books.data.json";

function App() {
  return (
    <div className="App">
      <Pagination data={bookData} booksPerPage={5} numberOfPages={5} />
    </div>
  );
}

export default App;

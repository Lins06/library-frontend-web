import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import api from "../services/api";

import {
  Search,
  BookOpen,
  LogOut,
  Plus
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    async function loadBooks() {

      try {

        const response = await api.get("/api/books");

        setBooks(response.data);

      } catch (error) {

        console.log("Erro ao buscar livros", error);

      } finally {

        setLoading(false);

      }
    }

    loadBooks();

  }, []);

  // FILTRO PESQUISA
  const filteredBooks = books.filter((book) =>
    book.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // LOADING
  if (loading) {
    return <h1>Carregando livros...</h1>;
  }

  return (
    <div className="kindle-web-layout">

      {/* SIDEBAR */}
      <aside className="k-sidebar">

        <div className="sidebar-top">

          <div className="sidebar-logo">
            <BookOpen size={28} color="#0073B1" />
            <span>Biblioteca Web</span>
          </div>

          <nav className="sidebar-nav">

            <button className="nav-item active">
              <BookOpen size={20} />
              Biblioteca
            </button>

            <button
              className="nav-item"
              onClick={() => navigate("/book-form")}
            >
              <Plus size={20} />
              Adicionar Livro
            </button>

          </nav>

        </div>

        <div className="sidebar-bottom">

          <button
            className="nav-item logout"
            onClick={() => navigate("/login")}
          >
            <LogOut size={20} />
            Sair
          </button>

        </div>

      </aside>

      {/* CONTEÚDO */}
      <main className="k-main-content">

        <header className="k-web-header">

          <div className="k-search-container">

            <Search size={18} color="#888" />

            <input
              type="text"
              placeholder="Pesquisar livros..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="header-actions">

            <div className="user-badge">
              <div className="avatar">
                U
              </div>
            </div>

          </div>

        </header>

        {/* GRID */}
        <section className="library-section">

          <div className="books-grid">

            {filteredBooks.map((book) => (

              <div
                className="book-card-kindle"
                key={book.id}
                onClick={() =>
                  navigate("/book-details", {
                    state: book
                  })
                }
                style={{ cursor: "pointer" }}
              >

                <div className="cover-container">

                  <img
                    src={
                      book.cover ||
                      "https://via.placeholder.com/300x450?text=Livro"
                    }
                    alt={book.title}
                  />

                  <div className="progress-bar-base">

                    <div
                      className="fill"
                      style={{
                        width: `${book.progress || 0}%`
                      }}
                    ></div>

                  </div>

                </div>

                <div className="book-info-under">

                  <h4 className="title">
                    {book.title}
                  </h4>

                  <p className="author">
                    {book.author}
                  </p>

                </div>
              </div>

            ))}

          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
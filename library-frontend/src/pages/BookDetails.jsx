import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Calendar, Hash, Tag, BookOpen } from "lucide-react";
import "../styles/BookDetails.css";

function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state;

  if (!book) {
    return (
      <div className="details-error-page">
        <h2>Ops! Livro não encontrado.</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={20} /> Voltar para Biblioteca
        </button>
      </div>
    );
  }

  return (
    <div className="book-details-page">
      <header className="details-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={20} /> Voltar
        </button>
        <button className="btn-edit-top" onClick={() => navigate("/book-form", { state: book })}>
          <Edit2 size={18} /> Editar Informações
        </button>
      </header>

      <main className="details-main-content">
        <div className="details-layout">
          
          <div className="details-sidebar">
            <div className="details-cover-wrapper">
              {book.coverImageUrl ? (
                <img src={book.coverImageUrl} alt={book.title} className="details-cover" />
              ) : (
                <div className="details-no-cover">
                  <BookOpen size={64} color="#ccc" />
                  <span>Sem Capa</span>
                </div>
              )}
            </div>
            
            <div className="details-reading-status">
              <div className="status-text">
                <span>ISBN</span>
                <strong>{book.isbn || "---"}</strong>
              </div>
            </div>
          </div>

          
          <div className="details-info">
            <h1 className="details-title">{book.title}</h1>
            <p className="details-author">por {book.author}</p>

            <div className="details-meta-grid">
              <div className="meta-card">
                <Tag size={20} color="#0073B1" />
                <div>
                  <label>Gênero</label>
                  <span>{book.genre || "---"}</span>
                </div>
              </div>
              <div className="meta-card">
                <Calendar size={20} color="#0073B1" />
                <div>
                  <label>Ano de Publicação</label>
                  <span>{book.publicationYear || "---"}</span>
                </div>
              </div>
              <div className="meta-card">
                <Hash size={20} color="#0073B1" />
                <div>
                  <label>ISBN</label>
                  <span>{book.isbn || "---"}</span>
                </div>
              </div>
            </div>

            <div className="details-description-box">
              <h3>Sinopse / Descrição</h3>
              <p>{book.description || "Nenhuma descrição foi adicionada para este livro ainda."}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookDetails;
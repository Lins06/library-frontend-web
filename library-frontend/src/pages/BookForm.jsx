import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, UploadCloud } from "lucide-react";
import api from "../services/api";
import "../styles/bookform.css";

function BookForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookToEdit = location.state;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    isbn: "",
    desc: "",
    cover: ""
  });

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        genre: bookToEdit.genre,
        year: bookToEdit.publicationYear.toString(),
        isbn: bookToEdit.isbn,
        desc: bookToEdit.description,
        cover: bookToEdit.coverImageUrl
      });
    }
  }, [bookToEdit]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const bookData = {
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        publicationYear: parseInt(formData.year),
        isbn: formData.isbn,
        coverImageUrl: formData.cover,
        description: formData.desc
      };

      if (bookToEdit) {
        const bookId = bookToEdit._id || bookToEdit.id;
        await api.put(`/api/books/${bookId}`, bookData);
        alert("Livro atualizado com sucesso!");
      } else {
        await api.post("/api/books", bookData);
        alert("Livro cadastrado com sucesso!");
      }

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert(bookToEdit ? "Erro ao atualizar livro" : "Erro ao cadastrar livro");
    }
  }

  return (
    <div className="add-book-web-container">
      <div className="add-book-card">

        <header className="add-book-header">
          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={20} />
            Voltar para a Biblioteca
          </button>

          <h2>Cadastrar Novo Livro</h2>
        </header>

        <div className="add-book-body">

          {/* PREVIEW */}
          <div className="add-book-preview">

            <p className="label">
              Pré-visualização da Capa
            </p>

            <div className="preview-image-box">

              {formData.cover ? (
                <img
                  src={formData.cover}
                  alt="Capa"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.target.style.display = "block";
                  }}
                />
              ) : (
                <div className="empty-preview">
                  <UploadCloud size={48} color="#ccc" />
                  <span>
                    A URL da imagem aparecerá aqui
                  </span>
                </div>
              )}

            </div>

            <div className="preview-info">
              <h3>
                {formData.title || "Título do Livro"}
              </h3>

              <p>
                {formData.author || "Nome do Autor"}
              </p>
            </div>

          </div>

          {/* FORM */}
          <form
            className="add-book-form"
            onSubmit={handleSubmit}
          >

            <div className="form-grid">

              <div className="input-group full">
                <label>Título *</label>

                <input
                  type="text"
                  placeholder="Digite o título do livro"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value
                    })
                  }
                />
              </div>

              <div className="input-group full">
                <label>Autor *</label>

                <input
                  type="text"
                  placeholder="Digite o nome do autor"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      author: e.target.value
                    })
                  }
                />
              </div>

              <div className="input-group">
                <label>Gênero</label>

                <select
                  value={formData.genre}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      genre: e.target.value
                    })
                  }
                >
                  <option value="">
                    Selecionar Gênero
                  </option>

                  <option value="Ficção">
                    Ficção
                  </option>

                  <option value="Não-Ficção">
                    Não-Ficção
                  </option>

                  <option value="Fantasia">
                    Fantasia
                  </option>

                  <option value="Romance">
                    Romance
                  </option>

                  <option value="Terror">
                    Terror
                  </option>

                  <option value="Biografia">
                    Biografia
                  </option>
                </select>
              </div>

              <div className="input-group">
                <label>
                  Ano de Publicação
                </label>

                <input
                  type="number"
                  placeholder="AAAA"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year: e.target.value
                    })
                  }
                />
              </div>

              <div className="input-group full">
                <label>ISBN</label>

                <input
                  type="text"
                  placeholder="ex: 978-3-16-148410-0"
                  value={formData.isbn}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isbn: e.target.value
                    })
                  }
                />
              </div>

              <div className="input-group full">
                <label>
                  URL da Imagem da Capa
                </label>

                <input
                  type="text"
                  placeholder="https://link-da-imagem.com/foto.jpg"
                  value={formData.cover}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cover: e.target.value
                    })
                  }
                />
              </div>

              <div className="input-group full">
                <label>Descrição</label>

                <textarea
                  rows="4"
                  placeholder="Breve resumo do livro..."
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      desc: e.target.value
                    })
                  }
                ></textarea>
              </div>

            </div>

            <div className="form-footer">

              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate("/dashboard")}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn-save-web"
              >
                Salvar na Biblioteca
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default BookForm;
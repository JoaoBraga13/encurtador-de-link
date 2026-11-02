import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import {
  createShortLink,
  listShortLinks,
  type ShortLink,
} from "./services/shortLinksApi";
import "./App.css";

//extrai uma mensagem segura de um erro desconhecido
function getErrorMessage(error: unknown): string {
  return error instanceof Error
  ? error.message
  : "Ocorreu um erro inesperado";
}

//Monta o endereço público do link curto no ambiente local
function getShortUrl(code: string): string {
  return `http://localhost:3000/${code}`;
}

//interface para criar e consultar links curtos
function App() {
  // Estado do formulário e das respostas da API.
  const [originalUrl, setOriginalUrl] = useState("");
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carrega os links cadastrados quando a tela é aberta.
  useEffect(() => {
    let isCancelled = false;

    async function loadLinks() {
      try {
        const savedLinks = await listShortLinks();

        if (!isCancelled) {
          setLinks(savedLinks);
        }
      } catch (loadError) {
        if (!isCancelled) {
          setError(getErrorMessage(loadError));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadLinks();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Valida e envia a URL para criação.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const newLink = await createShortLink(originalUrl);
      setLinks((currentLinks) => [newLink, ...currentLinks]);
      setOriginalUrl("");
      setMessage("Link curto criado com sucesso.");
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">Encurtador de links</p>
        <h1>Links mais curtos, num só lugar.</h1>
        <p>Crie um link curto e acompanhe quantas vezes ele foi acessado.</p>
      </header>

      <section className="create-section" aria-labelledby="create-title">
        <h2 id="create-title">Criar link curto</h2>

        <form className="link-form" onSubmit={handleSubmit}>
          <label htmlFor="original-url">URL de destino</label>
          <div className="form-controls">
            <input
              id="original-url"
              type="url"
              value={originalUrl}
              onChange={(event) => setOriginalUrl(event.target.value)}
              placeholder="https://exemplo.com/pagina"
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Encurtar link"}
            </button>
          </div>
        </form>

        {error && <p className="feedback error" role="alert">{error}</p>}
        {message && <p className="feedback success" role="status">{message}</p>}
      </section>

      <section className="links-section" aria-labelledby="links-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sua coleção</p>
            <h2 id="links-title">Links cadastrados</h2>
          </div>
          <span className="link-count">{links.length}</span>
        </div>

        {isLoading ? (
          <p className="empty-state">Carregando links...</p>
        ) : links.length === 0 ? (
          <p className="empty-state">Você ainda não cadastrou links.</p>
        ) : (
          <ul className="link-list">
            {links.map((link) => {
              const shortUrl = getShortUrl(link.code);

              return (
                <li className="link-card" key={link.id}>
                  <div className="link-details">
                    <a href={shortUrl} target="_blank" rel="noreferrer">
                      {shortUrl}
                    </a>
                    <a
                      className="original-url"
                      href={link.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.originalUrl}
                    </a>
                  </div>
                  <div className="link-stats">
                    <strong>{link.clickCount}</strong>
                    <span>cliques</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;

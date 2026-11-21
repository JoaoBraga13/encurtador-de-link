import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import {
  createShortLink,
  listShortLinks,
  type ShortLink,
} from "../services/shortLinksApi";

vi.mock("../services/shortLinksApi", () => ({
  createShortLink: vi.fn(),
  listShortLinks: vi.fn(),
}));

// Link de exemplo usado nas respostas simuladas.
const sampleLink: ShortLink = {
  id: "1",
  code: "abc1234",
  originalUrl: "https://example.com/pagina",
  clickCount: "3",
  createdAt: "2026-11-16T12:00:00.000Z",
};

// Prepara respostas padrão antes de cada teste.
beforeEach(() => {
  vi.mocked(listShortLinks).mockReset();
  vi.mocked(createShortLink).mockReset();
  vi.mocked(listShortLinks).mockResolvedValue([]);
  vi.mocked(createShortLink).mockResolvedValue(sampleLink);
});

// Limpa a tela renderizada após cada teste.
afterEach(() => {
  cleanup();
});

// Verifica que a lista inicial exibe link e contagem.
describe("tela de links curtos", () => {
  it("exibe os links carregados da API", async () => {
    vi.mocked(listShortLinks).mockResolvedValue([sampleLink]);

    render(<App />);

    expect(
      await screen.findByRole("link", {
        name: "http://localhost:3000/abc1234",
      }),
    ).toHaveAttribute("href", "http://localhost:3000/abc1234");

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(sampleLink.originalUrl)).toBeInTheDocument();
  });

  // Verifica o envio do formulário e a exibição do novo link.
  it("cria um link e o adiciona à lista", async () => {
    const user = userEvent.setup();
    const newLink = { ...sampleLink, code: "XYZ9876" };

    vi.mocked(createShortLink).mockResolvedValue(newLink);
    render(<App />);

    await user.type(
      screen.getByRole("textbox", { name: "URL de destino" }),
      "https://example.com/novo",
    );
    await user.click(
      screen.getByRole("button", { name: "Encurtar link" }),
    );

    expect(createShortLink).toHaveBeenCalledWith(
      "https://example.com/novo",
    );
    expect(
      await screen.findByRole("link", {
        name: "http://localhost:3000/XYZ9876",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Link curto criado com sucesso.",
    );
  });

  // Verifica que falhas ao carregar são apresentadas como alerta.
  it("exibe um erro quando a lista não pode ser carregada", async () => {
    vi.mocked(listShortLinks).mockRejectedValue(
      new Error("Falha ao carregar links."),
    );

    render(<App />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Falha ao carregar links.",
    );
  });

  // Verifica que falhas ao criar são apresentadas como alerta.
  it("exibe um erro quando a criação falha", async () => {
    const user = userEvent.setup();

    vi.mocked(createShortLink).mockRejectedValue(
      new Error("Não foi possível criar o link."),
    );
    render(<App />);

    await user.type(
      screen.getByRole("textbox", { name: "URL de destino" }),
      "https://example.com/novo",
    );
    await user.click(
      screen.getByRole("button", { name: "Encurtar link" }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não foi possível criar o link.",
    );
  });
});

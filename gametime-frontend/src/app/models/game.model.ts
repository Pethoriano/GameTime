// Define a estrutura exata de um objeto de Jogo
export interface Game {
  id: number;
  nome: string;
  nota: number;
  imagem: string;
  avaliacao: string;
  status: 'JOGADO' | 'JOGANDO' | 'JOGAREI'; // Usamos um tipo literal para o status
}
export interface Game {
  id: number;
  nome: string;
  nota: number;
  imagem: string;
  avaliacao: string;
  status: 'JOGADO' | 'JOGANDO' | 'JOGAREI' | 'BACKLOG';
  dataAdicao?: string;
  dataFinalizacao?: string;
  horasJogadas?: number;
}

export interface GameRequest {
  nome: string;
  nota: number;
  imagem: string;
  avaliacao: string;
  status: 'JOGADO' | 'JOGANDO' | 'JOGAREI' | 'BACKLOG';
  horasJogadas?: number;
}


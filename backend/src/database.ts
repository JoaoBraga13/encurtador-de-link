//importa o gerenciador de conexões do postgres
import { Pool } from 'pg';

//cria e exporta uma instância compartilhada
export const pool = new Pool();

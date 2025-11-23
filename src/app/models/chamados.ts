export interface Chamado {
    id: number;
    titulo: string;
    descricao: string;
    status: 'ABERTO' | 'EM_ANDAMENTO' | 'FECHADO';
    prioridade: 'BAIXA' | 'MEDIA' | 'ALTA';
    dataAbertura: Date;
    dataFechamento?: Date;
    clienteId: number;
    tecnicoId: number;
}

export type ChamadoStatus = 'ABERTO' | 'EM_ANDAMENTO' | 'FECHADO';
export type ChamadoPrioridade = 'BAIXA' | 'MEDIA' | 'ALTA';
export type NovoChamado = Omit<Chamado, 'id' | 'dataAbertura' | 'dataFechamento'>;
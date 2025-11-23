import { Injectable, signal, computed, inject } from '@angular/core';
import { Chamado, ChamadoStatus, ChamadoPrioridade } from '../models/chamados';
import { ClienteService } from './cliente';
import { TecnicoService } from './tecnico';

@Injectable({
  providedIn: 'root',
})
export class ChamadoService {
  private clienteService = inject(ClienteService);
  private tecnicoService = inject(TecnicoService);

  private chamadosSignal = signal<Chamado[]>([
    {
      id: 1,
      titulo: 'Erro no sistema',
      descricao: 'O sistema apresenta um erro ao tentar salvar os dados.',  
      status: 'EM_ANDAMENTO',
      prioridade: 'ALTA',
      dataAbertura: new Date(),
      clienteId: 1,
      tecnicoId: 2,
    },
    {
      id: 2,
      titulo: 'Manutenção do servidor',
      descricao: 'O servidor precisa de manutenção preventiva.',  
      status: 'ABERTO',
      prioridade: 'MEDIA',
      dataAbertura: new Date(),
      clienteId: 2,
      tecnicoId: 0,
    },
    {
      id: 3,
      titulo: 'Atualização de software',
      descricao: 'Solicitação para atualizar o software para a versão mais recente.',
      status: 'ABERTO',
      prioridade: 'BAIXA',
      dataAbertura: new Date(),
      dataFechamento: new Date(),
      clienteId: 1,
      tecnicoId: 0,
    }
  ]);

  chamados = computed(() => this.chamadosSignal());

  chamadosAbertos = computed(() => 
    this.chamados().filter(c => c.status === 'ABERTO')
  );

  chamadosEmAndamento = computed(() => 
    this.chamados().filter(c => c.status === 'EM_ANDAMENTO')
  );

  chamadosFechados = computed(() => 
    this.chamados().filter(c => c.status === 'FECHADO')
  );

  chamadosPorPrioridade(prioridade: ChamadoPrioridade) {
    return computed(() => 
      this.chamados().filter(c => c.prioridade === prioridade)
    );
  }

  //MÉTODOS

  getChamadosComDados() {
    return computed(() => {
      return this.chamados().map(c => ({
        ...c,
        cliente: this.clienteService.getClienteById(c.clienteId)(),
        tecnico: c.tecnicoId ? this.tecnicoService.getTecnicoById(c.tecnicoId)() : undefined,
      }));
    });
  }

  getChamadosComDadosByStatus(status: ChamadoStatus | 'TODOS') {
    return computed(() => {
      const chamadosComDados = this.getChamadosComDados()();
      if (status === 'TODOS') {
        return chamadosComDados;
      }
      return chamadosComDados.filter(c => c.status === status);
    });
  }

  buscarChamadosComDados(termo: string) {
    return computed(() => {
      const chamadosComDados = this.getChamadosComDados()();  
      return chamadosComDados.filter(c =>
        c.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        c.descricao.toLowerCase().includes(termo.toLowerCase()) ||
        c.cliente?.nome.toLowerCase().includes(termo.toLowerCase()) ||
        c.status.toLowerCase().includes(termo.toLowerCase()) 
      );
    });
  }

  getChamadosByStatus(status: ChamadoStatus | 'TODOS') {
    if (status === 'TODOS') {
      return this.chamados;
    }
    return computed(() => 
      this.chamados().filter(c => c.status === status)
    );
  }


  //adicionar novo chamado
  addChamado(chamado: Omit<Chamado, 'id' | 'dataAbertura' | 'dataFechamento'>): void {
    const novoChamado: Chamado = {
      ...chamado,
      id: this.generateId(),
      dataAbertura: new Date(),
    };

    //update do signal
    this.chamadosSignal.update(chamados => [...chamados, novoChamado]);
  }

  //atualizar chamado
  updateChamado(chamadoAtualizado: Chamado): void {
    this.chamadosSignal.update(chamados => 
      chamados.map(c => c.id === chamadoAtualizado.id ? chamadoAtualizado : c)
    );
  }

  //buscar todos os chamados
  getChamados() {
    return this.chamados;
  }

  //buscar chamado por id
  getChamadoById(id: number) {
    return computed(() => this.chamados().find(c => c.id === id));
  }

  getChamadoComDadosById(id: number) {
    return computed(() => {
      const chamado = this.getChamadoById(id)();
      if (!chamado) {
        return undefined;
      }
      return {
        ...chamado,
        cliente: this.clienteService.getClienteById(chamado.clienteId)(),
        tecnico: chamado.tecnicoId ? this.tecnicoService.getTecnicoById(chamado.tecnicoId)() : undefined,
      };
    });
  }

  atribuirTecnico(chamadoId: number, tecnicoId: number): void {
    const chamado = this.getChamadoById(chamadoId)();
    if (!chamado) {
      console.error('Chamado não encontrado', chamadoId);
      return;
    }

    const tecnico = this.tecnicoService.getTecnicoById(tecnicoId)();
    if (!tecnico) {
      console.error('Técnico não encontrado', tecnicoId);
      return;
    }

    if (!tecnico.disponivel) {
      alert('Técnico não está disponível');
      return;
    }

    this.tecnicoService.atualizarDisponibilidade(tecnicoId, false);

    this.chamadosSignal.update(chamados => 
      chamados.map(c =>
        c.id === chamadoId ?
         { ...c, 
          tecnicoId, 
          status: 'EM_ANDAMENTO' as ChamadoStatus 
        } : c
      )
    );

    alert(`Técnico ${tecnico.nome} atribuído ao chamado ${chamado.titulo}`);    
  }

  //deletar chamado
  FecharChamado(id: number): void {
    const chamado = this.getChamadoById(id)();
    if (!chamado) {
      console.error('Chamado não encontrado', id);
      return;
    }
    if (chamado.tecnicoId) {
      this.tecnicoService.atualizarDisponibilidade(chamado.tecnicoId, true);
    }

    this.chamadosSignal.update(chamados => 
      chamados.map(c =>
        c.id === id ? {
          ...c,
          status: 'FECHADO',
          dataFechamento: new Date()
        } : c
      )
    );
    alert(`Chamado ${chamado.titulo} fechado e técnico liberado com sucesso.`);
  }
  


  //PADRÕES

  //Factory Method (criacional)
  private generateId(): number {
    const chamados = this.chamadosSignal();
    return Math.max(...chamados.map(c => c.id), 0) + 1;
  }

  //OBSERVER PATTERN é nativo com Signals
  
}

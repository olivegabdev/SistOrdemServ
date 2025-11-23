import { Component, computed, inject, signal } from '@angular/core';
import { ChamadoService } from '../../../services/chamado';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ChamadoStatus } from '../../../models/chamados';
import { TecnicoService } from '../../../services/tecnico';

@Component({
  selector: 'app-chamados-list',
  standalone: true,
  imports: [DatePipe, RouterModule, CommonModule, RouterLink],
  templateUrl: './chamados-list.html',
  styleUrl: './chamados-list.css',
})
export class ChamadosList{
  private chamadoService = inject(ChamadoService);
  private tecnicoService = inject(TecnicoService);

  tecnicoDisponiveis = this.tecnicoService.getTecnicosDisponiveis();
  
  filtroStatus = signal<ChamadoStatus | 'TODOS'>('TODOS');
  termoBusca = signal('');

  chamadosFiltrados = computed(() => {
    const termo = this.termoBusca();
    const status = this.filtroStatus();

    if(termo){
      const resultadoBusca = this.chamadoService.buscarChamadosComDados(termo)();
      if(status === 'TODOS'){
        return resultadoBusca;
      }
      return resultadoBusca.filter(c => c.status === status);
    } else {
      return this.chamadoService.getChamadosComDadosByStatus(status)();
    }
  });

  totalChamados = computed(() => this.chamadoService.chamados().length);
  totalAbertos = computed(() => this.chamadoService.chamadosAbertos().length);
  totalEmAndamento = computed(() => this.chamadoService.chamadosEmAndamento().length);
  totalFechados = computed(() => this.chamadoService.chamadosFechados().length);

  alterarFiltroStatus(novoStatus: ChamadoStatus | 'TODOS'): void {
    this.filtroStatus.set(novoStatus);
  }

  onBuscarChamados(termo: string): void {
    this.termoBusca.set(termo);
  }

  limparFiltroBusca(): void {
    this.termoBusca.set('TODOS');
    this.termoBusca.set('');
  }

  atribuirTecnico(chamadoId: number, tecnicoId: number): void {
    if (!tecnicoId) return;
    this.chamadoService.atribuirTecnico(chamadoId, tecnicoId);
  }

  atribuirTecnicoRapido(chamadoId: number): void {
    const tecnicos = this.tecnicoService.getTecnicosDisponiveis()();
    if (tecnicos.length > 0) {
    this.chamadoService.atribuirTecnico(chamadoId, tecnicos[0].id);
    }
  }  

  fecharChamado(chamadoId: number): void {
    this.chamadoService.FecharChamado(chamadoId);
  }

  excluirChamado(id: number): void {
    if (confirm('Tem certeza que deseja excluir este chamado?')) {
      this.chamadoService.FecharChamado(id);
    } 
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ABERTO': return 'text-muted';
      case 'EM_ANDAMENTO': return 'text-primary';
      case 'FECHADO': return 'text-success';
      default: return 'text-muted';
    }
  }
}

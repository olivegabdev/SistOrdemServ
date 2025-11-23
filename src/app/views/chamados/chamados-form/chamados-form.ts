import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Chamado, ChamadoStatus, NovoChamado } from '../../../models/chamados';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';
import { ChamadoService } from '../../../services/chamado';
import { ClienteService } from '../../../services/cliente';
import { TecnicoService } from '../../../services/tecnico';

@Component({
  selector: 'app-chamados-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chamados-form.html',
  styleUrl: './chamados-form.css'
})
export class ChamadosFormComponent implements OnInit {
  // ✅ Services
  private chamadoService = inject(ChamadoService);
  private clienteService = inject(ClienteService);
  private tecnicoService = inject(TecnicoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // ✅ Dados do formulário
  chamado = signal<Chamado>({
    id: 0,
    titulo: '',
    descricao: '',
    status: 'ABERTO',
    prioridade: 'MEDIA',
    clienteId: 0,
    tecnicoId: 0,
    dataAbertura: new Date()
  });

  // ✅ Lists para selects
  clientes = this.clienteService.getClientes();
  tecnicosDisponiveis = this.tecnicoService.getTecnicosDisponiveis();
  todosTecnicos = this.tecnicoService.getTecnicos();

  // ✅ Estados do componente
  isEditando = signal(false);
  showAlert = signal(false);
  alertMessage = signal('');
  alertType = signal<'success' | 'error'>('success');

  // ✅ Computed para dados relacionados
  clienteSelecionado = computed(() => 
    this.clienteService.getClienteById(this.chamado().clienteId)()
  );

  tecnicoSelecionado = computed(() => 
    this.chamado().tecnicoId ? this.tecnicoService.getTecnicoById(this.chamado().tecnicoId!)() : undefined
  );

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditando.set(true);
      this.carregarChamado(Number(id));
    }
  }

  carregarChamado(id: number): void {
    const chamadoComDados = this.chamadoService.getChamadoComDadosById(id)();
    if (chamadoComDados) {
      this.chamado.set(chamadoComDados);
    }
  }

  // ✅ Métodos de atualização dos campos
  atualizarTitulo(titulo: string): void {
    this.chamado.update(current => ({ ...current, titulo }));
  }

  atualizarDescricao(descricao: string): void {
    this.chamado.update(current => ({ ...current, descricao }));
  }

  atualizarPrioridade(prioridade: 'BAIXA' | 'MEDIA' | 'ALTA'): void {
    this.chamado.update(current => ({ ...current, prioridade }));
  }

  atualizarClienteId(clienteId: number): void {
    this.chamado.update(current => ({ ...current, clienteId: Number(clienteId) }));
  }

  atualizarTecnicoId(tecnicoId: number): void {
    this.chamado.update(current => ({ ...current, tecnicoId: tecnicoId ? Number(tecnicoId) : 0 }));
  }

  atualizarStatus(status: ChamadoStatus): void {
    this.chamado.update(current => ({ ...current, status }));
  }

  // ✅ Validação do formulário
  isFormularioValido(): boolean {
    const c = this.chamado();
    return !!c.titulo && !!c.descricao && c.clienteId > 0;
  }

  // ✅ Submissão do formulário
  salvarChamado(): void {
    if (!this.isFormularioValido()) {
      this.mostrarAlert('Preencha todos os campos obrigatórios!', 'error');
      return;
    }

    try {
      if (this.isEditando()) {
        // Edição
        this.chamadoService.updateChamado(this.chamado());
        this.mostrarAlert('Chamado atualizado com sucesso!', 'success');
      } else {
        // Criação
        const { id, dataAbertura, dataFechamento, ...novoChamado } = this.chamado();
        this.chamadoService.addChamado({
          ...novoChamado
        });
        this.mostrarAlert('Chamado criado com sucesso!', 'success');
      }

      // Navega após 2 segundos
      setTimeout(() => {
        this.router.navigate(['/chamados']);
      }, 2000);

    } catch (error) {
      this.mostrarAlert('Erro ao salvar chamado. Tente novamente.', 'error');
    }
  }

  // ✅ Atribuir técnico automaticamente
  atribuirTecnicoAutomaticamente(): void {
    const tecnicos = this.tecnicosDisponiveis();
    if (tecnicos.length > 0) {
      this.atualizarTecnicoId(tecnicos[0].id);
      this.atualizarStatus('EM_ANDAMENTO');
      this.mostrarAlert(`Técnico ${tecnicos[0].nome} atribuído automaticamente!`, 'success');
    }
  }

  // ✅ Fechar chamado
  fecharChamado(): void {
    this.atualizarStatus('FECHADO');
    this.chamado.update(current => ({ 
      ...current, 
      dataFechamento: new Date(),
      status: 'FECHADO'
    }));
    this.mostrarAlert('Chamado fechado com sucesso!', 'success');
  }

  // ✅ Reabrir chamado
  reabrirChamado(): void {
    this.atualizarStatus('ABERTO');
    this.chamado.update(current => ({ 
      ...current, 
      dataFechamento: undefined,
      status: 'ABERTO'
    }));
    this.mostrarAlert('Chamado reaberto!', 'success');
  }

  // ✅ Sistema de alertas
  private mostrarAlert(mensagem: string, tipo: 'success' | 'error'): void {
    this.alertMessage.set(mensagem);
    this.alertType.set(tipo);
    this.showAlert.set(true);
    
    setTimeout(() => {
      this.showAlert.set(false);
    }, 5000);
  }

  fecharAlert(): void {
    this.showAlert.set(false);
  }

  cancelar(): void {
    this.router.navigate(['/chamados']);
  }
}
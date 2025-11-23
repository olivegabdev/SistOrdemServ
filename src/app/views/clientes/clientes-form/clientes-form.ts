import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clientes-form.html',
  styleUrl: './clientes-form.css',
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente = {
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    dataCadastro: new Date()
  };

  isEditando = signal(false);
  showAlert = signal(false);
  alertMessage = signal('');
  alertType = signal('success');

  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditando.set(true);
      this.carregarCliente(Number(id));
    }
  }

carregarCliente(id: number): void {
  const clienteSignal = this.clienteService.getClienteById(id);
  const clienteResult = clienteSignal();
  if (clienteResult) {
    this.cliente = clienteResult;
  }
}

//métodos 

atualizarNome(nome: string): void {
  this.cliente.nome = nome;
}

atualizarEmail(email: string): void {
  this.cliente.email = email;
}

atualizarTelefone(telefone: string): void {
  this.cliente.telefone = telefone;
}

atualizarEndereco(endereco: string): void {
  this.cliente.endereco = endereco;
}

  salvarCliente(): void {
    try {
      if (this.isEditando()) {
          this.clienteService.updateCliente(this.cliente);
        } else {
          const { nome, email, telefone, endereco } = this.cliente;
          this.clienteService.addCliente({ nome, email, telefone, endereco });
          this.mostrarAlert('Cliente cadastrado com sucesso!', 'success');
        }

        setTimeout(() => {
          this.router.navigate(['/clientes']);
        }, 2500);
    } catch (error) {
      this.mostrarAlert('Erro ao salvar o cliente. Tente novamente.', 'error');
    }
  }

  private mostrarAlert(message: string, type: 'success' | 'error' | 'warning'): void {
    this.alertMessage.set(message);
    this.alertType.set(type);
    this.showAlert.set(true);

    setTimeout(() => {
      this.showAlert.set(false);
    }, 5000);
  }

  fecharAlert(): void {
    this.showAlert.set(false);
  }

  cancelar(): void {
    this.router.navigate(['/clientes']);
  }

}

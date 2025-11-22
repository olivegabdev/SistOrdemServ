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

  constructor(
    private clienteService: ClienteService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

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
    if (this.isEditando()) {
      this.clienteService.updateCliente(this.cliente);
    } else {
      const { nome, email, telefone, endereco } = this.cliente;
      this.clienteService.addCliente({ nome, email, telefone, endereco });
    }
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [DatePipe, RouterModule, CommonModule, RouterLink],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
})

export class ClientesList implements OnInit{
  
  private clienteService: ClienteService = inject(ClienteService);
  clientes = this.clienteService.getClientes();
  isLoading = signal(false);

  ngOnInit(): void {
    
  }

  excluirCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.deleteCliente(id);
    }
  }
}

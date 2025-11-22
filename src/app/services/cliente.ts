import { Injectable, signal, computed } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientesSignal = signal<Cliente[]>([

    { id: 1, nome: 'Jean Giancomo', 
      email: 'jean.salai@gmail.com', 
      telefone: '(85) 91480-1524', 
      endereco: 'Rua Leonardo da Vinci, 1504', 
      dataCadastro: new Date() 
    },

    { id: 2, nome: 'Mariana Macedo', 
      email: 'mari02macedo@outlook.com', 
      telefone: '(85) 98615-7826', 
      endereco: 'Av. B, 456', 
      dataCadastro: new Date() 
    }
  ]);

  clientes = computed(() => this.clientesSignal());
  totalClientes = computed(() => this.clientes().length);

  constructor() { }

  //MÉTODOS

  //buscar todos os clientes
  getClientes() {
    return this.clientes;
  }

  //buscar cliente por id
  getClienteById(id: number) {
    return computed(() => this.clientes().find(c => c.id === id));
  }

  //adicionar novo cliente
  addCliente(cliente: Omit<Cliente, 'id' | 'dataCadastro'>): void {
    const novoCliente: Cliente = {
      ...cliente,
      id: this.generateId(),
      dataCadastro: new Date()
    };

    //update do signal
    this.clientesSignal.update(clientes => [...clientes, novoCliente]);
  }

  //atualizar cliente
  updateCliente(clienteAtualizado: Cliente): void {
    this.clientesSignal.update(clientes => 
      clientes.map(c => c.id === clienteAtualizado.id ? clienteAtualizado : c)
    );
  }

  //deletar cliente
  deleteCliente(id: number): void {
    this.clientesSignal.update(clientes => 
      clientes.filter(c => c.id !== id)
    );
  }

  //PADRÕES

  //Factory Method (criacional
  private generateId(): number {
    const clientes = this.clientesSignal();
    return Math.max(...clientes.map(c => c.id), 0) + 1;
  }

  //OBSERVER PATTERN é nativo com Signals
}
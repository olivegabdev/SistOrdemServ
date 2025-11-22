import { Injectable, signal, computed } from '@angular/core';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root',
})
export class TecnicoService {
  
  private tecnicosSignal = signal<Tecnico[]>([

    { id: 1, nome: 'Carlos Eduardo', 
      email: 'carlos.eduardo@email.com',
      telefone: '(85) 91234-5678',
      especialidade: 'Eletrônica',
      disponivel: true,
      dataContratacao: new Date() 
    },
    {
      id: 2, nome: 'Ana Paula', 
      email: 'ana.paula@email.com',
      telefone: '(85) 99876-5432',
      especialidade: 'Mecânica',
      disponivel: false,
      dataContratacao: new Date()
    },
    {
      id: 3, nome: 'Rafael Silva',
      email: 'rafael.silva@email.com',
      telefone: '(85) 93456-7890',
      especialidade: 'Informática',
      disponivel: true,
      dataContratacao: new Date()
    }
  ]);

  tecnicos = computed(() => this.tecnicosSignal());
  totalTecnicos = computed(() => this.tecnicos().length);
  
  constructor() {}
  
  //MÉTODOS
  
  //buscar todos os técnicos
  getTecnicos() {
    return this.tecnicos;
  }

  //buscar técnico por id
  getTecnicoById(id: number) {
    return computed(() => this.tecnicos().find(t => t.id === id));
  }

  //adicionar novo técnico
  addTecnico(tecnico: Omit<Tecnico, 'id' | 'dataContratacao'>): void {
    const novoTecnico: Tecnico = {
      ...tecnico,
      id: this.generateId(),
      dataContratacao: new Date()
    };

    //update do signal
    this.tecnicosSignal.update(tecnicos => [...tecnicos, novoTecnico]);
  }


  //atualizar técnico
  updateTecnico(tecnicoAtualizado: Tecnico): void {
    this.tecnicosSignal.update(tecnicos => 
      tecnicos.map(t => t.id === tecnicoAtualizado.id ? tecnicoAtualizado : t)
    );
  }

  //deletar técnico
  deleteTecnico(id: number): void {
    this.tecnicosSignal.update(tecnicos => 
      tecnicos.filter(t => t.id !== id)
    );
  }

  //MÉTODOS pro tecnico!!

  toggleDisponibilidade(id: number): void {
    this.tecnicosSignal.update(tecnicos => 
      tecnicos.map(t => 
        t.id === id ? { ...t, disponivel: !t.disponivel } : t
      )
    );
  }

  getTecnicosDisponiveis() {
    return computed(() => 
      this.tecnicos().filter(t => t.disponivel)
    );
  }

  getTecnicosPorEspecialidade(especialidade: string) {
    return computed(() => 
      this.tecnicos().filter(t => t.especialidade.toLowerCase() === especialidade.toLowerCase())
    );
  }

  //PADRÕES

  //Factory Method (criacional)
  private generateId(): number {
    const tecnicos = this.tecnicosSignal();
    return Math.max(...tecnicos.map(t => t.id), 0) + 1;
  }

  //observer pattern (comportamental - é nativo com signals
}

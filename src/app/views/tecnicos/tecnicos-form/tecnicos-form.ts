import { Component, inject, signal, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tecnicos-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tecnicos-form.html',
  styleUrl: './tecnicos-form.css',
})
export class TecnicosForm {
  tecnico: Tecnico = {
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    disponivel: true,
    dataContratacao: new Date()
  };

  isEditando = signal(false);

  constructor(
    private tecnicoService: TecnicoService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditando.set(true);
      this.carregarTecnico(Number(id));
    }
  }

carregarTecnico(id: number): void {
  const tecnicoSignal = this.tecnicoService.getTecnicoById(id);
  const tecnicoResult = tecnicoSignal();
  if (tecnicoResult) {
    this.tecnico = tecnicoResult;
  }
}

//métodos 

atualizarNome(nome: string): void {
  this.tecnico.nome = nome;
}

atualizarEmail(email: string): void {
  this.tecnico.email = email;
}

atualizarTelefone(telefone: string): void {
  this.tecnico.telefone = telefone;
}

atualizarEspecialidade(especialidade: string): void {
  this.tecnico.especialidade = especialidade;
}

  salvarTecnico(): void {
    if (this.isEditando()) {
      this.tecnicoService.updateTecnico(this.tecnico);
    } else {
      const { nome, email, telefone, especialidade, disponivel } = this.tecnico;
      this.tecnicoService.addTecnico({ nome, email, telefone, especialidade, disponivel });
    }
  }

}

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
   showAlert = signal(false);
   alertMessage = signal('');
   alertType = signal('success');
 
   private tecnicoService = inject(TecnicoService);
   private router = inject(Router);
   private route = inject(ActivatedRoute);


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
    try {
        if (this.isEditando()) {
        this.tecnicoService.updateTecnico(this.tecnico);
      } else {
        const { nome, email, telefone, especialidade, disponivel } = this.tecnico;
        this.tecnicoService.addTecnico({ nome, email, telefone, especialidade, disponivel });
        this.mostrarAlert('tecnico cadastrado com sucesso!', 'success');
      }

      setTimeout(() => {
          this.router.navigate(['/tecnicos']);
        }, 2500);

    } catch (error) {
       this.mostrarAlert('Erro ao salvar o tecnico. Tente novamente.', 'error');
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
    this.router.navigate(['/tecnicos']);
  }

}

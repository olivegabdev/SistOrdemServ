import { Component, inject, OnInit, signal} from '@angular/core';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tecnicos-list',
  standalone: true,
  imports: [DatePipe, RouterModule, CommonModule, RouterLink],
  templateUrl: './tecnicos-list.html',
  styleUrl: './tecnicos-list.css',
})

export class TecnicosList {

  private tecnicoService: TecnicoService = inject(TecnicoService);
  tecnicos = this.tecnicoService.getTecnicos();
  isLoading = signal(false);

  ngOnInit(): void {
    
  }

  excluirTecnico(id: number): void {
    if (confirm('Tem certeza que deseja excluir este técnico?')) {
      this.tecnicoService.deleteTecnico(id);
    }
  }

}

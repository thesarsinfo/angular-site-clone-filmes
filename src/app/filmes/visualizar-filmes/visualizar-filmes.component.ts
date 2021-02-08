import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semFoto = 'https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image'
  filme: Filme;
  id: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private filmesService: FilmesService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']
      this.visualizar();
  }
  editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }
  excluir(): void {
   
      const config = {
        data: {
            titulo: 'Voce tem certeza que deseja excluir',
            descricao: 'Caso você tenha certeza que deseja excluir, clique em OK', 
            corBtnSucesso: 'warn',
            corBtnCancelar: 'primary',           
            possuirBtnFechar: true

        } as Alerta
      };    
    
    const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean)=>{
          if (opcao){
              this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl('/filmes'));
          } 
        });
    }

  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme  )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.page.html',
  styleUrls: ['./localizacao.page.scss'],
})
export class LocalizacaoPage implements OnInit {
  public locations: string[] = [
    'LE-1',
    'LE-2',
    'LE-3',
    'LE-4',
    'LE-5',
    'LE-6',
    'Auditorio',
    'Banheiros',
    'Lig',
    'Secretaria',
    'PPGCC-1',
    'PPGCC-2',
    'Churrasqueira',
    'Copa',
    'Maker',
    '2',
    '3',
    '4',
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/']);
  }
}

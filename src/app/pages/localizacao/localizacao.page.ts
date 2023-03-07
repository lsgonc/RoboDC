import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.page.html',
  styleUrls: ['./localizacao.page.scss'],
})
export class LocalizacaoPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal | undefined;

  public selectedLocation: string = '';
  public selectedLocationDescription: string = '';

  public locations: string[] = [
    'LE-1',
    'LE-2',
    'LE-3',
    'LE-4',
    'Suporte',
    'PPG-CC4',
    'Maker',
    'LE-5',
    'Auditório',
    'Banheiros',
    'Copa',
    'Lig',
    'Reunioes',
    'Chefia',
    'Graduacao',
    'Recepcao',
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/']);
  }

  presentModal(location: string) {
    this.selectedLocation = location;
    this.selectedLocationDescription =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    this.modal?.present();
  }

  dismissModal() {
    this.modal?.dismiss();
  }

  goToOngoingPage() {
    this.router.navigate(['ongoing', this.selectedLocation]);

    this.modal?.dismiss();
  }
}

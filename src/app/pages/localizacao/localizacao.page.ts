import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Locations } from 'src/app/models/locations.types';
import { TtsService } from 'src/app/services/tts.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-localizacao',
    templateUrl: './localizacao.page.html',
    styleUrls: ['./localizacao.page.scss'],
    standalone: false
})
export class LocalizacaoPage implements OnInit {
  @ViewChild('locationModal') modal: IonModal | undefined;
  @ViewChild('mapModal') mapModal: IonModal | undefined;

  public robot_api: string = '';

  public selectedLocation: string = '';

  public locations: string[] = [
    'LE-1',
    'LE-2',
    'LE-3',
    'LE-4',
    'Suporte',
    'PPG-CC4',
    'Maker',
    'LE-5',
    'Auditorio',
    'Banheiros',
    'Copa',
    'Lig',
    'Reunioes',
    'Chefia',
    'Graduacao',
    'Recepcao',
  ];

  public locationsInfo: Locations = {
    'LE-1': {
      title: 'LE-1',
      image: 'le1.jpeg',
      description:
        'Laboratório de ensino LE-1. Equipado com 13 computadores com a configuração: Intel core i7, 8 GbRam, HD 1Tb, monitor de 19. Com a atividade principal voltada para Hardware o LE-1 tem capacidade para 30 estudantes.',
    },
    'LE-2': {
      title: 'LE-2',
      image: 'le2.jpeg',
      description:
        'Laboratório de ensino LE-2. Equipado com 21 computadores com a configuração: Intel core I5, 8GB, HD 1TB, monitor 21,5. Com a atividade principal voltada para Programação e desenvolvimento o LE-2 tem capacidade para 40 estudantes.',
    },
    'LE-3': {
      title: 'LE-3',
      image: 'le3.jpeg',
      description:
        'Laboratório de ensino LE-3. Equipado com 20 computadores com a configuração: Intel core I5, 8GB, HD 1TB, monitor 19. Com a atividade principal voltada para Programação e desenvolvimento o LE-3 tem capacidade para 40 estudantes.',
    },
    'LE-4': {
      title: 'LE-4',
      image: 'le4.jpeg',
      description:
        'Laboratório de ensino LE-4. Equipado com 21 computadores com a configuração: Intel core i7, 8GB, HD 1TB, monitor 19. Com a atividade principal voltada para Programação e desenvolvimento o LE-4 tem capacidade para 40 estudantes.',
    },
    Suporte: {
      title: 'Suporte',
      image: 'suporte.jpeg',
      description: 'Sala de suporte.',
    },
    'PPG-CC4': {
      title: 'PPG-CC4',
      image: 'dc_generic.jpg',
      description: 'Pós-graduação.',
    },
    Maker: {
      title: 'Espaço Maker',
      image: 'maker.jpeg',
      description: 'Espaço Maker para criação e elaboração de projetos.',
    },
    'LE-5': {
      title: 'LE-5',
      image: 'le5.jpeg',
      description:
        'Laboratório de ensino LE-5. Equipado com 9 computadores com a configuração: Intel core i7, 8 GbRam, HD 1Tb, monitor de 19. Com a atividade principal voltada para Hardware e Lógica digital o LE-5 tem capacidade para 30 estudantes.',
    },
    Auditorio: {
      title: 'Auditório',
      image: 'auditorio.jpeg',
      description: 'Auditório Prof. Mauro Biajiz.',
    },
    Banheiros: {
      title: 'Banheiros',
      image: 'banheiros.jpeg',
      description: 'Banheiros do primeiro andar.',
    },
    Copa: {
      title: 'Copa',
      image: 'copa.jpeg',
      description: 'Copa do primeiro andar.',
    },
    Lig: {
      title: 'LIG',
      image: 'dc_generic.jpg',
      description:
        'O laboratório de informática (LIG) é um espaço de uso geral.',
    },
    Reunioes: {
      title: 'Reuniões',
      image: 'reunioes.jpeg',
      description: 'Sala de reuniões.',
    },
    Chefia: {
      title: 'Chefia',
      image: 'chefia.jpeg',
      description: 'Chefia do Departamento de Computação.',
    },
    Graduacao: {
      title: 'Graduação',
      image: 'dc_generic.jpg',
      description: 'Sala da graduação.',
    },
    Recepcao: {
      title: 'Recepção',
      image: 'recepcao.jpeg',
      description: 'Recepção.',
    },
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    public ttsService: TtsService,
    private translate: TranslateService
  ) {
    this.robot_api =
      localStorage.getItem('robot_api') || 'http://192.168.1.100:5000';
  }

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/']);
  }

  presentModal(location: string) {
    this.selectedLocation = location;
    this.modal?.present();
  }

  dismissModal() {
    this.modal?.dismiss();
  }

  dismissMapModal() {
    this.mapModal?.dismiss();
  }

  async goToOngoingPage() {
    try {
      await lastValueFrom(
        this.http.get(`${this.robot_api}/ros/goTo/${this.selectedLocation}`)
      );

      this.ttsService.speak(
        this.translate.instant('locations.followMeTtsMessage', {
          location: this.selectedLocation,
        })
      );

      this.router.navigate(['ongoing', this.selectedLocation]);
    } catch (error) {
      console.log(error);
      this.ttsService.speak(this.translate.instant('common.errorTtsMessage'));
    } finally {
      this.modal?.dismiss();
    }
  }
}

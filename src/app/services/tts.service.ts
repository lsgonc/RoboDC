import { Injectable } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  public tssIsOn: boolean = false;
  public lang: string = 'pt-BR';

  constructor() {}

  async speak(text: string) {
    if (this.tssIsOn) {
      return TextToSpeech.speak({
        text,
        lang: this.lang,
      });
    }
  }
}

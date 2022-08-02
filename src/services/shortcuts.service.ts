import { singleton } from 'tsyringe';

@singleton()
export class ShortcutsService {
  public isAltPressed = false;

  public setupListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Alt') {
        this.isAltPressed = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Alt') {
        this.isAltPressed = false;
      }
    });
  }
}

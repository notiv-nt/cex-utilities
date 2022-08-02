import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';

@singleton()
export class Loop extends BaseService {
  private isRunning = false;

  public start() {
    const loopTick = () => {
      if (!this.isRunning) {
        return;
      }

      this.tick();
      requestAnimationFrame(loopTick);
      // setTimeout(() => loopTick(), 100);
    };

    this.isRunning = true;
    loopTick();
  }

  public stop() {
    this.isRunning = false;
  }

  private tick() {
    this.emit('tick');
  }
}

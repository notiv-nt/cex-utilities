import EventEmitter2 from 'eventemitter2';

export default class BaseService extends EventEmitter2 {
  protected isAlive = true;

  public destroy() {
    this.isAlive = false;
  }
}

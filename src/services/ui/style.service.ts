import { singleton } from 'tsyringe';
import { UserConfig } from '../../config/user.config';

const HIDE_BALANCE = `
  .avail-display-container [data-testid="max-asset"] {
    display: none;
  }
`;

@singleton()
export class StyleService {
  private stylesRoot: HTMLStyleElement;

  constructor(private readonly userConfig: UserConfig) {}

  public loadStyles() {
    this.injectStyles();

    this.userConfig.on('change', this.injectStyles);
  }

  public injectStyles = () => {
    if (this.stylesRoot) {
      this.stylesRoot.parentElement?.removeChild(this.stylesRoot);
    }
    const sheet = document.createElement('style');
    this.stylesRoot = sheet;
    document.body.appendChild(sheet);
    sheet.innerHTML = this.buildStylesheet();
  };

  private buildStylesheet() {
    const styles: string[] = [];

    if (this.userConfig.config.hide_balance) {
      styles.push(HIDE_BALANCE);
    }

    return styles.join(' ');
  }
}

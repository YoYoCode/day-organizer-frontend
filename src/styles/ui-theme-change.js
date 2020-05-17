export default class UIThemeSwitcher {

  constructor(theme='lightWhite') {
    this.theme = 'lightWhite';
    this.element = document.getElementsByTagName('body')[0];
    this.element.className = this.theme;
  }

  setTheme(element, theme) {
    if (typeof theme !== 'string') {
      return;
    }

    this.element = element;
    const oldTheme = this.theme;
    this.theme = theme;
    this.element.className = element.className.replace(oldTheme, this.theme);
  }

  getTheme() {
    return this.theme;
  }

  register(element) {
    this.element = element;
    this.setTheme(element, this.theme);
  }
}
import { browser, by, element } from 'protractor';

export class HomePage {
  static navigateTo() {
    return browser.get('/home');
  }

  static getMessageText() {
    return element(by.css('ngp-home h1')).getText();
  }

  static getNextMessage() {
    return element(by.css('ngp-home button')).click();
  }

}

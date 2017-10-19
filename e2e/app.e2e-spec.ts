import { TransionPage } from './app.po';

describe('transion App', () => {
  let page: TransionPage;

  beforeEach(() => {
    page = new TransionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

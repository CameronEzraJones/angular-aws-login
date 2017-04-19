import { KanbanAngularPage } from './app.po';

describe('kanban-angular App', () => {
  let page: KanbanAngularPage;

  beforeEach(() => {
    page = new KanbanAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

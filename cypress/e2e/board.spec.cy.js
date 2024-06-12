describe('Board Application', () => {
  before(() => {
    cy.intercept('GET', `localhost:3000/api/tasks`, { fixture: 'tasks.json' }).as('getTasks');
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should open and close the modal ', () => {
    cy.get('[data-cy=create-task-button]').click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=close-modal]').click();
    cy.wait(500);
    cy.contains('Create New Task').should('not.exist');
  });

  it('should create a new task', () => {
    cy.get('[data-cy=create-task-button]').click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=task-title]').type('New Task Test');
    cy.get('[data-cy=task-description]').type('New Task Description');
    cy.get('[data-cy=task-assignee]').type('John Doe');
    cy.get('[data-cy=task-status]').select('To Do');
    cy.get('[data-cy=save-task]').click();
    cy.wait(500);
    cy.contains('New Task Test').should('exist');
  });

  it('should drag and drop created new task to the Done section', () => {
    const dataTransfer = new DataTransfer();

    cy.contains('New Task Test').trigger('dragstart', {
      dataTransfer,
    });

    cy.contains('Done').trigger('drop', {
      dataTransfer,
    });
  });
});

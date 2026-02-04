describe('Ask question', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('When signed in and ask a valid question, the question should successfully save', () => {
    cy.contains('Q & A');
    cy.contains(/UNANSWERED QUESTIONS/i);

    cy.contains('Sign In').click();
    cy.url().should('include', 'auth0');

    cy.findByLabelText(/Email address/i)
      .type('hlib.bondarev@gmail.com')
      .should('have.value', 'hlib.bondarev@gmail.com');
    cy.get('#password')
      .type(',jylfhtd9696')
      .should('have.attr', 'type', 'password')
      .and('be.visible');
    cy.findByRole('button', { name: 'Continue' }).click();

    cy.contains(/Unanswered Questions/i);

    cy.contains('Ask a question').click();
    cy.contains('Ask a Question');
    var title = 'title test';
    var content = 'Lots and lots and lots and lots and lots of content test';
    cy.findByLabelText('Title').type(title).should('have.value', title);
    cy.findByLabelText('Content').type(content).should('have.value', content);

    cy.contains('ubmit Your Question').click();
    cy.contains('Your question was successfully submitted');

    cy.contains('Sign Out').click();
    cy.contains('You successfully signed out!');
  });
});

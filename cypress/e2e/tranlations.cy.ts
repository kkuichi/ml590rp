describe('Translation', () => {
  it('Unauthenticated change language', () => {
    cy.visit('/');

    cy.get('#language-select').click();
    cy.get('li').contains('sk').click();
    cy.get('#language-select').should('contain', 'Slovenský');
  });

  it('Authenticated change language', () => {
    cy.signIn();
    cy.get('button[data-id="settings-button"]').click();
    cy.get('button[value="sk"]').click();
    cy.get('button').contains('Zobraziť všetko').should('exist');
  });
});

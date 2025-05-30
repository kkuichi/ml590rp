/* eslint-disable @typescript-eslint/naming-convention */
import './commands';

// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command for signing the user in.
       * @example cy.signin()
       */
      signIn(): void;
    }
  }
}

Cypress.Commands.add('signIn', () => {
  cy.visit('/sign-in');
  cy.get('input[name="email"]').type(Cypress.env('TEST_EMAIL'));
  cy.get('input[name="password"]').type(Cypress.env('TEST_PASSWORD'));
  cy.get('button[data-id="credentials-sign-in"]').click();
  cy.url().should('include', '/dashboard');
});

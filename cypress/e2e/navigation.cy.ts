import {
  allRoutes,
  authRoutes,
  ERoutes,
  publicRoutes,
} from '@/lib/constants/routes';

describe('Navigation flow', () => {
  it('Should restrict access to PRIVATE routes', () => {
    allRoutes.forEach((route) => {
      cy.request({
        url: route,
        failOnStatusCode: false,
        followRedirect: false,
      }).then((response) => {
        if (![...publicRoutes, ...authRoutes].includes(route)) {
          expect(response.status).to.eq(302);
          expect(response.headers).to.have.property('location');
          expect(response.headers.location).to.include(ERoutes.signin);
        } else {
          expect(response.status).to.eq(200);
        }
      });
    });
  });

  it(`Should restrict access to AUTH and PUBLIC routes`, () => {
    cy.signIn();
    allRoutes.forEach((route) => {
      cy.request({
        url: route,
        failOnStatusCode: false,
        followRedirect: false,
      }).then((response) => {
        if ([...publicRoutes, ...authRoutes].includes(route)) {
          expect(response.status).to.eq(302);
          expect(response.headers).to.have.property('location');
          expect(response.headers.location).to.include(ERoutes.dashboard);
        } else {
          expect(response.status).to.eq(200);
        }
      });
    });
  });
});

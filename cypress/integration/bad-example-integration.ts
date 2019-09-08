/**
 * This example models a very simple way of testing a GQL client with Cypress.
 * By running our Cypress assertions against the local server we can quickly write tests without worrying about set-up of fixtures etc.
 */

describe("Urql example", () => {
    describe("Querying functionality", () => {
        it("Displays the expected components", () => {
            cy.visit("http://localhost:3000/");
            cy.get("[data-test-id=0]");
            cy.get("[data-test-id=1]");
            cy.get("[data-test-id=2]");
        });
        it("Components have correct classes", () => {
            cy.visit("http://localhost:3000/");
            cy.get("[data-test-id=0]")
                .get("p")
                .should("have.class", "");
            cy.get("[data-test-id=1]")
                .get("p")
                .should("have.class", "strikethrough");
            cy.get("[data-test-id=2]")
                .get("p")
                .should("have.class", "");
        });
    });
    describe("Refetching functionality", () => {
        it("Components have correct classes upon refetch", () => {
            cy.visit("http://localhost:3000/");
            cy.get("[data-test-id=0]")
                .get("p")
                .should("have.class", "");
            cy.get("[data-test-id=1]")
                .get("p")
                .should("have.class", "strikethrough");
            cy.get("[data-test-id=2]")
                .get("p")
                .should("have.class", "");
            cy.get("button").click();
            cy.get("[data-test-id=0]")
                .get("p")
                .should("have.class", "");
            cy.get("[data-test-id=1]")
                .get("p")
                .should("have.class", "strikethrough");
            cy.get("[data-test-id=2]")
                .get("p")
                .should("have.class", "");
        });
    });
    describe("Mutation functionality", () => {
        it("When clicking on data-test-id=0 it should have `strikethrough` class applied to it", () => {
            cy.visit("http://localhost:3000/");
            cy.get("[data-test-id=0]")
                .get("p")
                .should("have.class", "");
            cy.get("[data-test-id=0]").click();
            cy.get("[data-test-id=0]")
                .get("p")
                .should("have.class", "strikethrough");
        });
        it("When clicking on data-test-id=1 it should have `` class applied to it", () => {
            cy.visit("http://localhost:3000/");
            cy.get("[data-test-id=1]")
                .get("p")
                .should("have.class", "strikethrough");
            cy.get("[data-test-id=1]").click();
            cy.get("[data-test-id=1]")
                .get("p")
                .should("have.class", "");
        });
    });
});

/** Amazingly, this all works! However try running the tests again and see what happens.
 * Our server's data has been mutated 😱!
 */

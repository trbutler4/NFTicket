describe("Check Front Page", () => {
  it("Checks for various elements on the Front Page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Events");
    cy.contains("Create");
    cy.contains("NFTicket");
    cy.contains("Home");
    cy.contains("Connect Wallet");
  });
});

describe("Check Events Page", () => {
  it("Checks for various elements on the Events Page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Events").click();
    cy.url().should("include", "/events");
    cy.contains("Loading...");
  });
});

describe("Check Create Page", () => {
  it("Checks for various elements on the Create Page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Create").click();
    cy.url().should("include", "/create");
    cy.contains("Create Event");
    cy.contains("Event Name");
    cy.contains("Description");
    cy.contains("Upload Image");
  });
});

describe("Check My Tickets Page", () => {
  it("Checks for various elements on the My Tickets Page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("My Tickets").click();
    cy.url().should("include", "/tickets");
    cy.contains("OWNED");
  });
});

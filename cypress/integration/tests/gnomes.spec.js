/// <reference types="cypress" />

context('Gnomle tests', () => {


    it('first render, checking logo and search items are disaplyed correctly', () => {
        cy.visit('localhost:3000')

        cy.wait(2000)
        cy.get(".logo-gnomle").should("be.visible");
        cy.get(".gnomle-search-input").should("be.visible");
        cy.get(".gnomle-profession-selector").should("be.visible");
        cy.get(".gnomle-hair-color-selector").should("be.visible");
        cy.get(".gnomle-age-selector").should("be.visible");
        cy.get(".gnomle-height-selector").should("be.visible");
        cy.get(".gnomle-weight-selector").should("be.visible");
        cy.get(".gnomle-search-button").should("be.visible");
    })


    it('Should render 20 cards', () => {
        cy.get(".ui.raised.card").should('have.length', 20);
    })

    it('First card is Tobus Quickwhistle and cheking all its data is being displayed correctly', () => {
        cy.get(".ui.raised.card").first().should('contain.text', 'Tobus Quickwhistle');
        cy.get(".ui.raised.card").first().should('contain.text', 'Pink');
        cy.get(".ui.raised.card").first().should('contain.text', '306');
        cy.get(".ui.raised.card").first().should('contain.text', '107.76');
        cy.get(".ui.raised.card").first().should('contain.text', '39.07');
        cy.get(".ui.raised.card").first().should('contain.text', 'Metalworker');
        cy.get(".ui.raised.card").first().should('contain.text', 'Woodcarver');
        cy.get(".ui.raised.card").first().should('contain.text', 'Stonecarver');
        cy.get(".ui.raised.card").first().should('contain.text', 'Tinker');
        cy.get(".ui.raised.card").first().should('contain.text', 'Tailor');
        cy.get(".ui.raised.card").first().should('contain.text', 'Potter');
        cy.get(".ui.raised.card").first().should('contain.text', 'Show 2 friends');
        cy.get(".ui.raised.card").first().should('not.contain.text', 'Cogwitz Chillwidget');

    })


    it('Click on Tobus Quickwhistle friends and check they are displayed and hide them again', () => {
        cy.get(".gnomle-show-friends-button").first().click()
        cy.wait(1000)
        cy.get(".ui.raised.card").first().should('contain.text', 'Cogwitz Chillwidget');
        // cy.contains("Cogwitz Chillwidget").click();
        // cy.get('[data-modal="true"]').click()
        // cy.wait(2000)
        cy.get(".gnomle-hide-friends-button").first().click()
        cy.wait(1000)
        cy.get(".ui.raised.card").first().should('not.contain.text', 'Cogwitz Chillwidget');
    })


    it('Click on Tobus Quickwhistle friends and check they are displayed and hide them again', () => {
        cy.get(".gnomle-show-friends-button").first().click()
        cy.wait(1000)
        cy.get(".ui.raised.card").first().should('contain.text', 'Cogwitz Chillwidget');
        cy.get(".gnomle-hide-friends-button").first().click()
        cy.wait(1000)
        cy.get(".ui.raised.card").first().should('not.contain.text', 'Cogwitz Chillwidget');
    })


    it('Search for fi, first results should be Fizkin Voidbuster, Fizkin Switchbuster, Fizwood Clankstorque, Fizwood Wrongslicer', () => {
        cy.get(".gnomle-search-input").type('fi');
        cy.get(".gnomle-search-button").click();
        cy.wait(1000)
        cy.get(".ui.raised.card").first().should('contain.text', 'Fizkin Voidbuster');
        cy.get(".ui.raised.card").eq(1).should('contain.text', 'Fizkin Switchbuster');
        cy.get(".ui.raised.card").eq(2).should('contain.text', 'Fizwood Clankstorque');
        cy.get(".ui.raised.card").eq(3).should('contain.text', 'Fizwood Wrongslicer');
    })


    it('With fi, search for Mechanic in profession, Fizkin Switchbuster should be the only one result', () => {
        cy.get(".gnomle-profession-selector").type('Mechanic');
        cy.get(".gnomle-search-button").click();
        cy.wait(1000)
        cy.get(".ui.raised.card").first().should('contain.text', 'Fizkin Switchbuster');
    })

    it('With fi, and Mechanic in profession, add Red hair, no results sould be returned', () => {
        cy.get(".gnomle-hair-color-selector").type('Gray');
        cy.get(".gnomle-search-button").click();
        cy.wait(1000)
        cy.get("body").then($body => {
            if ($body.find("selector_for_your_button").length === 0) {
                assert.isOk('everything', 'everything is OK');
            }
        });
        cy.contains('No results').should('be.visible')
    })

    it('Reset and 20 pictures are displayed again', () => {
        cy.get(".gnomle-reset-button").click();
        cy.get(".gnomle-search-button").click();
        cy.wait(1000)
        cy.get(".ui.raised.card").should('have.length', 20);
    })

    it('Click on a friend and open modal -> Cogwitz Chillwidget', () => {
        cy.get(".gnomle-show-friends-button").first().click()
        cy.wait(1000)
        cy.get(".ui.raised.card").first().should('contain.text', 'Cogwitz Chillwidget');
        cy.contains("Cogwitz Chillwidget").click();
    })
    
    it('Click on a friend of a friend -> Malbert Felrocket', () => {
        cy.get(".friend-modal .gnomle-show-friends-button").first().click()
        cy.wait(1000)
        cy.contains("Malbert Felrocket").click()
    })


})
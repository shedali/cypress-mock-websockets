
Cypress.on('window:before:load', (win) => {
  delete win.fetch
})


/// <reference types="Cypress" />

let polyfill

before(()=>{
    //start websocket server with cy.exec('node index.js') and wait for it to be available
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'
    cy.request(polyfillUrl)
    .then((response) => {
      polyfill = response.body
    })
})

beforeEach(function () {
        cy.server();
        cy.route({
            method: "GET",
            url: "/sessionId",
            delay: 1000,
            response: {sessionId: "E1UhDeUV72eRSsBM5YWFMNQ6BLZb1cMdmyG6LxpjvgqHv8ynw9SK7WGlXQgy0oNPPiKu2HB7hpASAzhhlYDzA2juhNEDHKaVXVwcUSvP2yv76GilcEHHLxko0zrq38hV",
            sessionSignature: "HjQ65WjKJpaXlgrqAcVwwZvsYQOiGHTKjyqq7rcO7J6XtFNOOoURnQGFqzo58mq2L"}
        }).as('sessionId')

        cy.route({
            method: "GET",
            url: "/wmtp/messages/info",
            delay: 1000,
            status: 200,
            response: {message: "grand"}
          }).as('info')
    })


describe('load page', ()=>{
         it('should load page', ()=>{
             cy.visit('http://127.0.0.1:8888', {
                  onBeforeLoad (win) {
                    // delete window.fetch
                    // since the application code does not ship with a polyfill
                    // load a polyfilled "fetch" from the test
                    // window.eval(polyfill)
                    // window.fetch = window.unfetch
                    // debugger;
                  }
             })
             cy.wait(5000);
             cy.getData('modal');
             cy.wait('@sessionId')
             // .its('url').should('include', 'transport')
        })
})
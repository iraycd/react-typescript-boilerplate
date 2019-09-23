it('Render container of child cotainer equal the width of wrapper container (that wrap carousel component)', async () => {
    cy.visit('/')
    cy.viewport(1920, 1080)
    cy.wait(200)
    cy.getByTestId('testIndex')
  })
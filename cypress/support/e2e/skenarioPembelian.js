//Skenario 1 : Login KasirAja -> Add Transaction (Purchases) KasirAja -> Get Transaction (Purchases) Detail KasirAja

describe("Skenario 1", async ()=>{
    before( () => {
        //Open web kasirAja page login
        cy.visit('https://kasirdemo.belajarqa.com')
        cy.url().should('include', '/login')
        cy.wait(3000)
        }
    )
     

    it('Test Step - Login, Tambah Pembelian dan Lihat List Pembelian  ', async ()=>{
        //Open kasir aja login page
        cy.visit('https://kasirdemo.belajarqa.com')
        cy.url().should('include', '/login')
        
        //Assert page login
        cy.url().should('include','/login')
        cy.contains("hai, kasirAja")
        cy.wait(1000)

        //Input username and password
        cy.get('#email').type("diah.hikmah@gmail.com")
        cy.get('#password').type("tokodiah")

        //Click login
        cy.get('#root > div > div > div > div.css-1w7v3tn > div > button').click()

        //Assert page dashboard kasirAja
        cy.url().should('include','/dashboard')
        cy.contains("kasirAja")
        cy.wait(1000)

        //Click menu pembelian/purchases
        cy.get('[href="/purchases"] > .css-ewi1jp > .css-1xhj18k > .css-1mqa38q').click()

        //Assert purchases page after dashboard
        cy.url().should('include','/purchases')
        cy.contains("dashboard / pembelian")

        //click tambah
        cy.get('.css-1piskbq').click()

        //Assert create purchases page
        cy.url().should('include','/purchases/create')
        cy.contains("dashboard / pembelian / baru")

        // click produk
        cy.get('.css-1xhj18k > .chakra-button').click()

        // Assert pop up form produk
        cy.get('#chakra-modal--header-24').should('have.text', "produk")

        // input kode produk
        cy.get('.css-0 > .chakra-input__group > .chakra-input').type("NSL202302")

        // click produk
        cy.get('.css-13n66qk > :nth-child(1)')
        cy.contains("NSL202302").click()

        //Assert produk di list pembelian
        cy.url().should('include','/purchases/create')
        cy.contains("NSL202302")

        // input jumlah produk "NSL202302" sebesar 175 
        cy.get(':nth-child(4) > .chakra-input').clear().type('175')

        // input catatan = "Pembelian NSL202302 sebesar 175 buah"
        cy.get('.chakra-textarea').type("Pembelian NSL202302 sebesar 175 buah")

        // click simpan
        //cy.intercept('POST', '**/purchases').as('savePurchases')
        cy.get('.css-0 > .chakra-button').click()
        
        cy.wait(7000)

        //Click menu pembelian/purchases
        cy.get('[href="/purchases"] > .css-ewi1jp > .css-1xhj18k > .css-1mqa38q').click()

        //Assert purchases page 
        cy.url().should('include','/purchases')
        cy.contains("dashboard / pembelian")

        // click detail list pembelian
        cy.get(':nth-child(1) > :nth-child(5) > .chakra-button').click()

        //Assert purchases detail page 
        cy.url().should('include','/purchases')
        cy.contains("dashboard / pembelian / detail")

        // Assert isi detail pembelian
        cy.get('#penerima').should('have.value',"toko diah")
        cy.get('.chakra-textarea').should('have.value', "Pembelian NSL202302 sebesar 175 buah")
        cy.get('tbody.css-0 > .css-0 > :nth-child(1)').should('have.text', "NSL202302")
        cy.get('tbody.css-0 > .css-0 > :nth-child(2)').should('have.text', "Nescafe Original")
        cy.get('tbody.css-0 > .css-0 > :nth-child(3)').should('have.text', "8.600")
        cy.get('tbody.css-0 > .css-0 > :nth-child(4)').should('have.text', "175")
        cy.get('tbody.css-0 > .css-0 > :nth-child(5)').should('have.text', "1.505.000")
        cy.get(':nth-child(2) > .chakra-heading').should('have.text', "1.505.000")
    })
})

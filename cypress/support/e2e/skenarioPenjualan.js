//Skenario 2 = Login KassirAja -> Add Sales KasirAja -> Get Sale Order Data KasirAja

describe("Skenario 2", async ()=>{
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

        //Click menu penjualan/sales
        cy.get('[href="/sales"] > .css-ewi1jp > .css-1xhj18k > .css-1mqa38q').click()

        //Assert sales page after dashboard
        cy.url().should('include','/sales')
        cy.contains("dashboard / penjualan")

        //click tambah
        cy.get('.css-1piskbq').click()

        //Assert create sales page
        cy.url().should('include','/sales/create')
        cy.contains("dashboard / penjualan / baru")

        // click produk
        cy.get('.css-1xhj18k > .chakra-button').click()

        // Assert pop up form produk
        cy.get('#chakra-modal--header-31').should('have.text', "produk")

        // input kode produk
        cy.get('.css-0 > .chakra-input__group > .chakra-input').type("NSL202302")

        // click produk
        cy.get('.css-13n66qk > :nth-child(1)')
        cy.contains("NSL202302").click()

        //Assert produk di list penjualan
        cy.url().should('include','/sales/create')
        cy.contains("NSL202302")

        // input jumlah produk "NSL202302" sebesar 200
        cy.get(':nth-child(4) > .chakra-input').clear().type('200')

        // input nilai diskon = "500"
        cy.get('#diskon').type("500")

        // input catatan = "Penjualan NSL202302 sebesar 200 buah dengan diskon = Rp500"
        cy.get('.chakra-textarea').type("Penjualan NSL202302 sebesar 200 buah dengan diskon = Rp500")

        // input nilai jumlah bayar = "1.900.000"
        cy.get('.css-rltemf > .chakra-input').type("1.900.000")

        // click bayar
        cy.get('.css-n4rzf0 > .chakra-button').click()
        cy.wait(3000)

        // Assert alert message transaksi create penjualan sukses
        cy.get('#chakra-modal--header-22').should('have.text', "transaksi sukses")
        cy.get('#chakra-modal--body-22 > :nth-child(2)').should('have.text', "1.839.500")
        cy.get('#chakra-modal--body-22 > :nth-child(4)').should('have.text', "1.900.000")
        cy.get('#chakra-modal--body-22 > :nth-child(6)').should('have.text', "60.500")

        // click tutup
        cy.get('.chakra-modal__footer > .chakra-button').click()

        //Click menu penjualan/sales
        cy.get('[href="/sales"] > .css-ewi1jp > .css-1xhj18k > .css-1mqa38q').click()

        //Assert sales page after dashboard
        cy.url().should('include','/sales')
        cy.contains("dashboard / penjualan")

        //click detail penjualan
        cy.get(':nth-child(1) > :nth-child(6) > .chakra-button').click()

        //Assert purchases detail page 
        cy.url().should('include','/sales')
        cy.contains("dashboard / penjualan / detail")

        // Assert isi detail penjualan
        cy.get('#kasir').should('have.value', "toko diah")
        cy.get('#pelanggan').should('have.value', "Diah")
        cy.get('#diskon').should('have.value', "500")
        cy.get('.chakra-textarea').should('have.value', "Penjualan NSL202302 sebesar 200 buah dengan diskon = Rp500")
        cy.get('tbody.css-0 > .css-0 > :nth-child(1)').should('have.text', "NSL202302")
        cy.get('tbody.css-0 > .css-0 > :nth-child(2)').should('have.text', "Nescafe Original")
        cy.get('tbody.css-0 > .css-0 > :nth-child(3)').should('have.text', "9.200")
        cy.get('tbody.css-0 > .css-0 > :nth-child(4)').should('have.text', "200")
        cy.get('tbody.css-0 > .css-0 > :nth-child(5)').should('have.text', "1.840.000")
        cy.get(':nth-child(2) > .chakra-heading').should('have.text', "1.839.500")
    })
})

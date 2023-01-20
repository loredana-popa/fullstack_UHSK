describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
        })


    describe('Login', function() {

        it('succeeds with correct credentials', function() {
            cy.visit('http://localhost:3000')
            cy.contains('Log in to application')
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Matti Luukkainen logged in')
        })

        it('fails with wrong credentials', function() {
            cy.visit('http://localhost:3000')
            cy.contains('Log in to application')
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.message')
                .should('contain', 'Wrong credentials') 
                .and('have.css', 'color', 'rgb(255, 0, 0)')
            
            cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
        
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username: 'mluukkai', password: 'salainen'
            }).then(response => {
                localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })
    
        it('a blog can be created', function() {
            cy.contains('create new blog')
              .click() 

            cy.get('.title-input').type('Create a first blog')
            cy.get('.auth-input').type('Loredana')
            cy.get('.url-input').type('http://www.firstblog.com')
            cy.get('#addBlog-btn').click()

            cy.get('.message')
              .should('contain', 'a new blog: Create a first blog by Loredana added') 
              .and('have.css', 'color', 'rgb(0, 128, 0)')

            cy.get('html').should('contain', 'Create a first blog Loredana')
            
        })

        describe('and some blogs exist', function() {
            beforeEach(function () {
                cy.createBlog({
                    title: 'First blog',
                    author: 'Loredana',
                    url:'http://www.firstblog.com'
                }) 
                cy.createBlog({
                    title: 'Second blog',
                    author: 'Loredana',
                    url:'http://www.secondblog.com'
                }) 
                cy.createBlog({
                    title: 'Third blog',
                    author: 'Loredana',
                    url:'http://www.thirdblog.com'
                })
            })

            it('a user can see the details of a blog', function () {
                cy.contains('First blog Loredana')
                  .contains('view details').click()
                 
                cy.contains('First blog Loredana')
                  .parent().should('contain', 'http://www.firstblog.com')
                    .and('contain', 'Loredana')
                    .and('contain', 'likes: 0')
                  
                  .contains('hide')
                  

            })

            it ('a user can like a blog', function() {
                cy.contains('Third blog Loredana')
                  .contains('view details').click()

                cy.contains('Third blog Loredana')
                  .parent().find('.like-btn').click()

                cy.contains('Third blog Loredana')
                  .parent().should('contain', 'likes: 1')
  
            })
        })
       
    })
})
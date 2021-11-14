const chai = require('chai');
const chaiHttp = require('chai-http')
const should = chai.should();

const server = require('../../app')

chai.use(chaiHttp)

let token;

describe('/api/movies tests', () => {
    before(async (done) => {
        await chai.request(server)
            .post('/authenticate')
            .send({ username: "suleyman", password: "123123" })
            .end((err, res) => {
                console.log('RESPONSE ----> ', res)
                console.log('ERROR ----> ', err)
                done();
            })
    })

    describe('/GET Movies', () => {
        it('it should get all the movies', (done2) => {
            chai.request(server).get('/api/movie')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done2();
                })
        })
    })
})
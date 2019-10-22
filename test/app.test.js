const supertest = require("supertest");
const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);

describe("Server!", () => {

    afterEach(function(done) {

        setTimeout(function() {
            done();

        }, 1000);
    });
    let count = 1;

    while (count < 11) {

        it("hits the same endpoint 10 times and return 200", done => {
            chai
                .request(server)
                .get("/get/love.jpg")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equals(
                        "you got all data for love.jpg"
                    );
                })
            done();
        })
        count++
    }

    it("hits the same endpoint 1 more time and return 401", done => {

        chai
            .request(server)
            .get("/get/love.jpg")
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();

            });
    })

    it("hits a differnt endpoint 1 time and return 200", done => {
        chai
            .request(server)
            .get("/get/love2.jpg")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("you got all data for love2.jpg");
                done();
            });
    });

    it("hits first endpoint 1 time with different ip and returns 200", done => {
        chai
            .request(server)
            .get("/get/love.jpg")
            .set("X-Forwarded-For", "102.2.2.10")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("you got all data for love.jpg");
                done();
            });
    });
    after(() => {
        setTimeout(() => {
            it("hits the same endpoint 10 times and return 200", done => {
                chai
                    .request(server)
                    .get("/get/love.jpg")
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equals(
                            "you got all data for love.jpg"
                        );
                    });
                done();
            });

        }, 1000 * 58);

    });





});
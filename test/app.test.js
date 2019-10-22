const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
let endpoint1 = "/get/image1.jpg";
let endpoint2 = "/get/image2.jpg";
let mockedIP = "2.2.2.2";
let localIP = "127.0.0.1"

chai.use(chaiHttp);

describe("server() api calls.", () => {

    //set a timeout of 1 second after every test
    afterEach(function(done) {
        setTimeout(function() {
            done();
            // count to 1 second
        }, 1000);
    });

    //Wait 1 second after so the last test waits
    after(function(done) {
        setTimeout(function() {
            done();
            // count to 1 second
        }, 1000);
    });

    let count = 1;

    while (count <= 10) {

        it(`Call #${count} - Making an API call from ${localIP} to ${endpoint1}`, done => {
            
            chai
                .request(server)
                .get(endpoint1)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

        });
        count++;
    }

   
    
    it(`Call #${count} - This call should return a 401 - Making an API call from ${localIP} to ${endpoint1}`, done => {

        chai
            .request(server)
            .get(endpoint1)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });

    })
    count++;
    it(`Call #${count} - This call is to a different endpoint should return 200 - Making an API call from ${localIP} to ${endpoint2}`, done => {

        chai
            .request(server)
            .get(endpoint2)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });

    });

    count++;
    it(`Call #${count} - This call is from mocked IP and so should return 200 then will wait 60 seconds - Making an API call from ${mockedIP} to ${endpoint1}`, done => {
       
        chai
            .request(server)
            .get(endpoint1)
            .set("X-Forwarded-For", mockedIP)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done()
            });
           
    });

    count++;
    
    it(`Call #${count} - This call is called after 60 Second delay and should return 200 - Making an API call from ${localIP} to ${endpoint1}`, done => {
        setTimeout(()=>{
        chai
           .request(server)
           .get(endpoint1)
           .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
            
        }, 58000);
    })

   
   
});
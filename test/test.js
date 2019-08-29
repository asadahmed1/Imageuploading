var should = require('should')

var supertest = require('supertest')
var server = supertest.agent('http://localhost:3000')
describe('file upload test cases', function(){
    it('should upload file',function(done){
        server
        .post('/api/photo')
        .field('filename','test file')
        .attach('file','upload/userPhoto-1566990155089.jpg')
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200)
            done()
        })
    })
})
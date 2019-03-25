import Calculator from '../index';

var chai           = require('chai');               // Prepare chai (assertion interface - separate from mocha)
var chaiAsPromised = require("chai-as-promised");   // Prepare chaiAsPromised (used for promises)
chai.use(chaiAsPromised);
chai.should();                                      // Select chai as the default assertion interface

describe('Calculator', function () {
    describe('isPositive', function() {
        [3, 5, 2, 10000, 1, 2.4, 0].forEach(function(value) {
            it('should return true for values >= 0: testing ' + value, function() {
                return Calculator.isPositive(value).should.equal(true);
            });    
        });
        
        [-1, -10, -4, -3, -100000, -4.234].forEach(function(value) {
            it('should return false for values < 0: testing ' + value, function() {
                return Calculator.isPositive(value).should.equal(false);
            });
        });
    });
    
    describe('isNegative', function() {
        [-1, -10, -4, -3, -100000, -4.234].forEach(function(value) {
            it('should return true for values < 0: testing ' + value, function() {
                return Calculator.isNegative(value).should.equal(true);
            });
        });

        [3, 5, 2, 10000, 1, 2.4, 0].forEach(function(value) {
            it('should return false for values >= 0: testing ' + value, function() {
                return Calculator.isNegative(value).should.equal(false);
            });    
        });
    });

    describe('isPositive and isNegative', function () {
        var items = [4, -2, 1, -1, 0];
        items.forEach(function (value) {
            it(value + ' should only belong to exactly one', function (done) {
                // If done is not called exactly once, the test fails.
                if(Calculator.isPositive(value)) {
                    done();
                }
                if(Calculator.isNegative(value)) {
                    done();
                }
            });
        });
    });

    describe('root', function() {
        this.slow(1500);    // Test under 750 are green, else tests under 1500 are yellow, else tests are red.
        [[4, 2, 2], [16, 2, 4], [256, 8, 2], [25, 2, 5], [27, 3, 3]].forEach(function(value) {
            it(value[1] + '-root of ' + value[0] + ' should equal ' + value[2], function() {
                // The should.eventually allows Promises to complete before returning.
                return Calculator.root(value[0], value[1]).should.eventually.equal(value[2]);
            });
        });

        for(let i = 2; i <= 4; i++) {
            describe(i + '-roots', function() {
                before(function() {     // Runs before all tests in this describe.
                    console.log("           starting specific root test");
                });
        
                after(function() {      // Runs after all tests in this describe.
                    console.log("           stopping specific root test");
                });

                [25, 27, 4, 16, 18, 13, 2, 1, 10, 100].forEach(function(value) {
                    it(i + '-root of ' + value + ' should be correct', async function () {
                        var returnedValue = await Calculator.root(value, i);    // Await is another method of working with Promises in Javascript.
                        return Math.pow(returnedValue, i).should.be.closeTo(value, 0.00000000001);  // Close to - accurate within a certain range (float precision).
                    });
                });
            });
        }

        describe('imaginary', function() {
            it('should return valid values');   //TODO test not implemented, won't be run if no callback
        });
    })

    describe.skip('cos', function() {   //TODO will not be run until cos implemented (skip)
        for(let i = 0; i < 20; i++) {
            it('should give ranges between 0 and 2*pi', function() {
                Calculator.cos(Math.random() * 10 * i).should.be.closeTo(Math.PI, Math.PI);
            });
        }
        it('should give correct values');   //TODO test not implemented, won't run with no callback
    });

    describe('toggle', function() {
        it('should return false within 2 tries', function() {
            this.retries(1);    // 1 retry = 2 total tries
            Calculator.toggleReturn().should.be.false;
        });

        it('should return true within 2 tries', function() {
            this.retries(1);    // 1 retry = 2 total tries
            Calculator.toggleReturn().should.be.true;
        });
    });
});
var pactor = require('../src/pactor.js');

describe('pactor', function(){

    describe('applyContract', function(){

        var testObject,
            testContract;

        beforeEach(function(){
            testObject = {
                testNumber: 1234,
                testString: 'a string',
                testBoolean: false,
                testObject: {},
                testArray: [],
                testNull: null,
                testGarbage: 'foo'
            };

            testContract = {
                testNumber: {
                    type: 'number',
                    nullable: false
                },
                testString: {
                    type: 'string',
                    nullable: false
                },
                testBoolean: {
                    type: 'boolean',
                    nullable: false
                },
                testObject: {
                    type: 'object',
                    nullable: true
                },
                testArray: {
                    type: 'array',
                    nullable: false
                },
                testNull: {
                    type: 'null',
                    nullable: true
                }
            };
        });

        it('should remove properties not defined in the contract', function(){
            var result = pactor.applyContract(testContract, testObject);
            expect(result.testGarbage).toBe(undefined);
        });

        it('should throw an error if object does not match the contract', function(){
            testObject.testString = 100;
            expect(pactor.applyContract.bind(null, testContract, testObject)).toThrow();
        });

        it('should not throw an error if object is null and data is nullable', function(){
            testObject.testObject = null;
            expect(pactor.applyContract.bind(null, testContract, testObject)).not.toThrow();
        });

    });

});

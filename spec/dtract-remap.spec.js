var dtract = require('../dist/dtract.js');

describe('Remap', function(){

    var data,
        map;

    beforeEach(function(){
        data = {
            staticValue: 'Do not change me',
            mappableValue: 'Change me with a map',
            functionMutableValue: 'Change me with a function'
        };

        map = {
            mappableValue: {
                name: 'remappedValue'
            },

            functionMutableValue: {
                name: 'functionRemappedValue',
                mapper: function(value){
                    return value.split(' ').length;
                }
            }
        };
    });

    describe('remap', function(){

        it('should not change values not included in the map', function(){
            var result = dtract.remap(map, data);

            expect(result.staticValue).toBe(data.staticValue);
        });

        it('should rename properties which have a name property in the map', function(){
            var result = dtract.remap(map, data);

            expect(result.remappedValue).toBe(data.mappableValue);
        });

        it('should remap property using the mapFunction', function(){
            var result = dtract.remap(map, data);

            expect(result.functionRemappedValue).toBe(5);
        });

    });

});

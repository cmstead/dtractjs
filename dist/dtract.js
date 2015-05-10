var dtract = {};

(function(dtract){
    'use strict';

    function elementToString(dataElement){
        var dataString = typeof dataElement;
        return dataString === 'object' ? Object.prototype.toString.call(dataElement) : dataString;
    }

    function getType(dataElement){
        var isNull = dataElement === null,
            isArray = elementToString(dataElement) === '[object Array]',
            dataType = typeof dataElement;

        dataType = isNull ? 'null' : dataType;
        dataType = isArray ? 'array' : dataType;

        return dataType;
    }

    function checkProperty(contract, dataObject, key){
        var typeOkay = getType(dataObject[key]) === contract[key].type,
            nullOkay = dataObject[key] === null && contract[key].nullable,
            errorMessage;

        if(!typeOkay && !nullOkay){
            errorMessage = 'Data contained at property ' + key +
                           ' must be of type ' + contract[key].type +
                           ' but was ' + (typeof dataObject[key]);

            throw new Error(errorMessage);
        }
    }


    dtract.elementToString = elementToString;
    dtract.getType = getType;
    dtract.checkProperty = checkProperty;

})(dtract);

(function(dtract){
    'use strict';

    var checkProperty = dtract.checkProperty,
        getType = dtract.getType;

    function filterData(contract, dataObject){
        var finalObject = {},
            dataKeys = Object.keys(dataObject);

        dataKeys.forEach(function(key){
            if(contract[key] !== undefined){
                finalObject[key] = dataObject[key];
            }
        });

        return finalObject;
    }

    function applyContract(contract, dataObject){
        var finalData = filterData(contract, dataObject),
            contractKeys = Object.keys(contract);

        contractKeys.forEach(function(key){
            checkProperty(contract, dataObject, key);
        });

        return finalData;
    }

    dtract.applyContract = applyContract;
    dtract.filterData = filterData;

})(dtract);

(function(dtract){
    'use strict';

    function identity(value){
        return value;
    }

    function mapValue(map, data, output, key){
        var mapObject = map[key],
            mapper = !!mapObject && !!mapObject.mapper ? mapObject.mapper : identity,
            dataProperty = data[key],
            outputKey = !!mapObject ? mapObject.name : key;

        output[outputKey] = mapper(dataProperty);
    }

    function remap(map, data){
        var dataKeys = Object.keys(data),
            output = {},
            valueMapper = mapValue.bind(null, map, data, output);

        dataKeys.forEach(valueMapper);

        return output;
    }

    dtract.remap = remap;

})(dtract);

if(module !== undefined && module.exports){
    module.exports = dtract;
}

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

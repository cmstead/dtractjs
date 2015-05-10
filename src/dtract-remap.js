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

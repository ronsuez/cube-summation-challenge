# Cube Summation - Rappi challenge

### Exercise details
* [hackerrank-cube-summation](https://www.hackerrank.com/challenges/cube-summation)

### Architecture

```
[REST API - express app]
  |-> routes (id -> Cube id)
        -> GET /
        -> GET /:id
        -> POST /
        -> POST /:id/update
        -> POST /:id/query
  |-> Cube controller
        -> CubeFindAll
        -> CubeFindById
        -> CubeCreate
        -> CubeUpdateValue
        -> CubeQuery
  
  |-> Cube Model
    -> schema:
       dimension: {
            type: Number,
            min: [4, 'min dimension is 4'],
            max: [100, 'max dimension is 100'],
            required: [true, 'a valid dimension is needed']
        },
        state: {
            type: Array,
        }
  
  |-> Cube Utils (helper module)
    -> methodes:
        {
            initialize: initialize,
            checkCoordinates: checkCoordinates,
            queryValue: queryValue,
            updateValue: updateValue,
            parseInput: parseInput
        }        
```
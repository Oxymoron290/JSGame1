var fs = require('fs');

var path = 'public\\assets\\FertileSoil\\modular_temple\\';
var writePath = 'assets/FertileSoil/modular_temple/';
var commonMaterial = 'Materials_Modular_Temple'
var package = 'modular_temple';
var areaPerEntity = 30;
var gridSize, count;
var grid = [];
var output = [];



fs.readdir(path, function(err, items){
    count = 0;
    var entities = [];

    items.forEach((item, index) => {
        if(item.indexOf('.obj')>=0){
            entities.push(item.substr(0, item.indexOf('.obj')));
            count++;
        }
    })

    gridSize = Math.sqrt(count);
    console.log("Total Files: " + count + " (" + gridSize + ")");
    entities.forEach(iterate1);
    grid.forEach(iterate2);
    //console.log(JSON.stringify(output));
    fs.writeFile(package + '.json', JSON.stringify(output), 'utf8', () => console.log("done"));
})

var iterate1 = function(name, index){
    var row = Math.floor(index/gridSize);
    if(!grid[row]){
        grid[row] = [];
    }

    if(!commonMaterial){
        commonMaterial = name;
    }

    grid[row].push({
        name,
        position: {x: 0, y: 0, z: 0},
        scale: {x: 5, y: 5, z: 5},
        rotation: {x: 0, y: 0, z: 0},
    
        mesh: writePath + name + ".obj",
        material: writePath + commonMaterial + ".mtl"
    });
}

var iterate2 = function(entityRow, row){
    entityRow.forEach((entity, column) => {
        entity.position.x = row * areaPerEntity;
        entity.position.z = column * areaPerEntity;
        output.push(entity);
    });
}
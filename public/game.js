var game = function(){
    var scene, camera, renderer, controls;

    var objects = [];
    var raycaster;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;
    
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();
    var direction = new THREE.Vector3();
    var vertex = new THREE.Vector3();
    var color = new THREE.Color();

    init();
    animate();

    function initControls(){
        controls = new THREE.PointerLockControls( camera );
        
        var blocker = document.getElementById( 'blocker' );
        var instructions = document.getElementById( 'instructions' );

        instructions.addEventListener( 'click', function () {
            controls.lock();
        }, false );

        controls.addEventListener( 'lock', function () {
            instructions.style.display = 'none';
            blocker.style.display = 'none';
        } );

        controls.addEventListener( 'unlock', function () {
            blocker.style.display = 'block';
            instructions.style.display = '';
        } );
        
        scene.add( controls.getObject() );

        var onKeyDown = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    moveForward = true;
                    break;
                case 37: // left
                case 65: // a
                    moveLeft = true;
                    break;
                case 40: // down
                case 83: // s
                    moveBackward = true;
                    break;
                case 39: // right
                case 68: // d
                    moveRight = true;
                    break;
                case 32: // space
                    if ( canJump === true ) velocity.y += 350;
                    canJump = false;
                    break;
            }
        };
        var onKeyUp = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    moveForward = false;
                    break;
                case 37: // left
                case 65: // a
                    moveLeft = false;
                    break;
                case 40: // down
                case 83: // s
                    moveBackward = false;
                    break;
                case 39: // right
                case 68: // d
                    moveRight = false;
                    break;
            }
        };
        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );

        raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    }

    function initScene(){
        // // floor
        // var floorGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
        // floorGeometry.rotateX( - Math.PI / 2 );

        // // vertex displacement
        // var position = floorGeometry.attributes.position;
        // for ( var i = 0, l = position.count; i < l; i ++ ) {
        //     vertex.fromBufferAttribute( position, i );
        //     vertex.x += Math.random() * 20 - 10;
        //     vertex.y += Math.random() * 2;
        //     vertex.z += Math.random() * 20 - 10;
        //     position.setXYZ( i, vertex.x, vertex.y, vertex.z );
        // }

        // floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
        // position = floorGeometry.attributes.position;
        // var colors = [];
        // for ( var i = 0, l = position.count; i < l; i ++ ) {
        //     color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
        //     colors.push( color.r, color.g, color.b );
        // }
        // floorGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
        // var floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
        // var floor = new THREE.Mesh( floorGeometry, floorMaterial );
        // scene.add( floor );
        // // objects
        // var boxGeometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
        // boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices
        // position = boxGeometry.attributes.position;
        // colors = [];
        // for ( var i = 0, l = position.count; i < l; i ++ ) {
        //     color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
        //     colors.push( color.r, color.g, color.b );
        // }
        // boxGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
        // for ( var i = 0; i < 500; i ++ ) {
        //     var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );
        //     boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
        //     var box = new THREE.Mesh( boxGeometry, boxMaterial );
        //     box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
        //     box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
        //     box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
        //     scene.add( box );
        //     objects.push( box );
        // }
        
        //loadObjFromJSON('entities/barrels.json');

        //loadObjFromJSON('entities/cart.json');
        //loadObjFromJSON('entities/scene.json');

        //loadObjFromJSON('entities/eracoon/scene1.json');
        //loadObjFromJSON('entities/eracoon/landscape_asset_v2a.json');
        //loadObjFromJSON('entities/eracoon/LandscapeAsset_v1.json');
        loadObjFromJSON('entities/FertileSoil/modular_village.json',
        {
            position: {x: 550, y: 0, z: 0},
            scale: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 0, z: 0}
        });
        loadObjFromJSON('entities/FertileSoil/modular_temple.json',
        {
            position: {x: 0, y: 0, z: 550},
            scale: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 0, z: 0}
        });
        loadObjFromJSON('entities/FertileSoil/modular_terrain.json');
    }

    function init(){
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x333333 );
        scene.fog = new THREE.Fog( 0x333333, 0, 750 );

        var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
        light.position.set( 0.5, 1, 0.75 );
        scene.add( light );

        // var light = new THREE.AmbientLight(0xffffff);
        // scene.add(light);

        var bulb = new THREE.PointLight(0xafafaf, 1, 100);
        bulb.position.set(15, 15, 15);
        scene.add(bulb);

        initControls();

        initScene();

        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer( { antialias: true } ) : new THREE.CanvasRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
    function animate() {
        requestAnimationFrame( animate );
        if ( controls.isLocked === true ) {
            raycaster.ray.origin.copy( controls.getObject().position );
            raycaster.ray.origin.y -= 10;
            var intersections = raycaster.intersectObjects( objects );
            var onObject = intersections.length > 0;
            var time = performance.now();
            var delta = ( time - prevTime ) / 1000;
            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;
            velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
            direction.z = Number( moveForward ) - Number( moveBackward );
            direction.x = Number( moveLeft ) - Number( moveRight );
            direction.normalize(); // this ensures consistent movements in all directions
            if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
            if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
            if ( onObject === true ) {
                velocity.y = Math.max( 0, velocity.y );
                canJump = true;
            }
            controls.getObject().translateX( velocity.x * delta );
            controls.getObject().translateY( velocity.y * delta );
            controls.getObject().translateZ( velocity.z * delta );
            if ( controls.getObject().position.y < 10 ) {
                velocity.y = 0;
                controls.getObject().position.y = 10;
                canJump = true;
            }
            prevTime = time;
        }

        var pinkie = scene.getObjectByName("Prop_Barrel_1", true);
        if(pinkie){
            pinkie.rotation.y += 0.01;
        }
        renderer.render( scene, camera );
    }
    
    function loadObjFromJSON(path, offset){
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                
                var result = JSON.parse(xobj.responseText);
                result.forEach((item, index) => loadObj(item, offset));
            }
        };
        xobj.send(null);
    }

    function loadObj(entity, offset){
        if(!offset){
            offset = {
                position: {x: 0, y: 0, z: 0},
                scale: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0}
            }
        }

        var objLoader = new THREE.OBJLoader2();
    
        var callbackOnLoad = function(event){
            var obj = event.detail.loaderRootNode;
            obj.name = entity.name;
            obj.position.set(entity.position.x + offset.position.x, entity.position.y + offset.position.y, entity.position.z + offset.position.z);
            obj.scale.set(entity.scale.x + offset.scale.x, entity.scale.y + offset.scale.y, entity.scale.z + offset.scale.z);
            obj.rotation.set(entity.rotation.x + offset.rotation.x, entity.rotation.y + offset.rotation.y, entity.rotation.z + offset.rotation.z);
            scene.add(obj);
            objects.push(obj);
            console.log( 'Loading complete: ' + event.detail.modelName );
        };
    
        var onLoadMtl = function( materials ){
            objLoader.setModelName( entity.name );
            objLoader.setMaterials( materials );
            objLoader.load(entity.mesh, callbackOnLoad, null, null, null, false)
        };
        console.log(entity);
        console.log("Loading " + entity.name);
        objLoader.loadMtl(entity.material, null, onLoadMtl);
    }
}();
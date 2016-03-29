var camera, scene, renderer;
var mesh;

var clock = new THREE.Clock();

init();
animate();

function createNewPainting(src, width, height, _thickness){

    thickness = _thickness;
    painting = new THREE.Object3D();

    var painting_geometry = new THREE.PlaneGeometry( width, height );
    var side_geomerty = new THREE.PlaneGeometry( thickness, height );
    var topbottom_geomerty = new THREE.PlaneGeometry( thickness, width );

    var artwork = THREE.ImageUtils.loadTexture( src );
    artwork.anisotropy = renderer.getMaxAnisotropy();

    var painting_material = new THREE.MeshBasicMaterial( { map: artwork, side: THREE.DoubleSide } );
    var side_material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );

    var painting_mesh = new THREE.Mesh( painting_geometry, painting_material );
    painting_mesh.position = new THREE.Vector3( 0, 0, 0 + thickness);

    var left_side_mesh = new THREE.Mesh(side_geomerty,side_material);
    left_side_mesh.rotation = new THREE.Euler( 0, Math.PI/2, 0, 'XYZ' );
    left_side_mesh.position = new THREE.Vector3( (width/2), 0, (thickness*0.5) );

    var right_side_mesh = new THREE.Mesh(side_geomerty,side_material);
    right_side_mesh.rotation = new THREE.Euler( 0, Math.PI/2, 0, 'XYZ' );
    right_side_mesh.position = new THREE.Vector3( (-width/2), 0, (thickness*0.5) );

    var bottom_side_mesh = new THREE.Mesh(topbottom_geomerty,side_material);
    bottom_side_mesh.rotation = new THREE.Euler( Math.PI/2, 0, Math.PI/2, 'XYZ' );
    bottom_side_mesh.position = new THREE.Vector3( 0, (height/2), (thickness*0.5) );

    var top_side_mesh = new THREE.Mesh(topbottom_geomerty,side_material);
    top_side_mesh.rotation = new THREE.Euler( Math.PI/2, 0, Math.PI/2, 'XYZ' );
    top_side_mesh.position = new THREE.Vector3( 0, (-height/2), (thickness*0.5) );

    painting.add( painting_mesh );
    painting.add( left_side_mesh );
    painting.add( right_side_mesh );
    painting.add( bottom_side_mesh );
    painting.add( top_side_mesh );

    // var painting_container = new THREE.Object3D();
    // painting_container.add(painting);
    return painting;

}

function createNewWall(wallTexture, width, height){

    var wall = new THREE.Object3D();
    var wall_geometry = new THREE.PlaneGeometry( width, height );
    var wall_material = new THREE.MeshBasicMaterial( { map: wallTexture, side: THREE.DoubleSide } );
    wallTexture.anisotropy = renderer.getMaxAnisotropy();

    var wall_mesh = new THREE.Mesh( wall_geometry, wall_material );
    wall_mesh.position = new THREE.Vector3( 0, 0, 0 );

    wall.add(wall_mesh);
    wall.rotation.set(0,0,0, 'XYZ');

    return wall;

}


function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.x = -300;


    controls = new THREE.FirstPersonControls( camera );
    controls.verticalMin = 0;
    controls.verticalMax = 0;
    controls.noFly = false;
    controls.movementSpeed = 400;
    controls.lookSpeed = 0.2;
    controls.lookVertical = true;

    scene = new THREE.Scene();

    //3072 x 2304 img/wall.jpg
    var wall_texture = THREE.ImageUtils.loadTexture( 'img/wall.jpg' );
    var wood_texture = THREE.ImageUtils.loadTexture( 'img/wood.jpg' );


    var ru = createNewPainting('img/ru.jpg', 40, 40, 3);
    ru.position = new THREE.Vector3(0, 50, 0);
    var jen = createNewPainting('img/jen.jpg', 40, 40, 3);
    jen.position = new THREE.Vector3(200, 50, 0);
    wall = createNewWall(wall_texture, 610, 400);
    wall.rotation.set(0,-Math.PI/2,0, 'XYZ');
    wall.add(ru);
    wall.add(jen);

    scene.add(wall);

    var smaati1 = createNewPainting('img/smaati1.jpg', 1 * 50, (249/236) * 50, 7);
    smaati1.position = new THREE.Vector3(0, 50, 0);
    var smaati2 = createNewPainting('img/smaati2.jpg', 1 * 50, (196/236) * 50, 7);
    smaati2.position = new THREE.Vector3(-100, 50, 0);
    var wall2 = createNewWall(wall_texture, 610, 400);
    wall2.rotation.set(0,0,0, 'XYZ');
    wall2.position = new THREE.Vector3(-300, 0, -300);
    wall2.add(smaati1);
    wall2.add(smaati2);

    scene.add(wall2);

    var b1 = createNewPainting('img/beach1.jpg', 100, 100, 7);
    b1.position = new THREE.Vector3(0, 10, 0);
    var b2 = createNewPainting('img/beach2.jpg', 100, 100, 7);
    b2.position = new THREE.Vector3(-160, 10, 0);
    var wall3 = createNewWall(wall_texture, 610, 400);
    wall3.rotation.set(0,Math.PI,0, 'XYZ');
    wall3.position = new THREE.Vector3(-300, 0, 300);
    wall3.add(b1);
    wall3.add(b2);

    scene.add(wall3);

    var floor = createNewWall(wood_texture, 610, 610);
    floor.rotation.set(Math.PI/2,0,0, 'XYZ');
    floor.position = new THREE.Vector3(-300, -200, 0);

    scene.add(floor);

    var ceiling = createNewWall(wood_texture, 610, 610);
    ceiling.rotation.set(Math.PI/2,0,Math.PI/2, 'XYZ');
    ceiling.position = new THREE.Vector3(-300, 200, 0);

    scene.add(ceiling);


    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();

}

function animate() {

    requestAnimationFrame( animate );
    controls.update( clock.getDelta() );
    //wall.rotation.set(0,clock.getElapsedTime(), 0);
    //camera.rotation.set(0,clock.getElapsedTime(), 0, 'XYZ');

    //console.log(clock.getElapsedTime());
    renderer.render( scene, camera );

}

	var camera, scene, renderer;
			var mesh;
			
			var clock = new THREE.Clock();
			
			
			init();
			animate();
			
			
			
			function createNewPainting(src, width, height, x, y ,z){
				
				thickness = 5;
				painting = new THREE.Object3D();
								
				var grootvlakG = new THREE.PlaneGeometry( width, height );
				var kleinvlakG = new THREE.PlaneGeometry( thickness, height );
				
				
				var artwork = THREE.ImageUtils.loadTexture( src );
				artwork.anisotropy = renderer.getMaxAnisotropy();
				
				
				grootvlakM = new THREE.MeshBasicMaterial( { map: artwork, side: THREE.DoubleSide } );
				kleinvlakM = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
				
				mainFrontMesh = new THREE.Mesh( grootvlakG, grootvlakM );
				mainFrontMesh.position = new THREE.Vector3( x, y, z );
				mainBackMesh = new THREE.Mesh( grootvlakG, grootvlakM );
				mainBackMesh.position = new THREE.Vector3( x, y, z-thickness );
				
				leftMesh = new THREE.Mesh(kleinvlakG,kleinvlakM);
				leftMesh.rotation = new THREE.Euler( 0, Math.PI/2, 0, 'XYZ' );
				leftMesh.position = new THREE.Vector3( (width/2)+x, y, z+(-thickness/2) );
				
				rightMesh = new THREE.Mesh(kleinvlakG,kleinvlakM);
				rightMesh.rotation = new THREE.Euler( 0, Math.PI/2, 0, 'XYZ' );
				rightMesh.position = new THREE.Vector3( (-width/2)+x, y, z+(-thickness/2) );
				
				
						
				painting.add( mainFrontMesh );
				painting.add( mainBackMesh );
				painting.add( leftMesh );
				painting.add( rightMesh );
				
				return painting;
			
			}
			
			
			function init() {

				renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 100;
				
				controls = new THREE.FirstPersonControls( camera );

				controls.movementSpeed = 200;
				controls.lookSpeed = 0.125;
				controls.lookVertical = true;

				scene = new THREE.Scene();

				/*var geometry = new THREE.BoxGeometry( 10, 200, 200 );

				var texture = THREE.ImageUtils.loadTexture( 'img/beach2.jpg' );
				texture.anisotropy = renderer.getMaxAnisotropy();

				var material = new THREE.MeshBasicMaterial( { map: texture } );

				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );*/
				
				p1 = createNewPainting('img/beach1.jpg', 100, 100, 0,0,0);
				
				p2 = createNewPainting('img/beach2.jpg', 100, 100, 200,0,0);
				
				wall = createNewPainting('img/wall.jpg', 1000, 400, 0,0,-5);
				
				
				
				
				scene.add(p1);	
				scene.add(p2);	
				scene.add(wall);	
				
				/*
				
				var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
				plane = new THREE.Mesh( geometry, material );
				scene.add( plane )*/

				//

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
				//plane.rotation.x += 0.005;
				//p1.rotation.y += 0.01;

				renderer.render( scene, camera );

			}
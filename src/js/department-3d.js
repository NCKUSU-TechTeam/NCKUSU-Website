var table = [
    "廖宇祥", "學生會會長", "2016.9", 1,1,'suc_president',
    "余培雅", "學生會副會長", "2016.9",2,1,'suc_vicepresident',
	"瞿旭民", "資訊部部長", "2016.9", 3,1,'suc_esit_minister',
    "蘇皇偉", "資訊部副部長","2016.9",3,2,'suc_esit_viceminister',
    "cherry", "公關部部長","2016.9",4,1,'suc_pr_minister',
    "洪立軒", "公關部副部長", "2016.9",4,2,'suc_pr_viceminister',
    "蔡家寧", "財務部部長","2016.9",5,1,'suc_fd_minister',
    "郭筱彤", "財務部副部長","2016.9",5,2,'suc_fd_viceminister',
    "鄭宇正", "權益部部長","2016.9",6,1,'suc_ri_minister',
    "王郁仁", "權益部副部長" , "2016.9",6,2,'suc_ri_viceminister',
    "球寶", "新聞部部長" , "2016.9",7,1,'suc_news_minister',
    "王榆翔","新聞部副部長","2016.9",7,2,'suc_news_viceminister',
    "彭鈺淇", "新聞部副部長","2016.9",7,3,'suc_news_viceminister_2',
    "鄭芮竹", "外務部部長","2016.9",8,1,'suc_isr_minister',
    "曾柏鈞", "外務部副部長","2016.9",8,2,'suc_isr_viceminister',
    "陳昀聖", "活動部部長","2016.9",9,1,'suc_ppap_minister',
    "吳佩穎", "活動部副部長","2016.9",9,2,'suc_ppap_viceminister',
    "許哲睿", "秘書部部長","2016.9",10,1,'suc_hr_minister',
    "張庭瑄", "秘書部副部長","2016.9",10,2,'suc_hr_viceminister',
    "陳估熊", "學術部部長","2016.9",11,1,'suc_ad_minister',
    "洪紋雅", "學術部副部長","2016.9",11,2,'suc_ad_viceminister',
    "許樂", "研權部部長","2016.9",12,1,'suc_gsr_minister',
    "吳馨如", "研權部執秘","2016.9",12,2,'suc_gsr_secretary',
    "史蕓瑄", "學生會執秘", "2016.9",13,1,'suc_secretary'
];
var camera, scene, renderer;
var controls;
var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };
init();
animate();
function init() {
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 3000;
	scene = new THREE.Scene();
	// table
	for ( var i = 0; i < table.length; i += 6 ) {
		var element = document.createElement( 'div' );
		element.className = 'element';
		element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
		var number = document.createElement( 'div' );
		number.className = 'number';
        number.style.fontSize = '24px';
		number.textContent = (i/6) + 1;
		element.appendChild( number );
		var symbol = document.createElement( 'div' );
		symbol.className = 'symbol';
		symbol.textContent = table[ i ];
        symbol.style.fontSize = '48px';
		element.appendChild( symbol );
		var details = document.createElement( 'div' );
		details.className = 'details';
		details.innerHTML = '<a class="detail_link" href=\"/'+table[i+5]+'\">'+table[ i + 1 ] + '<br>' + table[ i + 2 ] +'</a>';
        details.style.fontSize = '36px';
		element.appendChild( details );
		var object = new THREE.CSS3DObject( element );
		object.position.x = Math.random() * 4000 - 2000;
		object.position.y = Math.random() * 4000 - 2000;
		object.position.z = Math.random() * 4000 - 2000;
		scene.add( object );
		objects.push( object );
		//
		var object = new THREE.Object3D();
		object.position.x = ( table[ i + 3 ] * 250 ) - 1330;
		object.position.y = - ( table[ i + 4 ] * 290 ) + 990;
		targets.table.push( object );
	}
	// sphere
	var vector = new THREE.Vector3();
	var spherical = new THREE.Spherical();
	for ( var i = 0, l = objects.length; i < l; i ++ ) {
		var phi = Math.acos( -1 + ( 2 * i ) / l );
		var theta = Math.sqrt( l * Math.PI ) * phi;
		var object = new THREE.Object3D();
		spherical.set( 800, phi, theta );
		object.position.setFromSpherical( spherical );
		vector.copy( object.position ).multiplyScalar( 2 );
		object.lookAt( vector );
		targets.sphere.push( object );
	}
	// helix
	var vector = new THREE.Vector3();
	var cylindrical = new THREE.Cylindrical();
	for ( var i = 0, l = objects.length; i < l; i ++ ) {
		var theta = i * 0.175 + Math.PI;
		var y = - ( i * 8 ) + 450;
		var object = new THREE.Object3D();
		cylindrical.set( 900, theta, y );
		object.position.setFromCylindrical( cylindrical );
		vector.x = object.position.x * 2;
		vector.y = object.position.y;
		vector.z = object.position.z * 2;
		object.lookAt( vector );
		targets.helix.push( object );
	}
	// grid
	for ( var i = 0; i < objects.length; i ++ ) {
		var object = new THREE.Object3D();
		object.position.x = ( ( i % 5 ) * 400 ) - 800;
		object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
		object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
		targets.grid.push( object );
	}
	//
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	document.getElementById( 'container' ).appendChild( renderer.domElement );
	//
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 0.5;
	controls.minDistance = 500;
	controls.maxDistance = 6000;
	controls.addEventListener( 'change', render );
	var button = document.getElementById( 'table' );
	button.addEventListener( 'click', function ( event ) {
		transform( targets.table, 2000 );
	}, false );
	var button = document.getElementById( 'sphere' );
	button.addEventListener( 'click', function ( event ) {
		transform( targets.sphere, 2000 );
	}, false );
	var button = document.getElementById( 'helix' );
	button.addEventListener( 'click', function ( event ) {
		transform( targets.helix, 2000 );
	}, false );
	var button = document.getElementById( 'grid' );
	button.addEventListener( 'click', function ( event ) {
		transform( targets.grid, 2000 );
	}, false );
	transform( targets.table, 2000 );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}
function transform( targets, duration ) {
	TWEEN.removeAll();
	for ( var i = 0; i < objects.length; i ++ ) {
		var object = objects[ i ];
		var target = targets[ i ];
		new TWEEN.Tween( object.position )
			.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();
		new TWEEN.Tween( object.rotation )
			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();
	}
	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}
function animate() {
	requestAnimationFrame( animate );
	TWEEN.update();
	controls.update();
}
function render() {
	renderer.render( scene, camera );
}

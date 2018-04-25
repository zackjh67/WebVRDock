import * as THREE from 'three';
import Copter from './models/Copter'
import tie from './models/tie';
import ThreeJSEnterprise from './models/ThreeJSEnterprise'
import mario from "./textures/mario.jpg";
import UniCycle from './models/UniCycle'
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';
import {ShaderLib as myTie} from "three";
import Wall from "./models/wall";
import Room from "./models/Room";
//import {Math} from 'three';
import {SphereGeometry} from "three";
import {MeshStandardMaterial} from "three";
import {Mesh} from "three";
import {MeshPhongMaterial} from "three";
var selected;
var rotationSpeed = 20;
var swayDistance = 1;
var bladeRotation = rotationSpeed;
var copterSway = swayDistance;
var canvas;
var w = 3;
var h = 4;

var ambientIntensity = 0.1;

var lightOneIntensity = 1;

var spotLightIntensity = 1;
var spotLightAngle = Math.PI/8;
var spotLightDecay = 0;
var spotLightDistance = 500;
var spotLightPenumbra = 0.4;

//select items with mouse vars
///////////
const moveCamForward = new THREE.Matrix4().makeTranslation(0,0,-10);
const moveCamBackward = new THREE.Matrix4().makeTranslation(0,0,10);
const strafeCamLeft = new THREE.Matrix4().makeTranslation(-10,0,0);
const strafeCamRight = new THREE.Matrix4().makeTranslation(10,0,0);
const climbCamDown = new THREE.Matrix4().makeTranslation(0,-10,0);
const climbCamUp = new THREE.Matrix4().makeTranslation(0,10,0);
const rotCamLeft = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(10));
const rotCamRight = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-10));
const turnCamLeft = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(10));
const turnCamRight = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-10));
const pitchCamUp = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(10));
const pitchCamDown = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-10));

export default class App {
  constructor() {
    const c = document.getElementById('mycanvas');
      // window.addEventListener('keydown', this.onKeypress.bind(this), false);
      // window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    //window.addEventListener('toggleAmbient', this.toggleAmbient.bind(this), false);
      // Enable antialias for smoother lines
    this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
    this.renderer.shadowMap.enabled = true;

      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //   this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

     // this.renderer.setPixelRatio( window.devicePixelRatio );
      //container.appendChild(this.renderer.domElement);
      //renderer.setPixelRatio( window.devicePixelRatio );
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 4/3, 1, 500);

    //this.camera.aspect = 4/3;
    this.camera.position.z = 100;

      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      // window.addEventListener( 'mousedown', this.onDocumentMouseDown.bind(this), false );
      // window.addEventListener( 'touchstart', this.onDocumentTouchStart.bind(this), false );

      this.lightOne = new THREE.DirectionalLight (0xFFFFFF, lightOneIntensity);
      this.lightOne.position.set (20, 20, 20);
      //this.lightOne.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 1200, 2500 ) );
      this.lightOne.castShadow = true;
      this.lightOne.shadow.mapSize.width = 512;  // default
      this.lightOne.shadow.mapSize.height = 512; // default
      this.lightOne.shadow.camera.near = 0.5;       // default
      this.lightOne.shadow.camera.far = 500;
      // var targetObject = new THREE.Object3D();
      // this.scene.add(targetObject);
      //
      // this.lightOne.target = targetObject;
      //this.scene.add( this.lightOne.target );
      //this.lightOne.castShadow = true;
      this.scene.add (this.lightOne);

      this.ambient = new THREE.AmbientLight(0xff52ef, 0.1);
      this.scene.add(this.ambient);
      //this.ambient.castShadow = true;
      this.spotLight = new THREE.SpotLight(0xfFFFFF, 1);
      //var spotLightHelper = new THREE.SpotLightHelper( this.spotLight );
      this.spotLight.shadow.mapSize.width = 512;  // default
      this.spotLight.shadow.mapSize.height = 512; // default
      this.spotLight.shadow.camera.near = 0.5;       // default
      this.spotLight.shadow.camera.far = 500;

      this.spotLight.position.set(-40,80,40);
      this.spotLight.angle = spotLightAngle;
      this.spotLight.penumbra = 0.4;
      this.spotLight.decay = 0;
      this.spotLight.distance = 100;
      this.spotLight.castShadow = true;

      //this.spotLight.target.position.set(0,0,0);
      //this.scene.add(this.spotLight.target);

        this.scene.add(this.spotLight);

    var texture = new THREE.TextureLoader().load(mario);
    this.wall = new Room();
      this.wall.traverse( function( child )
      {
          if( child instanceof THREE.Mesh )
          {
              //child.castShadow = true;
              child.receiveShadow = true;
          }
      } );

    this.scene.add(this.wall);
    this.copter = new Copter();
      this.copter.traverse( function( child )
      {
          if( child instanceof THREE.Mesh )
          {
              //child.castShadow = true;
              child.receiveShadow = true;
              child.castShadow = true;
          }
      } );


    // this.copter.castShadow = true;
    this.scene.add(this.copter);
    //this.scene.add(this.copter);
    this.copter.body.matrix.multiply(new THREE.Matrix4().makeTranslation(300,0,0));

     // this.spotLight.target = this.copter;
    //this.myTie = new tie();
    this.myEnterpise = new ThreeJSEnterprise();
    // this.myEnterpise.castShadow = true;
      this.myEnterpise.traverse( function( child )
      {
          if( child instanceof THREE.Mesh)
          {
              //child.castShadow = true;
              child.receiveShadow = true;
              child.castShadow = true;
          }
      } );

    this.scene.add(this.myEnterpise);

      this.camera.matrixAutoUpdate = false;
      //move camera only by default
      selected = this.camera;

    this.setupListeners();
    window.addEventListener('resize', () => this.resizeHandler());
    this.resizeHandler();
    requestAnimationFrame(() => this.render());
  }

  render() {
      this.raycaster.setFromCamera( this.mouse, this.camera );
    this.renderer.render(this.scene, this.camera);
      this.copter.animate(bladeRotation, copterSway);
    requestAnimationFrame(() => this.render());
    //this.spotLight.position.set(this.copter.myPosition);


  }

  resizeHandler() {
    canvas = document.getElementById("mycanvas");
    w = window.innerWidth - 16;
    h = 0.75 * w;  /* maintain 4:3 ratio */
    if (canvas.offsetTop + h > window.innerHeight) {
      h = window.innerHeight - canvas.offsetTop - 16;
      w = 4/3 * h;
    }
    canvas.width = w;
    canvas.height = h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);

   // this.tracker.handleResize();
  }
    onKeypress(event) {
        const key = event.keyCode || event.charCode;

        switch (key) {
            case 65:
                // 'a'
                this.strafeLeft(selected);
                console.log(this.copter);

                break;
            case 87:
                // 'w'
                this.moveForward(selected);

                //this.copter.matrix.multiply(move);
                //this.camera.matrixWorld.multiply(move);
                break;
            case 68:
                // 'd'
this.strafeRight(selected);
                //this.camera.matrixWorld.multiply(this.camRotateYNeg);
                break;
            case 83:
                // 's'
                this.moveBackward(selected);
                break;
            case 38:
                // 'up arrow'
                this.pitchUp(selected);

                break;
            case 40:
                // down arrow - pitch down
                this.pitchDown(selected);
                break;
            case 37:
                // left arrow - rot left
                this.turnLeft(selected);
                break;
            case 39:
                // right arrow- rot right
                this.turnRight(selected);
                break;
            case 81:
                // 'q'- roll left
                this.rollLeft(selected);
                break;
            case 69:
                // 'e'- roll right
                this.rollRight(selected);
                break;
            case 70:
                // 'f' climb down
                this.climbDown(selected);
                break;
            case 82:
                // 'r' climb up
                this.climbUp(selected);
                break;
            case 49:
                // '1' turn left
                selected = this.camera;
                break;
            case 50:
                // '2' turn right
                selected = this.copter;

                break;
            case 51:
                // '3'- stop blades rotation
                bladeRotation = 0;
                break;
            case 52:
                // '4'- start rotation
                bladeRotation = rotationSpeed;
                break;
            case 53:
                // '5' - stop sway
                copterSway = 0;
                break;
            case 54:
                // '6'- start sway
                copterSway = swayDistance;
                break;
            case 55:
                // '7'- increase blade speed
                if(rotationSpeed < 120)
                rotationSpeed++;
                //console.log(rotationSpeed);
                bladeRotation = rotationSpeed;
                break;
            case 56:
                // '8'- decrease blade speed
                if(rotationSpeed > 0)
                rotationSpeed--;
                bladeRotation = rotationSpeed;
                break;
        }
    }

    moveForward(selected){
      if(selected == this.copter){

          //console.log("Thisis happening");
          //move forward
          this.copter.move(-10);

      } else if(selected == this.myEnterpise){
          this.myEnterpise.move(-10);
      } else if(selected == this.sphereMesh){

      } else { //move camera
          this.camera.matrixWorld.multiply(moveCamForward);
      }
    }

    moveBackward(selected){
        if(selected == this.copter){
            this.copter.move(10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.move(10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(moveCamBackward);
            //move backward

            //this.camera.matrixWorld.multiply(this.camBackward);
        }
    }

    strafeLeft(selected){
        if(selected == this.copter){
            this.copter.strafe(10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.strafe(10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(strafeCamLeft);
        }
    }

    strafeRight(selected){
        if(selected == this.copter){
            this.copter.strafe(-10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.strafe(-10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(strafeCamRight);
            //strafe right

        }
    }

    climbUp(selected){
        if(selected == this.copter){

            this.copter.climb(10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.climb(-10);
        } else if(selected == this.sphereMesh){

        } else { //move camera

            //pitch up
            this.camera.matrixWorld.multiply(climbCamUp);
        }
    }

    climbDown(selected){
        if(selected == this.copter){

            this.copter.climb(-10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.climb(10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(climbCamDown);
        }
    }

    rollLeft(selected){
        if(selected == this.copter){

            this.copter.roll(10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.roll(10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(rotCamLeft);
        }
    }


    rollRight(selected){
        if(selected == this.copter){
            this.copter.roll(-10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.roll(-10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(rotCamRight);
        }
    }

    turnLeft(selected){
        if(selected == this.copter){
            this.copter.turn(10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.turn(-10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(turnCamLeft);
        }
    }

    turnRight(selected){
        if(selected == this.copter){

            this.copter.turn(-10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.turn(10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(turnCamRight);
        }
    }

    pitchUp(selected){
        if(selected == this.copter){

            this.copter.pitch(-10);

        } else if(selected == this.myEnterpise){
            this.myEnterpise.pitch(-10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(pitchCamUp);

        }
    }

    pitchDown(selected){
        if(selected == this.copter){
            this.copter.pitch(10);
        } else if(selected == this.myEnterpise){
            this.myEnterpise.pitch(10);
        } else if(selected == this.sphereMesh){

        } else { //move camera
            this.camera.matrixWorld.multiply(pitchCamDown);
        }
    }


    onDocumentTouchStart( event ) {
      // console.log("ondocumenttouch?");
      //
      //   event.preventDefault();
      //
      //   event.clientX = event.touches[0].clientX;
      //   event.clientY = event.touches[0].clientY;
      //   this.onDocumentMouseDown( event );

    }

    onDocumentMouseDown(e) {
      //my laptop was being stupid
      console.log("click");
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var intersects = this.raycaster.intersectObjects(this.scene.children, true);
         for ( var i = 0; i < intersects.length; i++ ) {
             if(intersects[i].object.parent === this.copter || intersects[i].object.parent.parent === this.copter){
                 selected = this.copter;
                 this.spotLight.target = this.copter.body;
                 i = intersects.length
             }else if(intersects[i].object.parent.parent != null && intersects[i].object.parent.parent.parent != null){
                 if(intersects[i].object.parent.parent === this.myEnterpise || intersects[i].object.parent.parent.parent === this.myEnterpise) {
                     selected = this.myEnterpise;
                     this.spotLight.target = this.myEnterpise.enterpriseGroup;
                     i = intersects.length
                 }
             }
              else {
                 selected = this.camera;
                 i = intersects.length
             }

         //     var objectGroup = intersects[i].parent;
         //
         //     for(var j = 0; j < objectGroup.children.length; j++){
         //         objectGroup.children[j].material.color.setHex(0x1A75FF);
         //
             }

        //
        //     console.log(intersects[i]);
        //     //intersects[ i ].object.material.color.set( 0xff0000 );
        //     // selected = intersects[0].object.parent;
        //
         //1}
        // var vectorMouse = new THREE.Vector3( //vector from camera to mouse
        //         //     -(window.innerWidth/2-e.clientX)*2/window.innerWidth,
        //         //     (window.innerHeight/2-e.clientY)*2/window.innerHeight,
        //         //     -1/Math.tan(22.5*Math.PI/180)); //22.5 is half of camera frustum angle 45 degree
        //         // vectorMouse.applyQuaternion(this.camera.quaternion);
        //         // vectorMouse.normalize();
        //         //
        //         // var vectorObject = new THREE.Vector3(); //vector from camera to object
        //         // vectorObject.set(this.copter.x - this.camera.position.x,
        //         //     this.copter.y - this.camera.position.y,
        //         //     this.copter.z - this.camera.position.z);
        //         // vectorObject.normalize();
        //         // if (vectorMouse.angleTo(vectorObject)*180/Math.PI < 1) {
        //         //     //mouse's position is near object's position
        //         //
        //         // }
    }

    onMouseMove( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        // this.mouse.x = ( event.pageX / window.innerWidth ) * 2 - 1;
        // this.mouse.y = - ( event.pageY / window.innerHeight ) * 2 + 1;
        //console.log(mouse.x);
        //console.log(mouse.y);
        this.mouse.x = ( event.offsetX / this.renderer.domElement.width ) * 2 - 1;
        this.mouse.y = -( event.offsetY / this.renderer.domElement.height ) * 2 + 1;

        // var deltaX = event.clientX - mouseX;
        // var deltaY = event.clientY - mouseY;
    }

    adjustBladeSpeed(i){
      bladeRotation = i;
    }

    adjustSway(i){
      copterSway = i;
    }

    adjustAmbientIntensity(i){
      if(i != 0)
      this.ambient.intensity = ambientIntensity = i;
    }

    adjustLightOneIntensity(i){
     // lightOneIntensity = i;
        this.lightOne.intensity = lightOneIntensity = i;
    }

    adjustSpotlightIntensity(i){
        // lightOneIntensity = i;
        this.spotLight.intensity = spotLightIntensity = i;
    }

    adjustSpotlightDecay(i){
        //spotLightIntensity = i;
        this.spotLight.decay = spotLightDecay = i;
    }

    adjustSpotlightAngle(i){
        //spotLightIntensity = i;
        this.spotLight.angle = spotLightAngle = i;
    }

    adjustSpotlightDistance(i){
        //spotLightIntensity = i;
        this.spotLight.distance = spotLightDistance = i;
    }

    adjustSpotlightPenumbra(i){
        //spotLightIntensity = i;
        this.spotLight.penumbra = spotLightPenumbra = i;
    }

    sliderChanged(i){
      switch(i.detail.id){
          case "bladeSpeed":
              this.adjustBladeSpeed(i.detail.val);
              break;
          case "swayDist":
              this.adjustSway(i.detail.val);
              break;
          case "ambientLightIntensity":
              this.adjustAmbientIntensity(i.detail.val);
              break;
          case "lightOneIntensity":
              this.adjustLightOneIntensity(i.detail.val);
              break;
          case "lightOneX":
              this.lightOne.position.x = i.detail.val;
              break;
          case "lightOneY":
              this.lightOne.position.y = i.detail.val;
              break;
          case "lightOneZ":
              this.lightOne.position.z = i.detail.val;
              break;
          case "spotLightX":
              this.spotLight.position.x = i.detail.val;
              break;
          case "spotLightY":
              this.spotLight.position.y = i.detail.val;
              break;
          case "spotLightZ":
              this.spotLight.position.z = i.detail.val;
              break;
          case "spotLightIntensity":
              this.adjustSpotlightIntensity(i.detail.val);
              break;
          case "spotLightPenumbra":
              this.adjustSpotlightPenumbra(i.detail.val);
              break;
          case "spotLightDecay":
              this.adjustSpotlightDecay(i.detail.val);
              break;
          case "spotLightDistance":
              this.adjustSpotlightDistance(i.detail.val);
              break;
          case "spotLightAngle":
              this.adjustSpotlightAngle(i.detail.val);
              break;
      }

    }

    toggle(i){
      switch(i.detail.id){
          case "ambientOff":
              this.ambient.intensity = 0;
              break;
          case "ambientOn":
              this.ambient.intensity = ambientIntensity;
              break;
          case "lightOneOff":
              this.lightOne.intensity = 0;
              break;
          case "lightOneOn":
              this.lightOne.intensity = lightOneIntensity;
              break;
          case "spotlightOff":
              this.spotLight.intensity = 0;
              break;
          case "spotlightOn":
              this.spotLight.intensity = spotLightIntensity;
              break;
      }
    }

    setupListeners(){
        window.addEventListener('keydown', this.onKeypress.bind(this), false);
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        window.addEventListener( 'mousedown', this.onDocumentMouseDown.bind(this), false);
        window.addEventListener('light_toggled', this.toggle.bind(this), false);
        window.addEventListener('values_changed', this.sliderChanged.bind(this), false);

    }


}
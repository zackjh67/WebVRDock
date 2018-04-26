import {CylinderGeometry, Group, Math, Matrix4, Mesh, MeshPhongMaterial, SphereGeometry} from "three";
import * as THREE from "three";
import Wall from "./wall";
import brick from "../textures/Brick.jpg";
import mario from "../textures/mario.jpg";
import dock from "../textures/Dock.jpg";

class Room extends Group {
    constructor() {
        super();
        var brickTex = new THREE.TextureLoader().load(brick);
        // brickTex.wrapS = THREE.RepeatWrapping;
        // brickTex.wrapT = THREE.RepeatWrapping;
        // brickTex.repeat.set(4,4);
        var marioTex = new THREE.TextureLoader().load(mario);
        var dockTex = new THREE.TextureLoader().load(dock);
        const wallE = new Wall(dockTex);
        const wallW = new Wall(dockTex);
        const wallN = new Wall(dockTex);
        const wallS = new Wall(dockTex);
        const floor = new Wall(brickTex);
        let tranlation = new THREE.Matrix4().makeTranslation(0,240,-250);
        wallE.matrix.multiply(tranlation);
        this.add(wallE);
        tranlation = new THREE.Matrix4().makeTranslation(0,240,250);
        wallW.matrix.multiply(tranlation);
        wallW.matrix.multiply(new THREE.Matrix4().makeRotationY(Math.degToRad(180)));
        this.add(wallW);
        tranlation = new THREE.Matrix4().makeTranslation(-250,240,0);
        wallN.matrix.multiply(tranlation);
        wallN.matrix.multiply(new THREE.Matrix4().makeRotationY(Math.degToRad(90)));
        this.add(wallN);
        tranlation = new THREE.Matrix4().makeTranslation(250,240,0);
        wallS.matrix.multiply(tranlation);
        wallS.matrix.multiply(new THREE.Matrix4().makeRotationY(Math.degToRad(-90)));
        this.add(wallS);
        tranlation = new THREE.Matrix4().makeTranslation(0,-10,0);
        floor.matrix.multiply(tranlation);
        floor.matrix.multiply(new THREE.Matrix4().makeRotationX(Math.degToRad(90)));
        floor.matrix.multiply(new THREE.Matrix4().makeRotationY(Math.degToRad(180)));
        this.add(floor);
        const skyMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(500,500,10,10),
            new THREE.MeshPhongMaterial({color: 0x7EC0EE}));
        skyMesh.matrixAutoUpdate = false;
        skyMesh.matrix.multiply(new THREE.Matrix4().makeTranslation(0,490,0));
        skyMesh.matrix.multiply(new THREE.Matrix4().makeRotationX(Math.degToRad(90)));
        this.add(skyMesh);
    }
}

export default Room;
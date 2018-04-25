import {CylinderGeometry, Group, Math, Matrix4, Mesh, MeshPhongMaterial, SphereGeometry} from "three";
import Blades from './blades';
import * as THREE from "three";
import copter2 from '../textures/copter2.jpg';
import tail from '../textures/tail.jpg';

class Copter extends Group {

    constructor() {
        super();
        this.myPosition = 0;
        this.swayLeft = false;
        //Body Color
        const bodyColorMaterial = new MeshPhongMaterial ({color: 0x808080});
        var texture = new THREE.TextureLoader().load(copter2);
        var texture2 = new THREE.TextureLoader().load(tail);
        var material = new THREE.MeshPhongMaterial({map:texture});
        //Create Blades
        this.blades = new Blades(150, 5);
        this.bladesBack = new Blades(25, 2);


        //create body
        const cockpitGeo = new SphereGeometry(50,20,20);
        // modify UVs to accommodate MatCap texture
        var faceVertexUvs = cockpitGeo.faceVertexUvs[ 0 ];
        for (let i = 0; i < faceVertexUvs.length; i ++ ) {

            var uvs = faceVertexUvs[i];
            var face = cockpitGeo.faces[i];

            for (var j = 0; j < 3; j++) {

                uvs[j].x = face.vertexNormals[j].x * 0.5 + 0.5;
                uvs[j].y = face.vertexNormals[j].y * 0.5 + 0.5;
            }
        }

        const tailGeo = new CylinderGeometry(10,10,150,20);
        this.body = new Group();
        const bodyMesh = new Mesh(cockpitGeo,material);
        material = new THREE.MeshPhongMaterial({map:texture2});
        const tailMesh = new Mesh(tailGeo,material);
        tailMesh.matrixAutoUpdate = false;

        let rot = new THREE.Matrix4().makeRotationZ(Math.degToRad(90));
        bodyMesh.matrixAutoUpdate = false;
        let trans = new THREE.Matrix4().makeTranslation(75, 0, 0);
        tailMesh.matrix.multiply(trans);
        trans = new THREE.Matrix4().makeTranslation(150,0,0);
        tailMesh.matrix.multiply(rot);
        rot = new THREE.Matrix4().makeRotationY(Math.degToRad(270));
        bodyMesh.matrix.multiply(rot);

        this.body.add(bodyMesh);
        this.body.add(tailMesh);
        //this.add(this.blades);
        //this.add(this.bladesBack);
        this.add(this.body);
        this.body.add(this.blades);
        this.body.add(this.bladesBack);
        this.blades.matrixAutoUpdate = false;
        this.bladesBack.matrixAutoUpdate = false;
        this.body.matrixAutoUpdate = false;


        let rotX = new THREE.Matrix4().makeRotationX(Math.degToRad(90));
        let rotY = new THREE.Matrix4().makeRotationY(Math.degToRad(90));

        let transUp = new THREE.Matrix4().makeTranslation(0, 0, -50);


        this.blades.matrix.multiply(rotX);
        this.blades.matrix.multiply(transUp);
        this.bladesBack.matrix.multiply(trans);
        trans = new THREE.Matrix4().makeTranslation(0,0,-10);
        this.bladesBack.matrix.multiply(trans);
        this.scale.set(.3,.3,.3);
    }

    animate(rot, trans) {
        let rotation = new THREE.Matrix4().makeRotationZ(Math.degToRad(rot));
        this.blades.matrix.multiply(rotation);
        this.bladesBack.matrix.multiply(rotation);
        if(this.swayLeft){
            this.myPosition = this.myPosition + .1;
            if(this.myPosition > 2.5 ){
                this.swayLeft = false;
                //let rotTurn = new THREE.Matrix4().makeRotationX(Math.degToRad(30));
                //let rotTurnWOrld = new THREE.Matrix4().makeRotationX(Math.degToRad(-30));
                //this.body.matrix.multiply(rotTurn)
                //this.body.matrixWorld.multiply(rotTurnWOrld);
            }
            let translate = new THREE.Matrix4().makeTranslation(0,0,trans);
            //let rotBack = new THREE.Matrix4().makeRotationX(Math.degToRad(-15));
            this.body.matrix.multiply(translate);
        }
        else {
            this.myPosition = this.myPosition - .1;
            if(this.myPosition < 0){
                this.swayLeft = true;
            }
            let translate = new THREE.Matrix4().makeTranslation(0,0,-trans);
            this.body.matrix.multiply(translate);

        }


    }

    move(x){
        const move = new THREE.Matrix4().makeTranslation(x,0,0);
        this.body.matrix.multiply(move);
    }

    strafe(z){
        const strafe = new THREE.Matrix4().makeTranslation(0,0,z);
        this.body.matrix.multiply(strafe);
    }

    climb(y){
        const climb = new THREE.Matrix4().makeTranslation(0,y,0);
        this.body.matrix.multiply(climb);
    }

    turn(angle){
        const turn = new THREE.Matrix4().makeRotationY(Math.degToRad(angle));
        this.body.matrix.multiply(turn);
    }

    roll(angle){
        const roll = new THREE.Matrix4().makeRotationX(Math.degToRad(angle));
        this.body.matrix.multiply(roll);
    }

    pitch(angle){
        const pitch = new THREE.Matrix4().makeRotationZ(Math.degToRad(angle));
        this.body.matrix.multiply(pitch);
    }


}

export default Copter;
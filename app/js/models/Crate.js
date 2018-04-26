import {CylinderGeometry, Group, Math, Matrix4, Mesh, MeshPhongMaterial, SphereGeometry} from "three";
import * as THREE from "three";
import crate from "../textures/crate.jpg";


class Crate extends Group {
    constructor() {
        super();
        const crateTex = new THREE.TextureLoader().load(crate);

        var material = new THREE.MeshLambertMaterial({map:crateTex});
        const box = new THREE.BoxGeometry(10,10,20,1,1,1);
        //this.boxMesh = new Mesh(box,material);
        this.matrix.matrixAutoUpdate = false;
        for(let i = -5; i < 5; i++){
            const boxMesh = new Mesh(box,material);
            boxMesh.matrixAutoUpdate = false;
            boxMesh.matrix.multiply(new THREE.Matrix4().makeTranslation(i * 11,0,0));
            this.add(boxMesh);
        }


        //this.add(this.boxMesh);
    }
}

export default Crate;
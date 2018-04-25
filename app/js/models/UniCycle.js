import {Group, Math, Matrix4} from "three";
import BikeFrame from './frame'
import Wheel from './wheel';
import * as THREE from "three";

class UniCycle extends Group {
    constructor() {
        super();
        this.frame = new BikeFrame();
        this.wheel = new Wheel(6);
        this.add(this.frame);
        this.frame.add(this.wheel);
        let rotX = new THREE.Matrix4().makeRotationX(1.5708);
        let rotY = new THREE.Matrix4().makeRotationY(1.5708);
        let trans = new THREE.Matrix4().makeTranslation(0, 158, 0);
        this.frame.matrixAutoUpdate = false;
        this.frame.matrix.multiply(rotX);
        this.frame.matrix.multiply(trans);

        this.wheel.matrixAutoUpdate = false;
        this.wheel.matrix.multiply(rotY);
    }

    move(distance) {
        const trans = new THREE.Matrix4().makeTranslation(0, 0, distance);
        this.frame.matrix.multiply(trans);
        const wheelRot = distance / 150;
        const rotation = new THREE.Matrix4().makeRotationZ(wheelRot);
        this.wheel.matrix.multiply(rotation);
    }

    turn(angle) {
        const rot = new THREE.Matrix4().makeRotationY(Math.degToRad(angle));
        this.frame.matrix.multiply(rot);
    }
}

export default UniCycle;
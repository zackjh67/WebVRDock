import {CylinderGeometry, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, TorusGeometry} from "three";
import * as THREE from "three";

export default class Blades {
    constructor (Radius, ThickNess) { // number of spokes on the wheel
        const WHEEL_RADIUS = Radius;
        const TIRE_THICKNESS = ThickNess;
        const numSpokes = 3;
        const wheelGroup = new Group();

        for (let k = 0; k < numSpokes; k++) {
            const spGeo = new CylinderGeometry (TIRE_THICKNESS, TIRE_THICKNESS,
                WHEEL_RADIUS, 10, 10);
            const spMat = new THREE.MeshStandardMaterial({color: 0x447c77});
            spMat.metalness = 1;
            const sp = new Mesh (spGeo, spMat);
            sp.rotateZ (k * 2 * Math.PI / numSpokes);
            sp.translateY (WHEEL_RADIUS / 2);
            wheelGroup.add (sp);   // place the cylinder in the group
        }

        return wheelGroup;   // the constructor must return the entire group
    }
}
import {Math, CylinderGeometry, Group, Mesh, MeshPhongMaterial, SphereGeometry, Matrix4} from "three";
//Created By Phil Garza
export default class tie extends Group {
    constructor () { // number of spokes on the wheel
        super()
    // Colors for Tie
        const shipColor = new MeshPhongMaterial ({color: 0xAAB7B8});
        const shipMid = new MeshPhongMaterial ({color: 0x99A3A4});
        const shipHead = new MeshPhongMaterial ({color: 0x717D7E});
        //Tie Gropu
        const tieGroup = new Group();
        //Create wings. Array of cylinders
        for(let i=0;i<10;i++){
            let wingL = new CylinderGeometry(.1,.1,1,4);
            let wingR = new CylinderGeometry(.1,.1,1,4);
            let meshWingL = new Mesh( wingL, shipColor);
            let meshWingR = new Mesh (wingR, shipColor);
            meshWingL.translateX(-.5);
            meshWingL.translateZ(i/10);
            meshWingR.translateX(.5);
            meshWingR.translateZ(i/10);
            tieGroup.add(meshWingL);
            tieGroup.add(meshWingR);
        }
        //Create the middles axle
        let torso = new CylinderGeometry(.1,.1,1,50);
        let meshTorso = new Mesh(torso, shipMid);
        meshTorso.rotateZ(Math.degToRad(90));
        //meshTorso.translateX(.5);
        //meshTorso.translateY(.5);
        meshTorso.translateZ(.5);
        tieGroup.add(meshTorso);
        //Create the CockPit
        let head = new SphereGeometry(.2,25,25);
        let headMesh = new Mesh(head, shipHead);
        //headMesh.translateY();
        headMesh.translateZ(.5);
        tieGroup.add(headMesh);

        //Scale it so i can see it ;)
        tieGroup.scale.set(10,10,10);
        this.add(tieGroup);
        //return tieGroup;   // the constructor must return the entire group
    }

    move(distance){
        var m = new Matrix4();
        var translate = m.makeTranslation(0,0,distance);
        this.tieGroup.matrix.multiply(translate);
        var wheelRot = distance/ 150;
        var rotation = m.makeRotationZ(wheelRot);
        this.matrix.multiply(rotation);
    }
}
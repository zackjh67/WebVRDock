import {
    TorusGeometry,
    CylinderGeometry,
    MeshPhongMaterial,
    Mesh,
    Group,
    SphereGeometry, Math
} from 'three';
import * as THREE from "three";

/*********************************************
 * A model of The Enterprise ship from Star Trek.
 * @author Zachary Hern
 * @version 4/2/2018
 *********************************************/

class ThreeJSEnterprise extends Group{
    constructor () {
        super();
        this.enterpriseGroup = new Group();
        const bodyColorMaterial = new MeshPhongMaterial ({color: 0x808080});

        //main group for entire model
        // const enterpriseGroup = new Group();

        //body group
        const bodyGroup = new Group();
        const bodyCylGeo = new CylinderGeometry(0.5,
            0.06,
            5, 20);
        //add mesh to bodyCyl
        const bodyCyl = new Mesh (bodyCylGeo, bodyColorMaterial);
        //add completed obj to enclosing group
        bodyGroup.add(bodyCyl);
        bodyGroup.rotateX(Math.degToRad(-90));

        //front sphere part of the body
        const bodySphereGeo = new SphereGeometry(0.45, 20, 20);
        const bodySphereColor = new MeshPhongMaterial ({color: 0x0033cc});
        const bodySphere = new Mesh(bodySphereGeo, bodySphereColor);
        bodySphere.translateY(2.5);
        bodyGroup.add(bodySphere);

        //create two engines
        for(var i = 0; i < 2; i++){
            //entire engine grouip
            const engineGroup = new Group();

            //engine shaft
            const engineShaftGeo = new CylinderGeometry(0.3,
                0.01, 3.5, 20);
            const engineShaft = new Mesh(engineShaftGeo, bodyColorMaterial);
            engineShaft.rotateX(Math.degToRad(-90));
            engineGroup.add(engineShaft);

            //sphere at end of the engine
            const engineTipGeo = new SphereGeometry(0.27, 20, 20);
            const engineTipColor = new MeshPhongMaterial ({color: 0xcc0000});
            const engineTip = new Mesh(engineTipGeo, engineTipColor);
            engineTip.rotateX(Math.degToRad(-90));
            engineTip.translateY(3.55/2);
            engineGroup.add(engineTip);

            //back of engine (shape about a 5th as large as orig engine shaft)
            const engineBackGeo = new CylinderGeometry(0.35/5,
                0.1/5, 3.5/5, 20);
            //engine back color
            const engineBackColor = new MeshPhongMaterial ({color: 0x0000ff});
            const engineBack = new Mesh(engineBackGeo, engineBackColor);
            engineBack.rotateX(Math.degToRad(-90));
            engineBack.translateY(-(3.5) * ((4/5) * .5));
            engineGroup.add(engineBack);

            //attachment to body
            const engineAttachGeo = new CylinderGeometry(0.08, 0.15, 2.2, 4);
            const engineAttach = new Mesh(engineAttachGeo, bodyColorMaterial);
            engineGroup.add(engineAttach);

            switch(i){
                case 0:
                    //rotate accordingly
                    engineAttach.rotateZ(Math.degToRad(64));
                    //move to inner engine area
                    engineAttach.translateY(1.2);
                    engineGroup.translateX(2);
                    engineGroup.translateY(-1.0);
                    engineGroup.translateZ(1.8);

                    break;
                case 1:
                    //rotate accordingly
                    engineAttach.rotateZ(Math.degToRad(-64));
                    //move to inner engine area
                    engineAttach.translateY(1.2);
                    engineGroup.translateX(-2);
                    engineGroup.translateY(-1.0);
                    engineGroup.translateZ(1.8);
                    break;
            }
            this.enterpriseGroup.add(engineGroup);
        }

        //connect ship head to body
        const connectorGeo = new CylinderGeometry(0.3, 0.06, 1.8, 4);
        const connector = new Mesh(connectorGeo, bodyColorMaterial);
        connector.rotateX(Math.degToRad(-90));
        connector.translateY(2.0);
        connector.rotateX(Math.degToRad(-45));
        connector.translateZ(-1);
        this.enterpriseGroup.add(connector);

        //build ship head
        const shipHeadGroup = new Group();
        const innerBottomGeo = new CylinderGeometry(1/1.5, 4/1.5, 0.5, 50);
        const innerBottom = new Mesh(innerBottomGeo, bodyColorMaterial);
        shipHeadGroup.add(innerBottom);

        //outer torus of head
        const outerGeo = new TorusGeometry(4/1.5, 0.05, 50, 50);
        const outer = new Mesh(outerGeo, bodyColorMaterial);
        outer.rotateX(Math.degToRad(90));
        outer.translateZ(0.25);
        shipHeadGroup.add(outer);

        //inner top
        const innerTop = new Mesh(innerBottomGeo, bodyColorMaterial);
        innerTop.rotateX(Math.degToRad(180));
        innerTop.translateY(0.5);
        shipHeadGroup.add(innerTop);
        this.enterpriseGroup.add(shipHeadGroup);
        //move head to proper position
        shipHeadGroup.translateY(-1.4);
        shipHeadGroup.translateZ(-1.5);
        this.enterpriseGroup.matrixAutoUpdate = false;
        //add subgroups to enterpriseGroup
        this.enterpriseGroup.add(bodyGroup);
        //make object larger to return just cuz
        this.scale.set(15,15,15);
        //make view presentable
        this.rotateZ(Math.degToRad(180));
        this.rotateY(Math.degToRad(-90));
        this.rotateZ(Math.degToRad(20));


        this.add(this.enterpriseGroup);
       // return enterpriseGroup;   // the constructor must return the entire group
    }
    move(z){
        const move = new THREE.Matrix4().makeTranslation(0,0,z/15);
        this.enterpriseGroup.matrix.multiply(move);
    }

    strafe(x){
        const strafe = new THREE.Matrix4().makeTranslation(x/15,0,0);
        this.enterpriseGroup.matrix.multiply(strafe);
    }

    climb(y){
        const climb = new THREE.Matrix4().makeTranslation(0,y/15,0);
        this.enterpriseGroup.matrix.multiply(climb);
    }

    turn(angle){
        const turn = new THREE.Matrix4().makeRotationY(Math.degToRad(angle));
        this.enterpriseGroup.matrix.multiply(turn);
    }

    roll(angle){
        const roll = new THREE.Matrix4().makeRotationZ(Math.degToRad(angle));
        this.enterpriseGroup.matrix.multiply(roll);
    }

    pitch(angle){
        const pitch = new THREE.Matrix4().makeRotationX(Math.degToRad(angle));
        this.enterpriseGroup.matrix.multiply(pitch);
    }
}
export default ThreeJSEnterprise;
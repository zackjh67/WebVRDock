import {CylinderGeometry, Group, Mesh, MeshPhongMaterial} from "three";


class BikeFrame extends Group {
    constructor(){
        super();
        const FORK_LENGTH = 240;
        const FORK_SEPARATION = 60;
        var forkGeo = new CylinderGeometry(12,12,FORK_LENGTH,10);
        var forkMat = new MeshPhongMaterial({color: 0xFFFF03});
        var leftFork = new Mesh(forkGeo, forkMat);
        var rightFork = leftFork.clone();
        var handleGeo = new CylinderGeometry(20, 20, 3 * FORK_SEPARATION, 10);
        var handleMat = new MeshPhongMaterial({ color: 0x00CC00 });
        var handle = new Mesh(handleGeo, handleMat);
        this.add(leftFork);
        this.add(rightFork);
        this.add(handle);
        leftFork.translateX(-FORK_SEPARATION / 2);
        leftFork.translateY(FORK_LENGTH / 2);
        rightFork.translateX(+FORK_SEPARATION / 2);
        rightFork.translateY(FORK_LENGTH / 2);

        handle.rotateZ(Math.PI / 2);
        handle.translateX(FORK_LENGTH);

    }
}

export default  BikeFrame
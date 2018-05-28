class Levels {

    public objectSpeed:number

    constructor () {
        this.update(1)
    }

    update(level:number):void {
        switch (level) { // Bins can have different types/sizes/sprites..
            case 1:
                this.objectSpeed = 8
                break;

            case 2:
                this.objectSpeed = 12
                break;
            default:
                this.objectSpeed = 0
        }
    }

}
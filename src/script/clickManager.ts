export default class ClickManager {
    flag: boolean = false;
    timer :any = ''
    doubleClickCheck() {
        if (this.flag) {
            return this.flag;
        }
        else {
            this.flag = true;
            if (this.timer) { clearTimeout(this.timer) }
            this.timer = setTimeout(()=>{
                this.flag = false;
            }, 500)
            console.log(this.timer)
            return false;
        }


    }
}
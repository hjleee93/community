<template>
    <div>
        <ul>
            <li class="solid-checkbox">
                <!--                    <input type="checkbox" id="virsion1"/> <label for="virsion1"><i-->
                <!--                    class="uil uil-check"></i></label>-->
            </li>
            <li><span>&ndash; 번호: </span> &nbsp;&nbsp;{{ idx + 1 }}</li>
            <li><span>&ndash; Detailed version : </span> &nbsp;&nbsp;ver {{ version.version }}</li>
            <li><span>&ndash; State : &nbsp;&nbsp; </span> <span class="state01"></span>{{ version.state }}</li>
            <li><span>&ndash; Creation date and time : </span>
                &nbsp;&nbsp;{{ moment(version.created_at).format('yyyy-MM-DD HH:mm:ss') }}
            </li>
            <li @click=" isOpenDelete = !isOpenDelete"><i class="uil uil-angle-down"
                                                          style="font-size:22px; cursor:pointer;"></i></li>
        </ul>
        <ul class='gv-toggle' v-if="isOpenDelete">
            <li></li>
            <li></li>
            <li>
                <p><span>&ndash;</span> Upload file information </p>
                <p><span>&ndash;</span> Delete version </p>
            </li>
            <li>
                <p><span>&ndash;</span> File size : {{ version.size }}MB</p>
                <p> the deleted version cannot be recovered Deletion of the deployed version is not
                    possible</p>
            </li>
            <li>
                <a @click="$modal.show('deleteVer')" class="btn-default">DELETE</a>
            </li>
            <li></li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {dateFormat} from "@/script/moment";
import store from "@/store";
import {eGameStage} from "@/common/enumData";
import moment from "moment";

@Component({
    components: {},
})
export default class VersionRow extends Vue {
    @Prop() version!: any;
    @Prop() idx!: any;

    moment = moment;
    isOpenDelete: boolean = false;

}
</script>

<style scoped>

.studio-version {
    width: 1200px;
    margin: 30px auto;
    background-color: #fff;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
}

.studio-version > dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 30px;
    border-bottom: #e9e9e9 1px solid;
}

.studio-version > div > ul {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0px 30px;
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
    transition: all 0.4s ease-in-out;
}

.studio-version > div > ul.gv-title {
    background-color: #f9f9f9;
}

.studio-version > div > ul.gv-title > li {
    font-weight: 500;
    font-size: 17px;
}

.studio-version > div > ul.gv-toggle {
    text-align: left;
}

.studio-version > div > ul.gv-toggle > li {
    padding-left: 70px;
}

.studio-version > div > ul.gv-toggle > li > p {
    height: 30px;
    line-height: 18px;
}

.studio-version > div > ul > li {
    padding: 25px 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #333;
}

.studio-version > div > ul > li > span {
    display: none;
}

.studio-version > div > ul > li > p {
    margin-bottom: 15px;
}

.studio-version > div > ul > li > p > span {
    display: none;
}

.studio-version > div > ul > li > span.state01 {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: #33E4CE;
    background-color: #33E4CE;
}

.studio-version > div > ul > li > span.state02 {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: #33E4CE;
    background-color: #c5292a;
}

.studio-version > div > ul:hover {
    background-color: #f9f9f9;
}

.studio-version > div > ul > li:nth-child(1) {
    width: 3%;
}

.studio-version > div > ul > li:nth-child(2) {
    width: 5%;
}

.studio-version > div > ul > li:nth-child(3) {
    width: 27%;
}

.studio-version > div > ul > li:nth-child(4) {
    width: 40%;
}

.studio-version > div > ul > li:nth-child(5) {
    width: 20%;
}

.studio-version > div > ul > li:nth-child(6) {
    width: 5%;
}

@media all and (max-width: 479px) {
    .studio-version {
        width: 90%;
        margin: 20px auto;
        padding: 0 15px;
    }

    .studio-version > dl {
        flex-wrap: wrap;
        padding: 20px;
    }

    .studio-version > dl dt {
        width: 100%;
    }

    .studio-version > dl dd {
        width: 100%;
        margin-top: 10px;
    }

    .studio-version > dl dd a {
        width: 100%;
    }

    .studio-version > div > ul.gv-title {
        display: none;
    }

    .studio-version > div > ul {
        display: block;
        position: relative;
        margin-top: 15px;
        padding: 15px 20px 0 20px;
        border: 1px solid #e9e9e9;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.05);
    }

    .studio-version > div > ul.gv-toggle {
        margin-top: 5px;
    }

    .studio-version > div > ul.gv-toggle > li {
        padding-left: 0px;
    }

    .studio-version > div > ul.gv-toggle > li > p {
        height: inherit;
    }

    .studio-version > div > ul > li {
        padding: 5px 0px;
        text-align: left;
        font-size: 13px;
        line-height: 20px;
    }

    .studio-version > div > ul > li {
        width: 100% !important;
    }

    .studio-version > div > ul > li > span {
        display: inline-block;
        font-size: 14px;
    }

    .studio-version > div > ul > li > p {
        margin-bottom: 3px;
    }

    .studio-version > div > ul > li > p > span {
        display: inline-block;
    }

    .studio-version > div > ul > li:nth-child(1) {
        width: 10% !important;
        position: absolute;
        right: 0;
        top: 0;
    }

    .studio-version > div > ul > li:last-child {
        text-align: center;
    }

    .studio-version > div > ul > li .btn-default {
        width: 100%;
        text-align: center;
    }
}

@media all and (min-width: 480px) and (max-width: 767px) {
    .studio-version {
        width: 470px;
        margin: 20px auto;
        padding: 0 15px;
    }

    .studio-version > dl {
        flex-wrap: wrap;
        padding: 20px;
    }

    .studio-version > dl dt {
        width: 100%;
    }

    .studio-version > dl dd {
        width: 100%;
        margin-top: 10px;
    }

    .studio-version > dl dd a {
        width: 100%;
    }

    .studio-version > div > ul.gv-title {
        display: none;
    }

    .studio-version > div > ul {
        display: block;
        position: relative;
        margin-top: 15px;
        padding: 15px 20px 0 20px;
        border: 1px solid #e9e9e9;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.05);
    }

    .studio-version > div > ul.gv-toggle {
        margin-top: 5px;
    }

    .studio-version > div > ul.gv-toggle > li {
        padding-left: 0px;
    }

    .studio-version > div > ul.gv-toggle > li > p {
        height: inherit;
    }

    .studio-version > div > ul > li {
        padding: 10px 0px;
        font-size: 14px;
        text-align: left;
    }

    .studio-version > div > ul > li {
        width: 100% !important;
    }

    .studio-version > div > ul > li > span {
        display: inline-block;
        font-size: 15px;
    }

    .studio-version > div > ul > li > p {
        margin-bottom: 10px;
    }

    .studio-version > div > ul > li > p > span {
        display: inline-block;
    }

    .studio-version > div > ul > li:nth-child(1) {
        width: 7% !important;
        position: absolute;
        right: 0;
        top: 0;
    }

    .studio-version > div > ul > li:last-child {
        text-align: center;
    }

    .studio-version > div > ul > li .btn-default {
        width: 100%;
        text-align: center;
    }
}

@media all and (min-width: 768px) and (max-width: 991px) {
    .studio-version {
        width: 750px;
    }

    .studio-version > div > ul.gv-title > li {
        font-size: 16px;
    }

    .studio-version > div > ul.gv-toggle > li {
        padding-left: 25px;
    }

    .studio-version > div > ul.gv-toggle > li > p {
        height: 25px;
    }

    .studio-version > div > ul > li {
        padding: 20px 0px;
        font-size: 15px;
    }
}

@media all and (min-width: 992px) and (max-width: 1199px) {
    .studio-version {
        width: 970px;
    }

    .studio-version > div > ul.gv-toggle > li {
        padding-left: 50px;
    }
}

@media all and (min-width: 1200px) {

}

</style>
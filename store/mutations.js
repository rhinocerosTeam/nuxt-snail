// import { stat } from "fs";

export default {

    /**
     * 更新mark是否更新的状态
     * **/
    UPDATE_MARKSTATUS(state,data){
        state.markIsUpdate = data
    },
    /**
     * 更新标签
     * **/
    UPDATE_MARK(state,data){
        state.markIsUpdate = true
        state.marksList = data
    },
    /**
     * 更新当前的mark数据
     * **/
    UPDATE_CURRENTMENU(state,data){
        state.currentMark = data
    },
    /**
     * 更新mark目录
     * **/
    UPDATE_MARKMENU(state,data){
        state.marksMenu = data
    },
    /**
     * 更新mark目录
     * **/
    UPDATE_GLOBALMARK(state,data){
        state.globalMark = data
    },


}
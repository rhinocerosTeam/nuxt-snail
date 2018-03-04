export default {
    getMarks: state => {
        return state.marksList
    },
    getMarkMenu: state => {
        return state.marksMenu
    },
    getCurrentMark: state => {
        return state.currentMark
    },
    getGlobalMark: state => {
        return state.globalMark
    },
    getAccount: state => {
        return state.account
    }
}
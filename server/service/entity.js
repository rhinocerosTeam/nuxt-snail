import _ from 'lodash'
import { wraper } from '../utils/wraper'

export default {

    /**
     * 抓取数据
     * @param {*} model
     */
    fetch(model, sortType = 'update_time', conditions = {}) {
        return new Promise((resolve, reject) => {
            model.fetch((err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            }, sortType, conditions)
        })
    },
    /**
     * 抓取数据
     * @param {*} model
     */
    fetchBase(model, sort, conditions = {}) {
        return new Promise((resolve, reject) => {
            model.fetchBase((err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            }, sort, conditions)
        })
    },
    /**
     * 分页获取数据
     */
    fetchPage(model, skip, limit, sortType, conditions) {
        return new Promise((resolve, reject) => {
            model.fetchPage(parseInt(skip), parseInt(limit), (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            }, sortType, conditions)
        })
    },


    /**
     * 分页获取数据 关联查询
     */
    fetchBasePage(model, skip, limit, sort, conditions) {
        return new Promise((resolve, reject) => {
            model.fetchBasePage(parseInt(skip), parseInt(limit), (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            }, sort, conditions)
        })
    },


    /**
     * 分页获取数据 关联查询
     */
    refFetchPage(model, skip, limit, sortType, conditions) {
        return new Promise((resolve, reject) => {
            model.refFetchPage(parseInt(skip), parseInt(limit), (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            }, sortType, conditions)
        })
    },

    /**
     * 分页获取数据 关联查询
     */
    refFetchBasePage(model, skip, limit, sort, conditions) {
        return new Promise((resolve, reject) => {
            model.refFetchBasePage(parseInt(skip), parseInt(limit), (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            }, sort, conditions)
        })
    },


    /**
     * 查找多个
     * @param {*} model
     * @param {*} conditions
     */
    find(model, conditions) {
        return new Promise((resolve, reject) => {
            model.findInfo(conditions, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },

    /**
     * 查找一个
     * @param {*} model
     * @param {*} id
     */
    findById(model, id) {
        return new Promise((resolve, reject) => {
            model.findById(id, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    /**
     * 查找一个 关联查询
     * @param {*} model
     * @param {*} id
     */
    refFindById(model, id) {
        return new Promise((resolve, reject) => {
            model.refFindById(id, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })

    },

    /**
     * 查询多个id数据
     * @param {*} model
     * @param {*} ids
     */
    findByMulId(model, ids) {
        return new Promise((resolve, reject) => {
            model.findByMulId(ids, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },

    /**
     * 数量查询
     * @param {*} model
     * @param {*} conditions
     */
    count(model, conditions) {
        return new Promise((resolve, reject) => {
            model.count(conditions, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },

    /**
     * 创建文档
     * @param {*} model
     * @param {*} doc
     */
    create(model, doc) {
        //封装参数
        doc = wraper(model, doc)
        return new Promise((resolve, reject) => {
            model.createInfo(doc, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },

    /**
     * 更新
     * @param {*} model
     * @param {*} id
     * @param {*} params
     */
    update(model, id, params) {
        params = wraper(model, params)
        return new Promise((resolve, reject) => {
            model.updateInfo(id, params, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    /**
     * 更新
     * @param {*} model
     * @param {*} id
     * @param {*} params
     */
    updateBase(model, conditions = {}, update = {}, options = {}) {
        return new Promise((resolve, reject) => {
            model.update(conditions, update, options, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },


    /**
     * 删除by id
     * @param {*} model
     * @param {*} id
     */
    remove(model, id) {
        return new Promise((resolve, reject) => {
            model.removeInfo(id, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    /**
     * 删除by id
     * @param {*} model
     * @param {*} id
     */
    remove(model, id) {
        return new Promise((resolve, reject) => {
            model.removeInfo(id, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },

    aggregate(model, sort){
        return new Promise((resolve, reject) => {
            model.aggregate(sort, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    }




}
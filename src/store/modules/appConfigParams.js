/*
 * @Author: your name
 * @Date: 2020-07-22 22:01:04
 * @LastEditTime: 2020-07-22 22:03:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\store\modules\appConfigParams.js
 */ 
const states = {
	pageInfo: {}, //页面属性
	appStatesData: [], //白板存储的数据
	isShowModuleConfig: false, //右侧是否显示控件配置
	isUpdateBoardList: false //更新白板列表
}

const mutations = {
	UPDATE_PAGE_INFO(state, param) {
		state.pageInfo = param
	},
	COPY_TO_APP_STATES_DATA(state, param) {
		state.appStatesData = param
	},
	UPDATE_APP_STATES_DATA(state, {
		code,
		param
	}) {
		let appStatesData = JSON.parse(JSON.stringify(state.appStatesData)),
			_index = (appStatesData || []).findIndex((item) => item.code === code),
			arr = Object.keys(param)
		if (arr.length == 0) {
			appStatesData.splice(_index, 1)
		} else {
			appStatesData.splice(_index, 1, param)
		}
		state.appStatesData = appStatesData
	},
	SHOW_MODULE_CONFIG(state, type) {
		if (!type) {
			state.appStatesData.forEach(it => {
				if (it.isActive) {
					it.isActive = false
				}
			})
		}
		state.isShowModuleConfig = type
	},
	IS_UPDATE_BOARD_LIST(state, type) {
		state.isUpdateBoardList = type
	}
}
const actions = {
	updatePageInfo({ //页面属性
		commit
	}, param) {
		commit('UPDATE_PAGE_INFO', param)
	},
	copyToAppStatesData({ //复制白板list到appStatesData
		commit
	}, param) {
		commit('COPY_TO_APP_STATES_DATA', param)
	},
	updateAppStatesData({ //更新appStatesData/删除某一项
		commit
	}, {
		code,
		param
	}) {
		commit('UPDATE_APP_STATES_DATA', {
			code,
			param
		})
	},
	showModuleConfig({ //是否显示右侧控件配置
		commit
	}, type) {
		commit('SHOW_MODULE_CONFIG', type)
	},
	isUpdateBoardList({ //是否更新白板列表
		commit
	}, type) {
		commit('IS_UPDATE_BOARD_LIST', type)
	}
}

export default {
	namespaced: true,
	state: states,
	mutations,
	actions
}
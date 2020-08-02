const states = {
	isCollapse: false,
	breadcrumbList:[]
}

const mutations = {
	UPDATE_COLLAPSE(state, param) {
		state.isCollapse = param
	},
	UPDATE_CRUMB_LIST(state, param) {
		state.breadcrumbList = param
	}
}
const actions = {
	updateCollapse({ //页面属性
		commit
	}, param) {
		commit('UPDATE_COLLAPSE', param)
	},
	updateCrumbList({ //页面属性
		commit
	}, param) {
		commit('UPDATE_CRUMB_LIST', param)
	},
}

export default {
	namespaced: true,
	state: states,
	mutations,
	actions
}
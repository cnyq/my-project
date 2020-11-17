const states = {
	isCollapse: sessionStorage.getItem('isCollapse') ? sessionStorage.getItem('isCollapse') - 0 ? true : false : false,
	breadcrumbList: []
}

const mutations = {
	UPDATE_COLLAPSE(state, param) {
		state.isCollapse = param
		let set = param ? 1 : 0
		sessionStorage.setItem('isCollapse', set)
	},
	UPDATE_CRUMB_LIST(state, param) {
		state.breadcrumbList = param
	}
}
const actions = {
	updateCollapse({ //左侧菜单是否折叠
		commit
	}, param) {
		commit('UPDATE_COLLAPSE', param)
	},
	updateCrumbList({ //面包屑
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
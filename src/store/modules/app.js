const states = {
	isCollapse: false
}

const mutations = {
	UPDATE_COLLAPSE(state, param) {
		state.isCollapse = param
	}
}
const actions = {
	updateCollapse({ //页面属性
		commit
	}, param) {
		commit('UPDATE_COLLAPSE', param)
	},
}

export default {
	namespaced: true,
	state: states,
	mutations,
	actions
}
const getters = {
  //APP可配
  pageInfo: state => state.appConfigParams.pageInfo,
  appStatesData: state => state.appConfigParams.appStatesData,
  isShowModuleConfig: state => state.appConfigParams.isShowModuleConfig,
  isUpdateBoardList: state => state.appConfigParams.isUpdateBoardList
}
export default getters
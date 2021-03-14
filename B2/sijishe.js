// ==UserScript==
// @name              司机社
// @namespace         https://soulsign.inu1255.cn?account=yeoncc
// @version           1.0.0
// @author            yeoncc
// @loginURL          https://sijishe.org/
// @updateURL         https://soulsign.inu1255.cn/script/yeoncc/司机社
// @expire            1000000
// @domain            sijishe.org
// @param            Authorization 密钥
// ==/UserScript==

exports.run = async function (param) {
  if (!param.Authorization) throw '密匙为空，请先设置密匙'

  let { data, status } = await axios.post('https://sijishe.org/wp-json/b2/v1/getUserMission', 'count=10&paged=1', {
    headers: {
      'Authorization': param.Authorization
    }
  })

  if (status == 403 || !data)
    throw '密匙过期, 请重新设置密匙'
  if (data.mission.credit != '0') {
    return '已签到，今日获取积分：' + data.mission.credit + ' ,总积分：' + data.mission.my_credit
  }

  axios.post('https://sijishe.org/wp-json/b2/v1/userMission', '', {
    headers: {
      'Authorization': param.Authorization
    }
  }).then(res => {
    console.log('2.签到:', res)
    if (data && data.mission) {
      return '今日获得：' + data.mission.credit + '\n总积分：' + data.mission.my_credit
    } else throw '签到失败:\n' + data
  })
};

exports.check = async function (param) {
  if (!param.Authorization) throw '密匙为空，请先设置密匙'

  let { data, status } = await axios.post('https://sijishe.org/wp-json/b2/v1/getUserMission', 'count=10&paged=1', {
    headers: {
      'Authorization': param.Authorization
    }
  })
  if (status == 403 || !data)
    return '接口检测未通过'
  if (data.mission.credit != '0')
    return '接口检测通过'
};
// power: 权限
//   root  管理员
//   r     只读
//   r+w   读+写
//   a+d   增+删

module.exports = {
	default : {
		name : "未知用户",
		power : "r",
	},
	thrree : {
		name : "master",
		power : "root",
	},
	guest : {
		name : "游客",
		power : "r",
	},
}
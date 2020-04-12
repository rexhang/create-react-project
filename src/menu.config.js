/*
* @author RexHang(rexhang@vip.qq.com)
* @date 2020年4月12日, 0012 15:07
* @description 菜单配置
*/

export const menuConfig =  [
	{
		key: '1',
		name: '主页',
		path: '/dashboard'
	},
	{
		key: '2',
		name: '案例',
		path: '/dashboard/case'
	},
	{
		key: '3',
		name: '数据中心',
		path: '/dashboard/data-center'
	},
	{
		key: '4',
		name: '结果404',
		path: '/dashboard/404'
	},
	{
		key: '5',
		name: '关于',
		path: '/dashboard/about',
		children: [
			{
				key: '5-1',
				name: '关于作者',
				path: '/dashboard/about/author',
			},
			{
				key: '5-2',
				name: '关于项目',
				path: '/dashboard/about/project',
			}
		]
	}
]
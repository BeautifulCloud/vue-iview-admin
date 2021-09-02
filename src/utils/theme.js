/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-28 22:46:46
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-08-29 00:35:27
 */
import Less from 'less'
export default function changeThemeColor(themeName) {
  switch (themeName) {
    case 'theme_dazzle':
      Less.modifyVars({
        '@my-color': '#43AA8B'
      })
      break
    case 'theme_deep':
      Less.modifyVars({
        '@my-color': '#EE9B00'
      })
      break
  }
}

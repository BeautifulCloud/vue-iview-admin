/***
 * @Autor: 刘轩亨
 * @Date: 2021-08-19 16:52:34
 * @Description:
 *  printWidth: 200, //一行的字符数，如果超过会进行换行，默认为80
 *  tabWidth: 2, //一个tab代表几个空格数，默认为80
 *  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
 *  singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
 *  semi: false, //行位是否使用分号，默认为true
 *  trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
 *  bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
 *  parser: 'babel', //代码的解析引擎，默认为babylon，与babel相同。
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-08-24 17:11:39
 */
module.exports = {
  printWidth: 200, 
  tabWidth: 2, 
  useTabs: false, 
  singleQuote: true, 
  semi: false, 
  trailingComma: 'none',
  bracketSpacing: true, 
  parser: 'babel',
  jsxBracketSameLine: true
};

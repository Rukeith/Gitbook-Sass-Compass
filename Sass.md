#Sass
Sass (Syntactically Awesome Stylesheets)  
Sass is a scripting language that is interpreted into Cascading Style Sheets (CSS). Sass 後來到了 CSS3 延伸出了 SCSS。簡單說其兩者差別是一個有花括號、分號(scss)，一個沒有(Sass)。

Scss 有幾個特色：

1. Variables 變數：  
	使用 $ 作為開頭當參數
	
		$link-color: red;
		$font-size: 15px;
		a {
			color: $link-color;
			font-size: $font-size;
		}
		span {
			font-size: $font-size;
		}
		
		/*-----純CSS-----*/
		a {
			color: red;
			font-size: 15px;
		}
		span {
			font-size: 15px;
		}

2. Nesting 巢狀結構：  
	可以清楚地知道誰是誰的子元素

		ul {
			margin: 0;
			li {
				padding-left: 10px;
				&.top {
					padding-left: 0px;
				}
			}
		}
		
		/*-----純CSS-----*/
		ul {
			margin: 0;
		}
		ul li {
			padding-left: 10px;
		}
		ul li.top {
			padding-left: 0px;
		}

3. Mixins：
	類似 function 可以帶參數，設定預設參數
	
		@mixin roundeBox {
			$radius: 10px;
			border-radius: $radius;
			-moz-border-radius: $radius;
			-webkit-border-radius: $radius;
		}
		div {
			@include roundeBox;
		}
		#box {
			@include roundeBox;
		}
		
		/*-----純CSS-----*/
		div {
			border-radius: 10px;
			-moz-border-radius: 10px;
			-webkit-border-radius: 10px;
		}
		#box {
			border-radius: 10px;
			-moz-border-radius: 10px;
			-webkit-border-radius: 10px;
		}

4. Inheritance 繼承：  

		.red-color {
			color: red;
		}
		a {
			font-weight: bold;
			@extend: .red-color;
		}
		.error {
			@extend .red-color;
		}
	
		/*-----純CSS-----*/
		.red-color, a, .error {
			color: red;
		}
		a {
			font-weight: bold;
		}

其他常見功能： 

1. `@import`：  
	可以將網站的各部分拆開成`_head.scss`、`_body.scss`、`_foot.scss`放置在 base 資料夾下，可利用 `@import` 功能把3個檔案內入到`main.csss`。
	
		@import "base/head";
		@import "base/body";
		@import "base/foot";
		
2. 算數：
	
		a {
			color: #CF0 + #CCC;
			font: (20px / 2);
		}
		
		/*-----純CSS-----*/
		a {
			color: #ffffcc;
			font: 10px;
		}
		
3. 顏色功能：

		lighten(red, 50%);	// 增亮50%
		darken(blue, 50%);  // 變暗50%




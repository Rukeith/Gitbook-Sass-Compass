#Sass & Compass - Basic Syntax
Sass (Syntactically Awesome StyleSheets) - Sass is an extension of CSS that adds power and elegance to the basic language.

Sass 提供兩種的 syntax 格式，`Sass`和`Scss`。其寫法差異在於有無括號和分號。

	// Sass
	h1 
		color: #000
		background: #fff

	// Scss
	h1 {color: #000; background: #fff;}

##Variables
Sass 提供了宣告變數的功能，可以宣告變數，儲存各種會重複使用的屬性值，例如：顏色、字體或長寬度。
Sass 的變數宣告，使用`$`放在開頭，後面接上變數名。變數名包含了多種的特殊字元，例如了底線和破折號。

	// CSS
	body {
	  font: 100% Helvetica, sans-serif;
	  color: #333;
	}

	// Sass
	$font-stack:    Helvetica, sans-serif
	$primary-color: #333

	body
	  font: 100% $font-stack
	  color: $primary-color

	// Scss
	$font-stack:    Helvetica, sans-serif;
	$primary-color: #333;

	body {
	  font: 100% $font-stack;
	  color: $primary-color;
	}

##Nesting
當寫 HTML 時，你會注意到有非常清楚的巢狀分佈，但 CSS 卻沒有種特性。Sass 讓 CSS 選擇器可以如 HTML 一般的成巢狀分佈。但是要注意的是，過度巢狀嵌套會容易導致 CSS 難以維護。

	// CSS
	nav ul {
	  margin: 0;
	  padding: 0;
	  list-style: none;
	}
	
	nav li {
	  display: inline-block;
	}
	
	nav a {
	  display: block;
	  padding: 6px 12px;
	  text-decoration: none;
	}
		
	// Sass
	nav
		ul
			margin: 0
		   padding: 0
		   list-style: none

		li
		   display: inline-block

		a
		   display: block
		   padding: 6px 12px
		   text-decoration: none
		    
	// Scss
	nav {
		ul {
		   margin: 0;
		   padding: 0;
		   list-style: none;
		}

		li { display: inline-block; }

		a {
			display: block;
		   padding: 6px 12px;
		   text-decoration: none;
		}
	}
其中 Sass 提供了一些的功能，在編寫巢狀分佈時可以更方便和快速。`&`表示父選擇器。

	li {
		width: 10px;
		&.current {
			color: red;
		}
	}

	// CSS
	li {widht: 10px;}
	li.current {color: red;}

##Operators
如果可以在 CSS 當中使用運算的話，會有相當大的幫助。而 Sass 有一些相當有用的數學運算子，像是 `+`,`-`,`*`,`/`和`%`。

	// CSS
	.container {
	  width: 100%;
	}

	article[role="main"] {
	  float: left;
	  width: 62.5%;
	}

	aside[role="complimentary"] {
	  float: right;
	  width: 31.25%;
	}
	
	// Sass
	.container
	  width: 100%

	article[role="main"]
	  float: left
	  width: 600px / 960px * 100%

	aside[role="complimentary"]
	  float: right
	  width: 300px / 960px * 100%
	  
	// Scss
	.container { width: 100%; }

	article[role="main"] {
	  float: left;
	  width: 600px / 960px * 100%;
	}

	aside[role="complimentary"] {
	  float: right;
	  width: 300px / 960px * 100%;
	}
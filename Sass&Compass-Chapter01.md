#Sass & Compass - Basic Usage
Sass (Syntactically Awesome StyleSheets) - Sass is an extension of CSS that adds power and elegance to the basic language.

Sass 提供兩種的 syntax 格式，`Sass`和`Scss`。其寫法差異在於有無括號和分號。

	// Sass
	h1 
		color: #000
		background: #fff

	// Scss
	h1 {color: #000; background: #fff;}

##Basic Syntax
###Variables：$
Sass 提供了宣告變數的功能，可以宣告變數，儲存各種會重複使用的屬性值，例如：顏色、字體或長寬度。Sass 的變數宣告，使用`$`放在開頭，後面接上變數名。變數名包含了多種的特殊字元，例如了底線和破折號。值得一提的是，變數名中底線和破折號是可以互換的。例如宣告了變數`$main-width`可以用`$main_width`來呼叫，反之亦然。

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
如果把變數宣告在巢狀的內部，則只有此選擇器的內部可以使用到此變數。可以額外加上`!global`標籤，使其變成全域皆可使用。

	#main {
	  $width: 5em !global;
	  width: $width;
	}
	
	#sidebar {
	  width: $width;
	}
	
	// CSS
	#main {
	  width: 5em;
	}
	
	#sidebar {
	  width: 5em;
	}
###Comments: /* */ and //
* 單行註解`//`：不會被編譯到 CSS  
* 多行註解`/* */`：會被編譯到 CSS  
  
		/* This comment is
		 * several lines long.
		 * since it uses the CSS comment syntax,
		 * it will appear in the CSS output. */
		body { color: black; }
		
		// These comments are only one line long each.
		// They won't appear in the CSS output,
		// since they use the single-line comment syntax.
		a { color: green; }
		
		// CSS
		/* This comment is
		 * several lines long.
		 * since it uses the CSS comment syntax,
		 * it will appear in the CSS output. */
		body {
		  color: black;
		}
		
		a {
		  color: green;
		}
When the first letter of a multiline comment is `!`, the comment will always rendered into css output even in compressed output modes. This is useful for adding Copyright notices to your generated CSS.  

		/*! I am loud; hear me roar */
		#main {			color: #999;			.content {				color: #bfbfbf;			}		}         		// CSS		/* I am loud; hear me roar */
		#main{
			color: #999
		}
		#main.content{
			color: #bfbfbf
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
###Referencing Parent Selectors: &
其中 Sass 提供了一些的功能，在編寫巢狀分佈時可以更方便和快速。`&`表示父選擇器。這意味著，如果你有一個深層嵌套的規則，`&`將可以完全替換。例如：

	a {
	  font-weight: bold;
	  text-decoration: none;
	  &:hover { text-decoration: underline; }
	  body.firefox & { font-weight: normal; }
	}
	
	// CSS
	a {
	  	font-weight: bold;
		text-decoration: none; 
	}
	a:hover {
		text-decoration: underline;
	}
	body.firefox a {
		font-weight: normal;
	}

需要注意的是，`&`必須在最前端。另外也可當作前綴詞使用。

	#main {
	  color: black;
	  &-sidebar { border: 1px solid; }
	}

	// CSS
	#main {
	  	color: black;
	}
	#main-sidebar {
		border: 1px solid;
	}
###Nested Properties
CSS 有一些屬性是具有相同的前綴詞，例如：`font-family`、`font-size`和`font-weight`，這些都具有 font 的前綴詞。以往要加入這些屬性都必須重複寫入相同的前綴詞，在此 Sass 提供了另一種更方便的方式 - 屬性巢狀

	.funky {
	  font: {
	    family: fantasy;
	    size: 30em;
	    weight: bold;
	  }
	}
	
	// CSS
	.funky {
	  font-family: fantasy;
	  font-size: 30em;
	  font-weight: bold;
	}
其中屬性前綴詞也可以設定值

	.funky {
	  font: 20px/24px fantasy {
	    weight: bold;
	  }
	}

	// CSS
	.funky {
	  font: 20px/24px fantasy;
	  font-weight: bold;
	}




##Operations
Sass 支援了七種主要的資料型態

* numbers (e.g. 1.2, 13, 10px)
* strings of text, with and without quotes (e.g. "foo", 'bar', baz)
* colors (e.g. blue, #04a3f9, rgba(255, 0, 0, 0.5))
* booleans (e.g. true, false)
* nulls (e.g. null)
* lists of values, separated by spaces or commas (e.g. 1.5em 1em 0 2em, Helvetica, Arial, sans-serif)
* maps from one value to another (e.g. (key1: value1, key2: value2))  

Sass 所提供的 Opertaors 會因為資料形態的不同而有所差異。其中`==`和`!=`則是通用的Operators。

###Number Operations
Sass 支援了標準的數學運作(addition `+`, subtraction `-`, multiplication `*`, division `/`, and modulo `%`)。Sass 的數學函數包含了單位，這意味著不同的單位無法混合使用(例如`px`和`em`)。  
另外也支援了關係運算子 Relational operators (`<`, `>`, `<=`, `>=`)

####Division /
在 CSS 中`/`被用來分隔數字，但在 Sass 中有三種情況`/`可以被用作➗。

1. 如果值是儲存在變數或是由函數回傳  
2. 如果值是被括號包住的  
3. 如果值被其他的運算子使用  

		p {
		  font: 10px/8px;             // Plain CSS, no division
		  $width: 1000px;
		  width: $width/2;            // Uses a variable, does division
		  width: round(1.5)/2;        // Uses a function, does division
		  height: (500px/2);          // Uses parentheses, does division
		  margin-left: 5px + 8px/2px; // Uses +, does division
		}
		
		// CSS
		p {
		  font: 10px/8px;
		  width: 500px;
		  height: 250px;
		  margin-left: 9px;
		}
如果希望如 CSS 般使用，可以使用`#{}`來插值

		p {
		  $font-size: 12px;
		  $line-height: 30px;
		  font: #{$font-size}/#{$line-height};
		}
		 
		// CSS
		p {
		  font: 12px/30px;
		  // A shorthand font-size: 12px; line-height: 30px;
		}
###Color operators
顏色值的運算會分段處理，這表示會拆分成紅、綠和藍  

		p {
		  color: #010203 + #040506;
		  color: #010203 * 2;
		}

		// CSS
		p {
		  // computes 01 + 04 = 05, 02 + 05 = 07, and 03 + 06 = 09
		  color: #050709;
		  color: #020406;
		}
顏色也可以使用 alpha channel(包含 rgba 或 hsla)做運算，可以使用 opacify 和  transparentize

		$translucent-red: rgba(255, 0, 0, 0.5);
		p {
	  		color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
	  		color: opacify($translucent-red, 0.3);
			background-color: transparentize($translucent-red, 0.25);
		}
		
		// CSS
		p {
		  color: rgba(255, 255, 0, 0.75);
		  color: rgba(255, 0, 0, 0.8);
		  background-color: rgba(255, 0, 0, 0.25);
		}
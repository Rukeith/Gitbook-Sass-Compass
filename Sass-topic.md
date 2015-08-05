#Sass - Topics
##Variables
可以設定變數來儲存會重複使用的 CSS 設定，例如：顏色、字體或任何會常常重複使用的 CSS 值。Sass 使用 `$` 來宣告變數。

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
當寫 HTML 時，你會注意到有非常清楚的可視化巢狀分佈，但 CSS 卻沒有。Sass 將會讓你把 CSS 選擇器排成巢狀的分佈。要注意的是過度嵌套的規則會導致 CSS 難以維護。

		// CSS
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
		
##Partials
你可以把 CSS 檔拆分成多個不同的 Sass 檔案，然後導入到別的 Sass 檔案。每個分割 Sass 檔名前頭都需加上底線，例如：`_head.scss`。底線會讓 Sass 知道這檔案是分割檔。其中是使用了 `@import` 來導入。

##Import
CSS 有可以讓你把 CSS 分割成更小的檔案，可以更好的維護。唯一的缺點是，每當使用`@import`，CSS 就會產生一個 HTTP request。Sass builds on top of the current CSS @import but instead of requiring an HTTP request, Sass will take the file that you want to import and combine it with the file you're importing into so you can serve a single CSS file to the web browser.

		// CSS
		html, body, ul, ol {
		  margin: 0;
		  padding: 0;
		}

		body {
		  font: 100% Helvetica, sans-serif;
		  background-color: #efefef;
		}
		
		// Sass
		// _reset.sass
		html,
		body,
		ul,
		ol
		  margin:  0
		  padding: 0
		  
		// base.sass
		@import reset

		body
		  font: 100% Helvetica, sans-serif
		  background-color: #efefef
		
		
		// Scss
		// _reset.scss
		html,
		body,
		ul,
		ol {
		   margin: 0;
		  padding: 0;
		}
		
		/* base.scss */
		@import 'reset';

		body {
		  font: 100% Helvetica, sans-serif;
		  background-color: #efefef;
		}
		
##Mixins
有時候 CSS 中會有一些重複的部分需要編寫，尤其是 CSS3 中存在許多的前綴詞。Mixin 會讓你設置一個群組讓你可以重複使用。你可以套過這個傳遞參數來製作更為彈性的設定。

	// CSS
	.box {
	  -webkit-border-radius: 10px;
	  -moz-border-radius: 10px;
	  -ms-border-radius: 10px;
	  border-radius: 10px;
	}

	// Sass
	=border-radius($radius)
	  -webkit-border-radius: $radius
	  -moz-border-radius:    $radius
	  -ms-border-radius:     $radius
	  border-radius:         $radius

	.box
	  +border-radius(10px)
	  
	 // Scss
	 @mixin border-radius($radius) {
	  -webkit-border-radius: $radius;
	     -moz-border-radius: $radius;
	      -ms-border-radius: $radius;
	          border-radius: $radius;
	}

	.box { @include border-radius(10px); }

##Extend/Inheritance
這是 Sass 中最為常用的功能。使用`@extend`讓你可以把一系列的 CSS 屬性傳遞給另一個選擇器。

	// CSS
	.message, .success, .error, .warning {
	  border: 1px solid #cccccc;
	  padding: 10px;
	  color: #333;
	}

	.success {
	  border-color: green;
	}

	.error {
	  border-color: red;
	}

	.warning {
	  border-color: yellow;
	}
	
	// Sass
	.message
	  border: 1px solid #ccc
	  padding: 10px
	  color: #333

	.success
	  @extend .message
	  border-color: green

	.error
	  @extend .message
	  border-color: red

	.warning
	  @extend .message
	  border-color: yellow
	  
	// Scss
	.message {
	  border: 1px solid #ccc;
	  padding: 10px;
	  color: #333;
	}

	.success {
	  @extend .message;
	  border-color: green;
	}

	.error {
	  @extend .message;
	  border-color: red;
	}

	.warning {
	  @extend .message;
	  border-color: yellow;
	}
	
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
#Sass & Compass
##Sass
Sass is a meta-language on top of CSS that's used to describe the style of a document cleanly and structurally, with more power than flat CSS allows. Sass both provides a simpler, more elegant syntax for CSS and implements various features that are useful for creating manageable style sheets.  
As Sass started life in the Ruby community (Ruby is itself a programming language), much of the documentation associated with Sass has always been programmer friendly.

>Sass also supports two syntaxes. The original syntax (known asSass, with files ending in a `.sass` extension) is terse and based onindentation. It removes the curly braces we're used to seeing inCSS. You can find more documentation on the indented syntax at`http://sass-lang.com/docs/yardoc/file.INDENTED_SYNTAX.html`.  
>The syntax we will be using throughout this book is the SCSSbased syntax, with Sass files ending in the `.scss` extension. Thissyntax is more verbose than the original indent-based syntax butsimilar to existing CSS.

##Compass
The Compass website is at `http://compass-style.org.` It describes itself as follows:      **Compass is an open-source CSS Authoring Framework.**

事實上，Compass 是第一個以 Sass 為基礎的 framework。他讓 CSS3 的新效果，例如 box-shadow, gradients, columns, and transforms，都只需要但一行敘述，就可以簡單的解決跨瀏覽器的問題。
##Preprocessing
Sass lets you use features that don't exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.
##Variables
　　在 Sass 中，可以使用變數來儲存值。在檔案內重複的使用，而不用重複宣告同一份值。也可以為變數命名更有辨識度的名稱。更方便的是，也只需要在一個地方修改就可以全部都跟著變動。  
　　通常變數的宣告都放在檔案開頭。其宣告語法是`$name`，以`$`為開頭。
	$red: #ff0b13;	$blue: #091fff;	$green: #11c909;
	.i-want-to-be-green {
		color: $green;
	}
	
	$font-stack:    Helvetica, sans-serif;
	$primary-color: #333;
	body {
	  	font: 100% $font-stack;
  		color: $primary-color;
	}
	
###RGBA & HSLA
　　在現代最新版的瀏覽器大多支援了，RGBA 和 HSLA。但是要從其他繪圖軟體中要擷取顏色值並不總能簡單的同時拿到 hex 和 RGBA 值。在 Sass 之前的寫法都是以下：

	.color-me-bad {		color: #11c909;		color: rgba(17, 201, 9, 0.9);	}
但有 Sass 後可以轉換為，Sass 會自動地把值轉換成 RGBA 的值，再加上 alpha 的值 0.9。

	 .color-me-good {		color: $green;		color: rgba($green, 0.9);	}
###Vendor prefixes
　　到了 CSS3，提供了許多新功能（背景灰階、陰影和動畫等）。但是因為不同的瀏覽器的呈現不同，造成常常會有許多的前綴字，會造成許多麻煩。  

	.rounded {		-webkit-border-radius: 4px;		-moz-border-radius: 4px;		-ms-border-radius: 4px;		-o-border-radius: 4px;		border-radius: 4px;	}
　　不過配合著 Sass 的 framework **Compass**，我們可以使用許多的**mixins**。讓我們不用記住那多負責的前綴詞，就可以達到同樣的效果

	.rounded {		@include border-radius(4px);	}
　　
##Nesting
Sass will let you nest your CSS selectors in a way that follows the same visual hierarchy of your HTML. Be aware that overly nested rules will result in over-qualified CSS that could prove hard to maintain and is generally considered bad practice.  
Sass 可以被允許使用巢狀結構。例如如果你想要寫一系列的`nav`元素，包含 hover 和 active 狀態，在 Sass 中你可以這樣編寫

	nav {		a {			color: $red;			&:hover {				color: $green;			}			&:visited {				color: $blue;			}		}	}
此段最後會編譯成-->

	nav a {		color: #ff0b13;	}	nav a:hover {		color: #11c909;	}	nav a:visited {		color: #091fff;	}
###Media queries
　　在於現代的網頁上，幾乎都會加上了響應式設計。CSS 上可能寫作  

	@media only screen and (min-width: 280px) and (max-width: 479px) {		.h1 {			font-size: 1.1em;		}	}	@media only screen and (min-width: 480px) and (max-width: 599px) {		.h1 {			font-size: 1em;		}	}	@media only screen and (min-width: 600px) and (max-width: 767px) {		.h1 {			font-size: 0.9em;		}	}
如果使用 Sass，將可以取代成
-->

	h1 {		@include MQ(XS) {			font-size: 1.1em;		}		@include MQ(S) {			font-size: 1em;		}		@include MQ(M) {			font-size: 0.9em;		}	}

##Partials
##Import
##Mixins
##Inheritance
##Operators
#Sass & Compass - Advanced Usage
##@-Rules and Directives
Sass 支援所有 CSS3 的 @-rules，以及提供額外的 Sass 功能被稱為 **directives**。這些還可以被區分為 **control directives** 和 **mixin directives**。

###`@import`
Sass 擴增了 CSS 的`@import`功能，使其也能導入 Sass 檔案。所有被導入的 Sass 檔案會整合成單一個 CSS 檔案中。其中在分割檔內定義的變數和 mixins 也能在主要檔案中使用。
`@import`一般會直接導入 Sass 檔案，在某些情況下才會被當作 CSS 的`@import`使用：

* If the file’s extension is `.css`.
* If the filename begins with `http://`.
* If the filename is a `url()`.
* If the `@import` has any media queries.

如果導入的名字沒有 .scss 或 .sass，Sass 會自動尋找有此名字的 sass 檔案。其中也可以用單ㄧ行導入多個檔案  
`@import "rounded-corners", "text-shadow";`

例外要注意的是，`@import`無法使用`#{}`，除非是當作 CSS 的`@import`來使用。

	$family: unquote("Droid+Sans");
	@import url("http://fonts.googleapis.com/css?family=#{$family}");
	
	// CSS
	@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
	
####Partials
如果你想要導入 Sass 檔案，但不想要編譯成 CSS，你可以在檔名前加上底線。這會告訴 Sass 不要編譯成 CSS 檔案。然後導入這些檔案時就可以忽略底線

例如，有一個檔案`_color.scss`，所以不會有`_color.css`檔案生成，所以可以寫以下來導入  
`@import "colors";`
	
###`@media`
###`@at-root`
###`@debug`
###`@warn`
###`@error`

##Extend / Inheritance
這是 Sass 中最常用的功能。使用`@extend`讓你可以把一系列的 CSS 屬性傳遞給另一個選擇器。

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

##Control Directives & Expressions

##Mixins
有時候 CSS 中會有一些重複的部分需要編寫，尤其是 CSS3 中存在許多的前綴詞。Mixin 會讓你設置一個群組讓你可以重複使用。你可以套過這個傳遞參數來製作更為彈性的設定。

可以使用`@mixin`來建立 mixin 並設定名稱，然後使用`@include`來導入 mixin 使用。

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

##Partials
你可以把 CSS 檔拆分成多個不同的 Sass 檔案，然後導入到別的 Sass 檔案。每個分割 Sass 檔名前頭都需加上底線，例如：`_head.scss`。底線會讓 Sass 知道這檔案是分割檔。其中是使用了 `@import` 來導入。

##Import
CSS 有可以讓你把 CSS 分割成更小的檔案，可以更好的維護。唯一的缺點是，每當使用`@import`，CSS 就會產生一個 HTTP request。Sass builds on top of the current CSS @import but instead of requiring an HTTP request, Sass will take the file that you want to import and combine it with the file you're importing into so you can serve a single CSS file to the web browser.

	We want to import _reset.scss into base.scss.
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
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

這將會導入`_color.scss`。要注意到的是，同一資料夾底下不能同時有`_color.scss`和`color.scss`的檔案。

####Nested `@import`
雖然大多時候`@import`都會被使用在最上層的檔案，但有時候也會使用成 CSS 和`@media`的方式。Like a base-level `@import`, this includes the contents of the `@import`ed file. However, the imported rules will be nested in the same place as the original `@import`.
	
例如，有一個`example.scss`內容如下：

	.example {
	  color: red;
	}
	
然後

	#main {
	  @import "example";
	}
	
	// CSS
	#main .example {
	  color: red;
	}

Directives that are only allowed at the base level of a document, like `@mixin` or `@charset`, are not allowed in files that are `@import`ed in a nested context.

It’s not possible to nest `@import` within mixins or control directives.

###`@media`
`@media`在 Sass 的行為就跟一般的 CSS 一樣，只有增加了一項功能 -- 可以嵌套在巢狀中。If a `@media` directive appears within a CSS rule, it will be bubbled up to the top level of the stylesheet, putting all the selectors on the way inside the rule. This makes it easy to add media-specific styles without having to repeat selectors or break the flow of the stylesheet. For example:

	.sidebar {
	  width: 300px;
	  @media screen and (orientation: landscape) {
	    width: 500px;
	  }
	}
	
	// CSS
	.sidebar {
	  width: 300px;
	}
	@media screen and (orientation: landscape) {
	  .sidebar {
		width: 500px;
	  }
	}
	
`@media` queries 也可以巢狀嵌套在其他地方. 這些 queries 也可以用 `and` 運算子相接在一起。

	@media screen {
	  .sidebar {
	    @media (orientation: landscape) {
	      width: 500px;
	    }
	  }
	}

	// CSS
	@media screen and (orientation: landscape) {
	  .sidebar {
	    width: 500px;
	  }
	}
	
最後`@media`也可以使用 Sass 的功能，包括變數、函示和運算子等。

	$media: screen;
	$feature: -webkit-min-device-pixel-ratio;
	$value: 1.5;
	
	@media #{$media} and ($feature: $value) {
	  .sidebar {
	    width: 500px;
	  }
	}

	// CSS
	@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
	  .sidebar {
	    width: 500px;
	  }
	}

###`@at-root`
The `@at-root` directive causes one or more rules to be emitted at the root of the document, rather than being nested beneath their parent selectors. It can either be used with a single inline selector：

    .parent {
      ...
      @at-root .child { ... }
    }
    
    // CSS
    .parent { ... }
    .child { ... }

Or it can be used with a block containing multiple selectors：

    .parent {
      ...
      @at-root {
        .child1 { ... }
        .child2 { ... }
      }
      .step-child { ... }
    }

    // CSS
    .parent { ... }
    .child1 { ... }
    .child2 { ... }
    .parent .step-child { ... }

####`@at-root (without: ...)` and `@at-root (with: ...)`
預設裡`@at-root`只排除選擇器。然而也可以使用`@at-root`在巢狀 directives 的外面，例如：`@media`。

    @media print {
      .page {
        width: 8in;
        @at-root (without: media) {
          color: red;
        }
      }
    }
    
    // CSS
    @media print {
      .page {
        width: 8in;
      }
    }
    .page {
      color: red;
    }

You can use `@at-root (without: ...)` to move outside of any directive. You can also do it with multiple directives separated by a space: `@at-root (without: media supports)` moves outside of both `@media` and `@supports` queries.

There are two special values you can pass to `@at-root`. “rule” refers to normal CSS rules; `@at-root (without: rule)` is the same as `@at-root` with no query. `@at-root (without: all)` means that the styles should be moved outside of *all* directives and CSS rules.

If you want to specify which directives or rules to include, rather than listing which ones should be excluded, you can use `with` instead of `without`. For example, `@at-root (with: rule)` will move outside of all directives, but will preserve any CSS rules.

###`@debug`
`@debug`directive 會印出 Sass 表達式的值到標準錯誤輸出流。對於除錯複雜的 Sass 文件很有用。

    @debug 10em + 12em;
    
    // outputs:
    Line 1 DEBUG: 22em

###`@warn`
`@warn`directive 會印出 Sass 表達式的值到標準錯誤輸出流。這對於那些需要提醒無用的使用者是有用的。`@warn`和`@debug`有兩項主要的差別：

1. 可以使用了`--quiet`命令或是`:quite`Sass選項，則可以關掉`@warn`
2. 樣式表將會印出訊息，則可以警告使用樣式表造成的警告

        @mixin adjust-location($x, $y) {
          @if unitless($x) {
            @warn "Assuming #{$x} to be in pixels";
            $x: 1px * $x;
          }
          @if unitless($y) {
            @warn "Assuming #{$y} to be in pixels";
            $y: 1px * $y;
          }
          position: relative; left: $x; top: $y;
        }

###`@error`
`@warn`directive 會印出 Sass 表達式的值作為一個致命錯誤。用於驗證參數的mixins和函示非常有用。

    @mixin adjust-location($x, $y) {
      @if unitless($x) {
        @error "$x may not be unitless, was #{$x}.";
      }
      @if unitless($y) {
        @error "$y may not be unitless, was #{$y}.";
      }
      position: relative; left: $x; top: $y;
    }

##Control Directives & Expressions
Sass 提供了基本的控制 directives 和 expressions，支持樣式在一定的條件或使用變數導入相同的樣式。它主要是用於 mixins，特別是那些像 Compass，需要大量的靈活性。

###`if()`
`if()`可以使用在樣式表中的任何位置。

    if(true, 1px, 2px) => 1px
    if(false, 1px, 2px) => 2px

###`@if`
需要使用在巢狀結構下，並且使用 Sass 表達式。否則會回傳 false 或 null

    p {
      @if 1 + 1 == 2 { border: 1px solid;  }
      @if 5 < 3      { border: 2px dotted; }
      @if null       { border: 3px double; }
    }
    
    // CSS
    p {
      border: 1px solid;
    }

`@if`也可以接續數個`@else if`或一個`@else`

    $type: monster;
    p {
      @if $type == ocean {
        color: blue;
      } @else if $type == matador {
        color: red;
      } @else if $type == monster {
        color: green;
      } @else {
        color: black;
      }
    }

    // CSS
    p {
      color: green;
    }

###`@for`
會重複一系列的樣式。每次重複，計數器變量用於調整輸出。Directive 有兩種格式`@for $var from <start> through <end>`和`@for $var from <start> to <end>`。 
要注意的是，關鍵字`through`和`to`。`$var`可以是任何的變數，像是`$fi`。`<start>`和`<end>`是 Sass 表達式，所以應該回傳整數。當`<start>`大於`<end>`，則計數器將會遞減而非遞增。

`@for`設定`$var`為特定範圍內的數值，且每次輸出巢狀樣式都使用`$var`的值。`from ... through`格式的範圍包含了`<start>`和`<end>`的值。但是`from ... to`則不會包含`<end>`的值。

    @for $i from 1 through 3 {
      .item-#{$i} { width: 2em * $i; }
    }

    // CSS
    .item-1 {
      width: 2em;
    }
    .item-2 {
      width: 4em;
    }
    .item-3 {
      width: 6em;
    }


###`@each`
`@each`directive 通常使用`@each $var in <list or map>`格式。`$var`可是任何變數名，像是`$length`或是`$name`。並且`<list or map>`是 Sass 表達式，會回傳 list 或 map。  
`@each`設定`$var`為 list 或 map 中的每個項目，且輸出了`$var`的值為樣式。

    @each $animal in puma, sea-slug, egret, salamander {
      .#{$animal}-icon {
        background-image: url('/images/#{$animal}.png');
      }
    }
    
    // CSS
    .puma-icon {
      background-image: url('/images/puma.png');
    }
    .sea-slug-icon {
      background-image: url('/images/sea-slug.png');
    }
    .egret-icon {
      background-image: url('/images/egret.png');
    }
    .salamander-icon {
      background-image: url('/images/salamander.png');
    }

####Multiple Assignment
`@each`也可以使用多項變數，例如：`@each $var1, $var2,... in <list>`。如果`<list>`是 lists 中的 list，則每個 sub-list 會被指定為個別的變數。

    @each $animal, $color, $cursor in (puma, black, default),
                                      (sea-slug, blue, pointer),
                                      (egret, white, move) {
      .#{$animal}-icon {
        background-image: url('/images/#{$animal}.png');
        border: 2px solid $color;
        cursor: $cursor;
      }
    }

    // CSS
    .puma-icon {
      background-image: url('/images/puma.png');
      border: 2px solid black;
      cursor: default;  
    }
    .sea-slug-icon {
      background-image: url('/images/sea-slug.png');
      border: 2px solid blue;
      cursor: pointer;
    }
    .egret-icon {
      background-image: url('/images/egret.png');
      border: 2px solid white;
      cursor: move;
    }

maps 可以被視為對應清單，也可以用於多比參數。

    @each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
      #{$header} {
        font-size: $size;
      }
    }
    
    // CSS
    h1 {
      font-size: 2em;
    }
    h2 {
      font-size: 1.5em;
    }
    h3 {
      font-size: 1.2em;
    }

###`@while`
`@while`directive 會一直重複輸出巢狀樣式，直到判斷值變為 false。這可以比`@for`使用更複雜的迴圈，雖然大多很少是必須使用。

    $i: 6;
    @while $i > 0 {
      .item-#{$i} { 
        width: 2em * $i;
      }
      $i: $i - 2;
    }

    // CSS
    .item-6 {
      width: 12em;
    }
    
    .item-4 {
      width: 8em;
    }
    
    .item-2 {
      width: 4em;
    }

##Extend / Inheritance
`@extend`是 Sass 中最常被使用到的功能，它可以讓某選擇器繼承另一個選擇器所擁有的 CSS 設定。

	// Scss
	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	.seriousError {
	  @extend .error;
	  border-width: 3px;
	}
	
	// CSS
	.error, .seriousError {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	
	.seriousError {
	  border-width: 3px;
	}
	
另一項功能是，當其他屬性設定到`.error`的`.seriousError`也將會有一樣的設定

	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	
	// 此處也會發生在 .seriousError
	.error.intrusion {
	  background-image: url("/image/hacked.png");
	}
	
	.seriousError {
	  @extend .error;
	  border-width: 3px;
	}
	
	// CSS
	.error, .seriousError {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	
	.error.intrusion, .seriousError.intrusion {
	  background-image: url("/image/hacked.png");
	}
	
	.seriousError {
	  border-width: 3px;
	}

當合併選擇器時，`@extend`會自動地避免產生一些無意義的重複和無法辨識的選擇器

	// 無意義的重複
	.seriousError.seriousError
	
	// 無法辨識的選擇器
	#main#footer
	
###Extending Complex Selectors
不只 Class 選擇器可以被擴增，單一元素的任何選擇器都可以被擴增，例如 `.special.cool`, `a:hover`或`a.user[href^="http://"]`

	.hoverlink {
	  @extend a:hover;
	}
	a:hover {
	  text-decoration: underline;
	}
	
	// CSS
	a:hover, .hoverlink {
	  text-decoration: underline;
	}

就像之前所講的`.error.intrusion`，任何`a:hover`所使用的設定也都會對`.hoverlink`有效，即使有其他的選擇器也一樣。

	.hoverlink {
	  @extend a:hover;
	}
	.comment a.user:hover {
	  font-weight: bold;
	}

	// CSS
	.comment a.user:hover,
	.comment .user.hoverlink {
	  font-weight: bold;
	}

###Multiple Extends
單一選擇器可以擴增多個選擇器，這意味著可以繼承多個選擇器的樣式。

	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	.attention {
	  font-size: 3em;
	  background-color: #ff0;
	}
	.seriousError {
	  @extend .error;
	  @extend .attention;
	  border-width: 3px;
	}
	
	// CSS
	.error, .seriousError {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	
	.attention, .seriousError {
	  font-size: 3em;
	  background-color: #ff0;
	}
	
	.seriousError {
	  border-width: 3px;
	}

多比 extend 可以用單行編寫，`@extend .error, .attendtions`效果同上。

###Chaining Extends
	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	.seriousError {
	  @extend .error;
	  border-width: 3px;
	}
	.criticalError {
	  @extend .seriousError;
	  position: fixed;
	  top: 10%;
	  bottom: 10%;
	  left: 10%;
	  right: 10%;
	}

任何 `.seriousError` 也都會有 `.error`，且任何有`.criticalError`也都會有`.seriousError`和`.error`

	.error,
	.seriousError,
	.criticalError {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	
	.seriousError,
	.criticalError {
	  border-width: 3px;
	}
	
	.criticalError {
	  position: fixed;
	  top: 10%;
	  bottom: 10%;
	  left: 10%;
	  right: 10%;
	}
	
###Selector Sequences
選擇器序列，例如`.foo .bar`或`.foo + .bar`無法使用擴增。但是可以使用於巢狀選擇器

	#fake-links .link {
	  @extend a;
	}
	
	a {
	  color: blue;
	  &:hover {
	    text-decoration: underline;
	  }
	}
	
	// CSS
	a,
	#fake-links .link {
	  color: blue;
	}
	a:hover,
	#fake-links .link:hover {
	  text-decoration: underline;
	}

####Merging Selector Sequences
有時候選擇器序列擴增其他選擇器到其他的選擇器序列，則兩個序列將會合併。
但是以下範例將可能會有許多種匹配方式，這會造成樣式表過大。Sass 只會產生最可能使用的方式。將會兩個互調前後位置。

	#admin .tabbar a {
	  font-weight: bold;
	}
	#demo .overview .fakelink {
	  @extend a;
	}
	
	// CSS
	#admin .tabbar a,
	#admin .tabbar #demo .overview .fakelink,
	#demo .overview #admin .tabbar .fakelink {
	  font-weight: bold;
	}

某些時候兩個序列會有使用共同的選擇器，則此選擇器將被保留，指互換其他部分

	#admin .tabbar a {
	  font-weight: bold;
	}
	#admin .overview .fakelink {
	  @extend a;
	}

	// CSS
	#admin .tabbar a,
	#admin .tabbar .overview .fakelink,
	#admin .overview .tabbar .fakelink {
	  font-weight: bold;
	}

###`@extend`-only Selectors
有時候我們寫的樣式，只會使用於`@extend`，並不會直接使用在 HTML 上。最常見於要編寫 Sass library 的時候。Sass 提供了**placeholder selectors**。使用方式如同`#`或`.`，只是此處符號使用了`%`。

	// This ruleset won't be rendered on its own.
	#context a%extreme {
	  color: blue;
	  font-weight: bold;
	  font-size: 2em;
	}

	.notice {
	  @extend %extreme;
	}
	
	// CSS
	#context a.notice {
	  color: blue;
	  font-weight: bold;
	  font-size: 2em;
	}


###`!optional`標籤
一般在擴增選擇器時，可能會遇到一些錯誤造成`@extend`不能作用。例如編寫了

	a.import {
		@extend .notice
	}

但是可能因為沒有選擇器包含了`.notice`，或是包含的是`h1.notice`。為了避免產生矛錯誤的選擇器組合，可以使用`!optional`標籤避免這問題。

###`@extend` in Directives
Sass 中`@extend`在 Directives 裡面有些使用上的限制，例如：`@media`。`@extend`只能擴展`@media`內的選擇器

	@media print {
	  .error {
	    border: 1px #f00;
	    background-color: #fdd;
	  }
	  .seriousError {
	    @extend .error;
	    border-width: 3px;
	  }
	}

	// Wrong
	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}

	@media print {
	  .seriousError {
	    // INVALID EXTEND: .error is used outside of the "@media print" directive
	    @extend .error;
	    border-width: 3px;
	  }
	}

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
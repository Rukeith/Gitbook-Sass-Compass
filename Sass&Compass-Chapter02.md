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
如果你想要導入 Sass 檔案，都編譯到主要的 CSS 檔，但不想要在個別編譯成 CSS。你可以在檔名前加上**底線**，這會告訴 Sass 不要編譯成 CSS 檔案。在導入這些檔案時可以忽略底線。

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
在巢狀結構中，有時候雖然結構上是包含在父選擇器內，但是 CSS 的樣式寫法上卻不希望鎖定在父選擇器內。這時 Sass 可以使用`@at-root`幫你解決這個問題。
The `@at-root` directive causes one or more rules to be emitted at the root of the document, rather than being nested beneath their parent selectors.

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

##Mixin
Mixin 允許使用者可以定義樣式使其被重新用於整個樣式表，而無需使用非語義 classes 像是 `.float-left`。甚至可以帶參數，使用極少的 mixin 生產各種樣式。尤其在於不同瀏覽器需要多種的樣式前綴詞。使用上與`@extend`同樣，只是更加支援了可以傳入參數

###`@mixin`
使用`@mixin`來定義 mixin，並宣告名稱。其中也可以包含各種選擇器和屬性。

	@mixin clearfix {
	  display: inline-block;
	  &:after {
	    content: ".";
	    display: block;
	    height: 0;
	    clear: both;
	    visibility: hidden;
	  }
	  * html & { height: 1px }
	}
	
此外 mixin 的名稱同樣連字號和底線可以互相替代，例如定義一個 mixin 名稱為`add-column`，則可以使用`add_column`呼叫，反之亦然。

###`@include`
Mixins 使用`@include`來導入到檔案中，可以攜帶參數到 mixins 中。

	// Sass
	=border-radius($radius)
	  -webkit-border-radius: $radius
	  -moz-border-radius:    $radius
	  -ms-border-radius:     $radius
	  border-radius:         $radius

	.box
	  +border-radius(10px)
	  padding: 4px;
  	  margin-top: 10px;

	 // Scss
	 @mixin border-radius($radius) {
	  -webkit-border-radius: $radius;
	     -moz-border-radius: $radius;
	      -ms-border-radius: $radius;
	          border-radius: $radius;
	}

	.box {
		@include border-radius(10px);
		padding: 4px;
	  	margin-top: 10px;
	}
	
	// CSS
	.box {
	  -webkit-border-radius: 10px;
	  -moz-border-radius: 10px;
	  -ms-border-radius: 10px;
	  border-radius: 10px;
	  padding: 4px;
	  margin-top: 10px;
	}
	
Mixins 有時候也會導入在外面（文件的頂部），並且不直接定義任何屬性或父選擇器。

	@mixin silly-links {
	  a {
	    color: blue;
	    background-color: red;
	  }
	}
	
	@include silly-links;
	
	// CSS
	a {
  		color: blue;
  		background-color: red;
  	}
  	
Mixin 也可以導入到其他的 Mixins 中。

	@mixin compound {
	  @include highlighted-background;
	  @include header-text;
	}
	
	@mixin highlighted-background { background-color: #fc0; }
	@mixin header-text { font-size: 20px; }

###Arguments
Mixin 可以使用 Sass 的值當作參數

	@mixin sexy-border($color, $width) {
	  border: {
	    color: $color;
	    width: $width;
	    style: dashed;
	  }
	}
	
	p {
		@include sexy-border(blue, 1in);
	}
	
	// CSS
	p {
	  border-color: blue;
	  border-width: 1in;
	  border-style: dashed;
	}

Mixins 也可以對參數設定預設值。當導入 mixin 時，若沒有傳送參數，則會用預設值代替。

	@mixin sexy-border($color, $width: 1in) {
	  border: {
	    color: $color;
	    width: $width;
	    style: dashed;
	  }
	}
	p { @include sexy-border(blue); }
	h1 { @include sexy-border(blue, 2in); }
	
	// CSS
	p {
	  border-color: blue;
	  border-width: 1in;
	  border-style: dashed;
	}
	
	h1 {
	  border-color: blue;
	  border-width: 2in;
	  border-style: dashed;
	}

####Keyword Arguments
在傳遞參數時，可以明確的指定是要傳送哪個變數

	p { @include sexy-border($color: blue); }
	h1 { @include sexy-border($color: blue, $width: 2in); }

雖然這種用法較簡明，它可以使樣式表更容易閱讀。它也使得函式呈現更加彈性，提供了許多參數。參數可以以任何順序進行傳遞，並可以省略有預設值的參數。而且參數名，同樣的連字號和底線可以互換。

####Variable Arguments
有的時候 mixin 或函式會不確定參數的數量，例如當要建立 box 的陰影時，並不確定陰影參數的數量。Sass 提供了**variable arguments**，在 mixin 或函式的最後宣告所以的變數，並且包裹成列表。看起來就像是一般的參數，可是後面接著`...`。

	@mixin box-shadow($shadows...) {
	  -moz-box-shadow: $shadows;
	  -webkit-box-shadow: $shadows;
	  box-shadow: $shadows;
	}
	
	.shadows {
	  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
	}

	// CSS
	.shadows {
	  -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
	  -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
	  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
	}

Variable arguments also contain any keyword arguments passed to the mixin or function. These can be accessed using the `keywords($args) function`, which returns them as a map from strings (without `$`) to values.

可變參數也可以在呼叫 mixin 時使用。同樣的語法下，也可以把列表中每個值當作個別的參數，或是映射各個值當作關鍵字參數。

	@mixin colors($text, $background, $border) {
	  color: $text;
	  background-color: $background;
	  border-color: $border;
	}
	
	$values: #ff0000, #00ff00, #0000ff;
	.primary {
	  @include colors($values...);
	}
	
	$value-map: (text: #00ff00, background: #0000ff, border: #ff0000);
	.secondary {
	  @include colors($value-map...);
	}
	
	// CSS
	.primary {
	  color: #ff0000;
	  background-color: #00ff00;
	  border-color: #0000ff;
	}
	
	.secondary {
	  color: #00ff00;
	  background-color: #0000ff;
	  border-color: #ff0000;
	}
	
可以使用 variable arguments 來包裹 mixin 並添加額外的樣式，而不需要改變 mixin 的參數命名。

	@mixin wrapped-stylish-mixin($args...) {
	  font-weight: bold;
	  @include stylish-mixin($args...);
	}
	
	.stylish {
	  // The $width argument will get passed on to "stylish-mixin" as a keyword
	  @include wrapped-stylish-mixin(#00ff00, $width: 100px);
	}

###Passing Content Block to a Mixin
某些情況下，也有可能傳遞一區塊的樣式給 mixin，其樣式會出現在 mixin 中的任何的`@content`位置。這使得可以定義與選擇器和指令的結構的抽象。

	// Scss
	@mixin apply-to-ie6-only {
	  * html {
	    @content;
	  }
	}
	@include apply-to-ie6-only {
	  #logo {
	    background-image: url(/logo.gif);
	  }
	}
	
	// Sass
	=apply-to-ie6-only
	  * html
	    @content
	
	+apply-to-ie6-only
	  #logo
	    background-image: url(/logo.gif)
	
	// CSS
	* html #logo {
	  background-image: url(/logo.gif);
	}

ex2. 

	@mixin media($queryString){
	    @media #{$queryString} {
	      @content;
	    }
	}
	
	.container {
	    width: 900px;
	    @include media("(max-width: 767px)"){
	        width: 100%;
	    }
	}
	
	// CSS
	.container {
	  width: 900px;
	}
	@media (max-width: 767px) {
	  .container {
	    width: 100%;
	  }
	}



>Note：當`@content`調用不只一次或是迴圈，則樣式區塊將會在每次條用時複製

####Variable Scope and Content Blocks
The block of content passed to a mixin are evaluated in the scope where the block is defined, not in the scope of the mixin. This means that variables local to the mixin cannot be used within the passed style block and variables will resolve to the global value:

	$color: white;
	@mixin colors($color: blue) {
	  background-color: $color;
	  @content;
	  border-color: $color;
	}
	.colors {
	  @include colors { color: $color; }
	}

	// CSS
	.colors {
	  background-color: blue;
	  color: white;
	  border-color: blue;
	}

Additionally, this makes it clear that the variables and mixins that are used within the passed block are related to the other styles around where the block is defined. For example:

	#sidebar {
	  $sidebar-width: 300px;
	  width: $sidebar-width;
	  @include smartphone {
	    width: $sidebar-width / 3;
	  }
	}

##Function Directives
在 Sass 中也可以定義自己的函式，並且使用其中的任何值和內容。

	$grid-width: 40px;
	$gutter-width: 10px;
	
	@function grid-width($n) {
	  @return $n * $grid-width + ($n - 1) * $gutter-width;
	}
	
	#sidebar { width: grid-width(5); }
	
	// CSS
	#sidebar {
	  width: 240px;
	}

如你所見的，函式可以如 mixin 一般接收任何全域變數當作參數。要注意的是，一定要使用`@return`來設定函式的回傳值。與 mixins 一樣，也可以配合使用 keyword arguments 和 variable arguments。並且連字號和底線也支援互換。上面的範例可以修改成以下來呼叫函式：

`#sidebar { width: grid-width($n: 5); }`

在此建議可以在你的函式加上前綴詞，以避免命名衝突，閱讀上不會誤解為部分的 Sass 或 CSS。

##範例：
	$settings: (
	    maxWidth: 800px,
	    columns: 12,
	    margin: 15px,
	    breakpoints: (
	        xs: "(max-width : 480px)",
	        sm: "(max-width : 768px) and (min-width: 481px)",
	        md: "(max-width : 1024px)  and (min-width: 769px)",
	        lg: "(min-width : 1025px)"
	    )   
	);
	
	@mixin renderGridStyles($settings){
	  .container {
	    padding-right: map-get($settings, "margin");
	    padding-left: map-get($settings, "margin");
	    margin-right: auto;
	    margin-left: auto;
	    max-width: map-get($settings,"maxWidth");
	  }
	  
	  .row {
	    margin-right: map-get($settings, "margin") * -1;
	    margin-left: map-get($settings, "margin") * -1;
	  }
	  $breakpoints: map-get($settings, "breakpoints");
	  @each $key, $breakpoint in $breakpoints {
	    @include media($breakpoint) {
	      @include renderGrid($key, $settings);
	    }
	  }
	}
	
	@mixin renderGrid($key, $settings) {
	  $i: 1;
	  @while $i <= map-get($settings, "columns") {
	    .col-#{$key}-#{$i} {
	      float: left;
	      width: 100% * $i / map-get($settings,"columns");
	    }
	    $i: $i+1;
	  }
	}
	
	@mixin media($queryString){
	    @media #{$queryString} {
	      @content;
	    }
	}
	
	@include renderGridStyles($settings);
	
	p {
	  padding: 20px;
	  color: white;
	  background: #9b59b6;
	  margin: 20px;
	}
	
CSS：

	.container {
	  padding-right: 15px;
	  padding-left: 15px;
	  margin-right: auto;
	  margin-left: auto;
	  max-width: 800px;
	}
	
	.row {
	  margin-right: -15px;
	  margin-left: -15px;
	}
	
	@media (max-width: 480px) {
	  .col-xs-1 {
	    float: left;
	    width: 8.33333%;
	  }
	
	  .col-xs-2 {
	    float: left;
	    width: 16.66667%;
	  }
	
	  .col-xs-3 {
	    float: left;
	    width: 25%;
	  }
	
	  .col-xs-4 {
	    float: left;
	    width: 33.33333%;
	  }
	
	  .col-xs-5 {
	    float: left;
	    width: 41.66667%;
	  }
	
	  .col-xs-6 {
	    float: left;
	    width: 50%;
	  }
	
	  .col-xs-7 {
	    float: left;
	    width: 58.33333%;
	  }
	
	  .col-xs-8 {
	    float: left;
	    width: 66.66667%;
	  }
	
	  .col-xs-9 {
	    float: left;
	    width: 75%;
	  }
	
	  .col-xs-10 {
	    float: left;
	    width: 83.33333%;
	  }
	
	  .col-xs-11 {
	    float: left;
	    width: 91.66667%;
	  }
	
	  .col-xs-12 {
	    float: left;
	    width: 100%;
	  }
	}
	@media (max-width: 768px) and (min-width: 481px) {
	  .col-sm-1 {
	    float: left;
	    width: 8.33333%;
	  }
	
	  .col-sm-2 {
	    float: left;
	    width: 16.66667%;
	  }
	
	  .col-sm-3 {
	    float: left;
	    width: 25%;
	  }
	
	  .col-sm-4 {
	    float: left;
	    width: 33.33333%;
	  }
	
	  .col-sm-5 {
	    float: left;
	    width: 41.66667%;
	  }
	
	  .col-sm-6 {
	    float: left;
	    width: 50%;
	  }
	
	  .col-sm-7 {
	    float: left;
	    width: 58.33333%;
	  }
	
	  .col-sm-8 {
	    float: left;
	    width: 66.66667%;
	  }
	
	  .col-sm-9 {
	    float: left;
	    width: 75%;
	  }
	
	  .col-sm-10 {
	    float: left;
	    width: 83.33333%;
	  }
	
	  .col-sm-11 {
	    float: left;
	    width: 91.66667%;
	  }
	
	  .col-sm-12 {
	    float: left;
	    width: 100%;
	  }
	}
	@media (max-width: 1024px) and (min-width: 769px) {
	  .col-md-1 {
	    float: left;
	    width: 8.33333%;
	  }
	
	  .col-md-2 {
	    float: left;
	    width: 16.66667%;
	  }
	
	  .col-md-3 {
	    float: left;
	    width: 25%;
	  }
	
	  .col-md-4 {
	    float: left;
	    width: 33.33333%;
	  }
	
	  .col-md-5 {
	    float: left;
	    width: 41.66667%;
	  }
	
	  .col-md-6 {
	    float: left;
	    width: 50%;
	  }
	
	  .col-md-7 {
	    float: left;
	    width: 58.33333%;
	  }
	
	  .col-md-8 {
	    float: left;
	    width: 66.66667%;
	  }
	
	  .col-md-9 {
	    float: left;
	    width: 75%;
	  }
	
	  .col-md-10 {
	    float: left;
	    width: 83.33333%;
	  }
	
	  .col-md-11 {
	    float: left;
	    width: 91.66667%;
	  }
	
	  .col-md-12 {
	    float: left;
	    width: 100%;
	  }
	}
	@media (min-width: 1025px) {
	  .col-lg-1 {
	    float: left;
	    width: 8.33333%;
	  }
	
	  .col-lg-2 {
	    float: left;
	    width: 16.66667%;
	  }
	
	  .col-lg-3 {
	    float: left;
	    width: 25%;
	  }
	
	  .col-lg-4 {
	    float: left;
	    width: 33.33333%;
	  }
	
	  .col-lg-5 {
	    float: left;
	    width: 41.66667%;
	  }
	
	  .col-lg-6 {
	    float: left;
	    width: 50%;
	  }
	
	  .col-lg-7 {
	    float: left;
	    width: 58.33333%;
	  }
	
	  .col-lg-8 {
	    float: left;
	    width: 66.66667%;
	  }
	
	  .col-lg-9 {
	    float: left;
	    width: 75%;
	  }
	
	  .col-lg-10 {
	    float: left;
	    width: 83.33333%;
	  }
	
	  .col-lg-11 {
	    float: left;
	    width: 91.66667%;
	  }
	
	  .col-lg-12 {
	    float: left;
	    width: 100%;
	  }
	}
	p {
	  padding: 20px;
	  color: white;
	  background: #9b59b6;
	  margin: 20px;
	}

##Output Style
雖然 Sass 預設輸出的 CSS 樣式相當好，且反應了文檔結構。不過 Sass 也提供了多種的輸出樣式。Sass 提供了四種不同的輸出樣式，設定`:style`選項或是使用`--style`指令。

###`:nested`
巢狀樣式是 Sass 的預設樣式，因為反映了 CSS 樣式和 HTML 結構。每個屬性都在新的一行，並且會如同結構般的縮排。

	#main {
	  color: #fff;
	  background-color: #000; }
	  #main p {
	    width: 10em; }
	
	.huge {
	  font-size: 10em;
	  font-weight: bold;
	  text-decoration: underline; }
	  
巢狀樣式非常適合閱讀龐大的 CSS 檔案，可以很容易地知道檔案結構

###`:expanded`
相比下擴大樣式則是一種典型的 CSS 樣式。每個條件都不會有結構般的縮排。

	#main {
	  color: #fff;
	  background-color: #000;
	}
	#main p {
	  width: 10em;
	}
	
	.huge {
	  font-size: 10em;
	  font-weight: bold;
	  text-decoration: underline;
	}

###`:compact`
緊湊樣式相比巢狀樣式和擴大樣式，使用了更少的空間。也更注重於選擇器而非屬性。每個 CSS 條件只列在一行內，所有的屬性都宣告在同一行。巢狀條件會緊貼在下一行，不同族群的條件中間則會隔一新行。

	#main { color: #fff; background-color: #000; }
	#main p { width: 10em; }
	
	.huge { font-size: 10em; font-weight: bold; text-decoration: underline; }

###`:compressed`
壓縮樣式則會盡可能最小化空間，不會有無意義空白和空行。此樣式不適合閱讀

`#main{color:#fff;background-color:#000}#main p{width:10em}.huge{font-size:10em;font-weight:bold;text-decoration:underline}`
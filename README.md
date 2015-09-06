# Sass-Compass-Note
This are notes about Sass and Compass which are writed by Rukeith  
Reference Sass and Compass official website, "Sass and Compass in action" by Wynn Netherland and "Sass and Compass for Designers" by Ben Frain  

##Chapter 1
1. Basic Syntax
	* Variables：`$`
		* `!global`
		* `!default`
	* Comments：`/* */` and `//`
	* Interpolation：`#{}`

2. Nesting
	* Referencing Parent Selectors：`&`
	* Nested Properties

3. Operations
	* Number Operations
		* Division`/` 
	* Color Operations
	* String Operations
	* Boolean Operations

##Chapter 2 - Advanced Usage
1. @-Rules and Directives
	* `@import`
		* 	Partials
		*  Nested `@import`
	* `@media`
	* `@at-root`
		* 	without and with
	* `@debug`
	* `@warn`
	* `@error`

2. Control Directives & Expressions
	* `if()`
	* `@if`
	* `@for`
	* `@each`
		* Multiple Assignment
	* `@while`

3. Extend / Inheritance
	* Extending Complex Selectors
	* Multiple Extends
	* Chaining Extends
	* Selector Sequences
		* Merging Selector Sequences
	* `@extend`-only Selectors
	* `!optional` tag
	* `@extend` in Directives

4. Mixin
	* `@mixin`
	* `@include`
	* Arguments
		* Keyword Arguments
		* Variable Arguments
	* Passing Content Block to a Mixin
		* Variable Scope and Content Blocks

5. Function Directives

6. Output Style
	* `:nested`
	* `:expanded`
	* `:compact`
	* `:compressed`

7. Extending Sass
	* Defining Custom Sass Functions
	* Cache Stores
	* Custom Importers

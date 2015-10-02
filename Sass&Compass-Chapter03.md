#Sass & Compass - Compass
## What is Compass ?
Compass 的官方網站是 `http://compass-style.org.`。官方上的介紹是：  
　　*Compass is an open-source CSS Authoring Framework.*  


Compass 是第一個以 Sass 為基底的 framework。Compass 可以用一行程式碼就能執行許多 CSS3 的複雜效果。也能很輕鬆地處理多瀏覽器的問題。在 Mac 上可以只接執行 `sudo gem install compass`，就能安裝 Compass。

安裝完 Compass 之後，可以使用 Compass 產生一份 project  
   `compass create create-project`

產生　project 之後，會生成四個東西 .sass-cache, sass, stylesheets, config.rb  

* .sass-cache：這個資料夾存放 Sass 在建立 CSS 時所需要的快取檔案。並不需要對此資料夾做任何操作。* sass：在此儲存所編寫的 Sass 檔案，此資料夾可以是任何名字，sass 是預設。
* stylesheets：Sass 所編譯出來的 CSS 檔案將會存放在這，此資料夾可以是任何名字，stylesheets 是預設。* config.rb：此檔案為 project 的設定檔，設定各檔案位置和名字，並且可以設定 CSS 的生成模式。
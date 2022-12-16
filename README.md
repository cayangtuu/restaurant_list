# 餐廳清單(restaurant_list)
一個簡易的餐廳網站，供使用者新增、瀏覽、編輯、刪除餐廳資訊，也可以透過餐廳名稱及餐廳類別進行搜尋。

### 網頁外觀
![image](https://github.com/cayangtuu/restaurant_list/blob/main/public/photo/%E9%A4%90%E5%BB%B3%E5%B0%81%E9%9D%A2V2.PNG)

### 功能描述 (features)
- 能瀏覽所有的餐廳，包含餐廳名稱、餐廳類別、評價星等
- 點擊個別餐廳時，可以查看餐廳詳細訊息，包含餐廳地址、電話與介紹等
- 可以依照餐廳名稱與餐廳類別進行搜尋
- 可新增一間餐廳
- 可編輯一間餐廳資訊
- 可刪除一間餐廳

### 安裝與執行步驟 (installation and execution)
1. 打開終端機(Terminal)，將專案clone至本機位置
```
git clone https://github.com/cayangtuu/restaurant_list.git
```
2. 進入專案資料夾
```
cd restaurant_list
```
3. 安裝專案所需npm套件
```
npm install
```
4. 將種子資料匯入mongodb中
```
npm run seed
```
終端機顯示```mongodb connected!```及```Restaurant data insert done!```即代表成功匯入種子資料  
按下Ctrl+C退回終端機輸入指令狀態

5. 完成後，即可開始執行程式
```
npm run dev
```
終端機出現```Express is working on http://localhost:3000```字樣即代表伺服器正常啟動

6. 開啟任一瀏覽器並於網址中輸入下列網址，即可連至網頁
```
http://localhost:3000
```

### 環境建置與需求(prerequisites)
##### Code編輯器
- Visual Studio Code
##### Node環境及套件
- Node.js-16.18.0
- Express-4.16.4
- Express-Handlebars-3.0.0
- mongoose-5.9.7
- nodemon-2.0.20
- dotenv-16.0.3
##### 資料庫
- MongoDB

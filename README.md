# nodejs-image-upload  
서버컴퓨터 자체에 이미지를 업로드하여 저장하는 서버 레포입니다.  

<br>

## Getting started  
1. git repository를 클론한다.  
    ```bash
    git clone https://github.com/MiaLee-luvcat/nodejs-image-upload.git
    ```

2. clone한 폴더로 이동한다.  
    ```bash
    cd nodejs-image-upload
    ```

3. 필요한 dependencies 설치  
    ```bash
    npm install
    ```

4. 서버 실행  
    ```js
    npm start

    // Server is on port 8085. >> http://localhost:8085 로 실행
    ```

<br>

## API
### GET / : 서버 확인
* url - `http://localhost:8085`  
* 서버 실행 확인용  

    **Responses**  
    > **200** : OK
    ```bash
    hello get 응답
    ```
<br>

### POST /upload : 단일 파일 업로드
* url - `http://localhost:8085/upload`  
* 파일 하나를 업로드 할 때  

    **Paramenters**  
    Body  
    |Key|Type|Parameter description|  
    |---|---|---|  
    |file|File|단일 파일을 담습니다. 업로드 위치 : uploads|  
    <br>
    
    **Responses**  

    > **200** : OK  
    담겨진 파일이 없을 때
    ```json
    {
        "status": false,
        "message": "파일 업로드 실패"
    }
    ```
    <br>

    > **200** : OK  
    파일이 무사히 담겨졌을 때
    ```json
    {
        "status": true,
        "message": "파일이 업로드 되었습니다.",
        "data": {
            "name": "파일명.확장자",
            "size": 1234  //Number
        }
    }
    ```  
    <br>

    > **500** : Internet Server Error  
    여러 개의 파일을 담거나 서버에 문제가 있을 때  
    ```json
    {
        "message": "Server Error"
    }
    ```  
<br>

### POST /upload-multi : 복수 파일 업로드
* url - `http://localhost:8085/upload-multi`  
* 파일 여러 개를 업로드 할 때  

    **Paramenters**  
    Body  
    |Key|Type|Parameter description|  
    |---|---|---|  
    |files|File|복수 파일을 담습니다. 업로드 위치 : uploads|  
    <br>
    
    **Responses**  

    > **200** : OK  
    담겨진 파일이 없을 때
    ```json
    {
        "status": false,
        "message": "파일 업로드 실패"
    }
    ```
    <br>  

    > **200** : OK  
    Key를 잘못 입력했을 때
    ```json
    {
        "status": false,
        "message": "파일을 업로드 하지 못했습니다. Body의 Key를 확인해 주세요."
    }
    ```
    <br>  

    > **200** : OK  
    복수 파일이 무사히 담겨졌을 때
    ```json
    {
        "status": true,
        "message": "파일들이 업로드 되었습니다.",
        "data": [
            {
                "name": "파일명.확장자",
                "size": 1234  //Number
            },
            {
                "name": "파일명2.확장자2",
                "size": 5678  //Number
            }
        ]
    }
    ```  
    <br>

    > **500** : Internet Server Error  
    단일의 파일을 담거나 서버에 문제가 있을 때  
    ```json
    {
        "message": "Server Error"
    }
    ```  
<br>  

## etc. - url로 업로드된 파일에 접근하고 싶을 때
> GET / `http://localhost:8085/파일명.확장자`
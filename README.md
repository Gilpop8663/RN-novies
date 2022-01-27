# 배포 주소
<a href="https://expo.dev/@gilpop/rn-fish-movies">배포 주소</a>

# 프로젝트 구조 설명

src  
 ┣ assets  
 ┃ ┗ fish.png  
 ┣ components  
 ┃ ┣ HList.tsx  
 ┃ ┣ HMedia.tsx  
 ┃ ┣ Loader.tsx  
 ┃ ┣ Poster.tsx  
 ┃ ┣ Slider.tsx  
 ┃ ┣ VMedia.tsx  
 ┃ ┗ Vote.tsx  
 ┣ navigation  
 ┃ ┣ Root.tsx  
 ┃ ┣ Stack.tsx  
 ┃ ┗ Tabs.tsx  
 ┣ screens  
 ┃ ┣ .Movies.tsx.swp  
 ┃ ┣ Detail.tsx  
 ┃ ┣ Movies.tsx  
 ┃ ┣ Search.tsx  
 ┃ ┗ Tv.tsx  
 ┣ utils  
 ┃ ┗ util.ts  
 ┗ api.ts  

# 프로젝트 시작방법

 ```
npm install
 ```

 ```
 npm start
 ```
 
# 배포된 어플 구경방법

+ expo 어플을 설치한 뒤 QR 코드를 스캔합니다.  

![image](https://user-images.githubusercontent.com/80146176/151279348-701d5800-3e83-4e9b-8d02-91034b579520.png)


# 과제 구현 목록

## 기능

### 스와이퍼(Swiper)

+ react-native-swiper 라이브러리를 활용한 배너 슬라이드입니다.
  
<div align="center"}>
<img width="50%" src="https://user-images.githubusercontent.com/80146176/151281915-6ecd7ccf-144d-4bbc-9ed8-9aa11682fc3f.gif"/>
</div>


### 무한 스크롤 (Infinite Scrolling)

+ useQuery 라이브러리의 useInfiniteQuery 를 사용하여 만들었습니다.
    
<div align="center"}>
<img width="30%" src="https://user-images.githubusercontent.com/80146176/151283102-30a478eb-49a3-4c29-bac5-f16b70489614.gif"/>
  </div>
  
---
  
  <div align="center"}>
  <img width="30%" src="https://user-images.githubusercontent.com/80146176/151283153-2198706e-83ca-4c5c-b129-7ccb0cf2d32d.gif"/>
</div>

### 검색 기능

+ useQuery를 사용해 Search API 를 불러와 검색을 진행하였고 사용자가 검색한 query를 useQuery의 배열값으로 받아서 사용했습니다
```javascript
EX) const {data} = useQuery<MovieResponse>(["searchMoviess", query], movieApi.search, {enabled: false,});
```

<div align="center"}>
  <img width="30%" src="https://user-images.githubusercontent.com/80146176/151285843-1bc56a26-eb5a-4047-af34-361c624c29ba.gif"/>
</div>

### 디테일 스크린 구현(Detail Screen)

+ react-navigation 라이브러리를 이용해 Tab과 Stack 기능을 구현하였고 그 중에 Stack을 이용해 data를 detail페이지의 params로 보내서 params.id를 통해 detail API를 불러올 수 있었습니다
    
+ react-native 의 Share,Platform 기능과 expo-web-browser 라이브러리를 이용해 영화 정보를 공유할 수 있도록 하였습니다. Platform 으로 안드로이드와 ios를 구분하여 전달하는 데이터를 달리 하였고 expo-web-browser 을 사용하여 유튜브 링크를 열고 닫았을 때 다시 어플로 돌아오도록 하였습니다.
    

<div align="center"}>
  <img width="30%" src="https://user-images.githubusercontent.com/80146176/151287911-1c593110-3603-44ca-ba11-f098b2b8024b.gif"/>
  <img width="30%" src="https://user-images.githubusercontent.com/80146176/151288731-59d6da87-3a83-4558-bd83-0b3246ab5743.png"/>
</div>

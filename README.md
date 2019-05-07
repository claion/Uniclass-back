# README

## Git
- 절대 master branch에 push하지 말 것.
- 브랜치 이름은 <본인이름/기능> 형태로 짓기 ex. `changhoi/login`
- 모이는 날 코드리뷰 후 merge함

## Design Pattern
- routes와 controller로 구분된 Model, Controll을 짤 것. (MVC 중)
- 함수 이름, 변수 이름은 camelCase로 작성하고 클래스 이름은 PascalCase로 작성할 것
- 함수는 한 번에 하나의 기능만 하는 함수로 만들 것.
- 함수 이름은 함수 기능을 잘 드러내야하고 동사 형태로 만들 것.
- 웬만하면 변수, 함수, 클래스 이름은 생략하거나 줄이지 말고 사용
- ES6+를 준수

## pull 이후

- `yarn`
- `.env` 설정
  - MONGO_URL
  - PORT
  - SECRET
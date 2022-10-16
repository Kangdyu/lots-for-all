# 모두의 추첨 - 매번 하는 추첨, 기록하고 저장해보세요!

## 룰렛, 경마와 같은 긴장감 넘치는 뽑기 게임!
* 자주 추첨을 해야 하는 친구들 목록을 저장하고 불러와서 빠르게 게임을 시작해보세요!
* 어제 한 추첨 결과가 필요한데 기억나지 않는다구요? 추첨 기록을 보세요!
* 추첨 기록 그대로 똑같은 추첨을 원클릭으로!

![image](https://user-images.githubusercontent.com/86560973/196027416-f22caa2d-63ae-4e5c-b787-70c4001bede2.png)
![image](https://user-images.githubusercontent.com/86560973/196027433-f30e2db8-3c78-4320-9314-f2bff419cb63.png)
![image](https://user-images.githubusercontent.com/86560973/196027437-9b7b058b-cf1f-494e-bda4-846744a84468.png)


## Developers

- 강대호 (Frontend)
- 장재원 (Frontend)
- 권민성 (Backend)

### Prerequistes

- Node.js 16.x LTS

### 1. Clone

```shell
$ git clone https://github.com/Kangdyu/lots-for-all.git
```

### 2-1. Installation & Start (Frontend)

```bash
$ cd /frontend
$ npm install
$ npm run dev
```

### 2-2. Installation & Start (Backend)

```bash
$ cd /backend
$ npm install
$ npm run start:dev
```

### 2-3. DB Config Settings

`backend` 폴더에 `ormconfig.json` 생성 후 아래 내용 입력

```json
// backend/ormconfig.json
{
  "development": {
    "port": 3000,
    "db": {
      "type": "mysql",
      "host": "호스트 네임",
      "port": 3306,
      "username": "유저 네임",
      "password": "비밀 번호",
      "database": "스키마",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }
  }
}
```

서버 시작 후,
[`http://localhost:3000`](http://localhost:3000) 에 접속

### Documentation

---

### 개발 언어

- Node.js

### Backend

- [`nest`](https://nestjs.com/)
- [`typeorm`](https://typeorm.io/#/)
- [`MySQL`](https://www.mysql.com/)

### FrontEnd

- [`Next.js`](https://nextjs.org/)

Copyright ⓒ 2021 성균관대학교 시스템컨설턴트그룹 All Right Reserved

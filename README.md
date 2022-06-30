# 모두의 추첨

2022년도 여름방학 해커톤 1팀 레포지토리

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
$ npm start
```

### 2-2. Installation & Start (Backend)

```bash
$ cd /backend
$ npm install
$ npm start
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

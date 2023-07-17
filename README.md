# 팀 산삼 프로젝트

## 개발 안내

0. node server.js 로 프로젝트를 실행하여 주세요.  
   node app.js 은 이 프로젝트에서 작동하지 않습니다.

1. soft delete  
   users, posts, comments 의 스키마에 delete가 있습니다.  
   soft delete 이용을 위해 만들어 두었습니다.  
   defualt 값은 0이며 이것은 삭제하지 않았음, 즉 조회 가능을 의미합니다.  
   delete 를 1로 바꾸게 되면 삭제한 데이터로 간주하여 조회가 어렵게 부탁드립니다.

2. message 통일
   controller에서 json 메시지의 key는 message로 공통 설정해 주세요.
   errorMessage등으로 설정하면 프론트에서 받아오기 어렵습니다.

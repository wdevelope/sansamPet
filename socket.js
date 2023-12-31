const socketIo = require('socket.io');
const http = require('./app.js');

const io = socketIo(http);
const socketIdMap = {};
let admin = '';

io.on('connection', sock => {
  const { watchLogin, watchByeBye, watchNotice, watchADMIN } = initSocket(sock);
  watchADMIN();
  watchLogin();
  watchNotice();
  watchByeBye();
});

function initSocket(sock) {
  socketIdMap[sock.id] = null;
  console.log(sock.id, '새로운 소켓이 연결됐어요!');

  // 특정 이벤트가 전달되었는지 감지할 때 사용될 함수
  function watchEvent(event, func) {
    sock.on(event, func);
  }

  // 연결된 모든 클라이언트에 데이터를 전달하는 함수
  function notifyEveryone(event, data) {
    sock.broadcast.emit(event, data);
  }

  // 특정한 클라이언트에 데이터를 전달하는 함수
  function notifyTo(socketId, event, data) {
    io.to(socketId).emit(event, data);
  }

  return {
    watchNotice: () => {
      watchEvent('NOTICE', data => {
        const payload = {
          notice: data.notice,
          date: new Date().toISOString(),
        };
        console.log('전체 공지 발송', payload.notice, payload.date);
        notifyEveryone('NOTICE_EVERYONE', payload);
      });
    },

    watchADMIN: () => {
      watchEvent('ADMINLOGIN', data => {
        admin = sock.id;
      });
    },
    watchLogin: () => {
      watchEvent('LOGIN', data => {
        const payload = {
          nickname: data.nickname,
          date: new Date().toISOString(),
        };
        console.log('로그인 기록', payload.nickname, payload.date);
        notifyTo(admin, 'LOGIN_DATA', payload);
      });
    },

    watchByeBye: () => {
      watchEvent('disconnect', () => {
        delete socketIdMap[sock.id];
        console.log(sock.id, '연결이 끊어졌어요!');
      });
    },
  };
}

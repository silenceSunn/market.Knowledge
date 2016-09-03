var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var Server = require('mongodb').Server;

server.listen(80);
console.log('Server is running on port 80');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var MongoStore = require('connect-mongo')(session);


//===========================
var dataBaseFind = require('./modules/dataBase/dataBaseFind');
var likeTasksInsert = require('./modules/dataBase/likeTasksInsert');
var likeTasksOut = require('./modules/dataBase/likeTasksOut');
var likeTasksAndUserOut = require('./modules/dataBase/likeTasksAndUserOut');
var likeTasksAndUserInsert = require('./modules/dataBase/likeTasksAndUserInsert');
var taskGetModelRead = require('./modules/dataBase/taskGetModelRead');
var dataBaseFindById = require('./modules/dataBase/dataBaseFindById');
var taskInsert = require('./modules/dataBase/taskInsert');
var taskRemove = require('./modules/dataBase/taskRemove');
var dataTaskParser = require('./modules/dataBase/dataTaskParser');
var taskGetReadByUser = require('./modules/dataBase/taskGetReadByUser.js');
var createInvites = require('./modules/dataBase/createInvites.js');
var inviteDBOut = require('./modules/dataBase/inviteDBOut.js');
var inviteParser = require('./modules/dataBase/inviteParser.js');
var loadAdministrator = require('./modules/access/loadAdministrator.js');
var statusFilter = require('./modules/access/statusFilter.js');
var nameFind = require('./modules/dataBase/nameFind.js');
var completeTasksInsert = require('./modules/dataBase/completeTasksInsert.js');
var completeTasksOut = require('./modules/dataBase/completeTasksOut.js');
var completeFilter = require('./modules/dataBase/completeFilter.js');
var completeTaskOutByUser = require('./modules/dataBase/completeTaskOutByUser.js');


var statuses = ['administrator', 'employee', 'customer'];
io.sockets.setMaxListeners(0);


var sessionMiddleware = (session({
	secret: 'secret',
	key: 'sid',
	httpOnly: true,
	maxAge: null,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({url: 'mongodb://localhost/test'}),
}));


io.use(function (socket, next) {
	sessionMiddleware(socket.request, socket.request.res, next)
});

app.use(sessionMiddleware);

app.use(function (req, res, next) {
	if (req.session.status == undefined) {
		req.session.status = 'guest'
	}
	next()
});


function loadAuthUser(req, res, next) {

	if ((req.session.status == statuses[0]) || (req.session.status == statuses[1]) || (req.session.status == statuses[2])) {
		next();
	} else {
		res.redirect('/auth')
	}
}
function likeOut() {

	io.sockets.on('connection', function (socket) {
		likeTasksOut(socket.request.session.user, function (data) {
			socket.emit('like', data, function () {
			});
		});
	});
}

function completeTaskCrazyTrain() {
	io.sockets.on('connection', function (socket) {
		completeTasksOut(function (data) {
			socket.emit('completeTask', data, function () {
			});
		});
	});
}

completeTaskCrazyTrain();

function socketTester() {

	io.sockets.on('connection', function (socket) {
		socket.emit('tester', 'test', function () {
		});

	});
}

function taskGetReadByUserSocket() {
	io.sockets.on('connection', function (socket) {
		taskGetReadByUser(socket.request.session.user, function (likeData) {
			if (!(likeData.length)) likeData.push(0);
			socket.emit('getTaskByUser', likeData, function () {
			});
		});
	});
}

function taskGetCounter() {
	io.sockets.on('connection', function (socket) {
		taskGetReadByUser(socket.request.session.user, function (taskData) {
			completeTaskOutByUser(socket.request.session.user, function (completeData) {
				var newTaskData = taskData;
				for (var i = 0; i < newTaskData.length - 1; i++) {
					for (var z = 0 + 1; z < newTaskData.length; z++) {
						if (newTaskData[i] == newTaskData[z]) {
							newTaskData.splice(z, 1);
						}
					}
				}
				for (var c = 0; c < completeData.length; c++) {
					for (i = 0; i < newTaskData.length; i++) {
						if (completeData[c].task_id == newTaskData[i].task_id) {
							newTaskData.splice(i, 1);
						}
					}
				}
				if (newTaskData.length) {
					socket.emit('taskGetCounter', newTaskData.length);
				}

			})
		});
	})
}

taskGetCounter();

function likeInsert() {
	io.sockets.on('connection', function (socket) {
		socket.on('clickLike', function (data) {
			data.toString();
			likeTasksInsert(socket.request.session.user, data);
		});
	});
}

function completeInsert() {
	io.sockets.on('connection', function (socket) {
		socket.on('clickedComplete', function (data) {
			data.toString();
			completeTasksInsert(socket.request.session.user, data);

		});
	});
}

function dataBaseFindbyData() {
	var accessSelector = 'administrator';
	io.sockets.on('connection', function (socket) {
		dataBaseFind(function (data) {
			if (socket.request.session.status != accessSelector) {
				data = statusFilter(socket, data);
			}
			socket.emit('data', data);
		});

	});
}

function filteredOutDataAdmin() {
	var accessSelector = 'administrator';
	io.sockets.on('connection', function (socket) {
		dataBaseFind(function (data) {
			if (socket.request.session.status == accessSelector) {
				socket.emit('filteredData', data);
			}
		});

	});
}


function filteredOutData() {
	var accessSelector = 'administrator';
	io.sockets.on('connection', function (socket) {
		if (socket.request.session.status != accessSelector) {
			completeFilter(socket, function (filteredData) {

				socket.emit('filteredData', filteredData)
			})
		}

	});
}

function likeOutAdmin() {
	io.on('connection', function (socket) {
		likeTasksAndUserOut(function (likeData) {
			socket.emit('likeAdmin', likeData, function () {

			});
		});
		nameFind(function (nameData) {
			socket.emit('names', nameData)
		})
	});
}

function likeNoAnswer() {
	io.on('connection', function (socket) {
		likeTasksAndUserOut(function (data) {
			taskGetModelRead(function (taskGetData) {
				var noAnswerData = [];
				data.forEach(function (value) {
					noAnswerData = noAnswerData.concat(value.task_id);
					for (var i = 0; i < noAnswerData.length - 1; i++) {
						for (var z = 0 + 1; z < noAnswerData.length; z++) {
							if (noAnswerData[i] == noAnswerData[z]) {
								noAnswerData.splice(z, 1);
							}
						}

					}
					for (var c = 0; c < taskGetData.length; c++) {
						for (i = 0; i < noAnswerData.length; i++) {
							if (taskGetData[c].task_id == noAnswerData[i]) {
								noAnswerData.splice(i, 1)
							}
						}
					}
				});
				if (noAnswerData.length) {
					socket.emit('likeNoAnswer', noAnswerData.length)
				}
			});
		});
	});
}

likeNoAnswer();

function tasksGetCounter() {
	io.on('connection', function (socket) {
		var tasksGet = {};
		likeTasksAndUserOut(function (data) {
			data.forEach(function (value) {
				for (var i = 0; i < value.task_id.length; i++) {
					if (tasksGet[value.task_id[i]]) {
						tasksGet[value.task_id[i]]++;
					} else {
						tasksGet[value.task_id[i]] = 1;
					}
				}

			});

			socket.emit('tasksGetCount', tasksGet);
		});
	});
}
tasksGetCounter();


function likeOutTaskGet() {

	io.on('connection', function (socket) {
		taskGetModelRead(function (likeData) {
			socket.emit('getTask', likeData, function () {
			});
		});
	});
}

function likeInsertAdmin() {
	io.sockets.on('connection', function (socket) {
		var index = 0;
		var taskVal = 0;
		socket.on('clickGetTask', function (index, taskVal) {
			index.toString();
			taskVal.toString();
			likeTasksAndUserInsert(index, taskVal);
		});
	});
}

function taskEdit() {
	io.on('connection', function (socket) {
		socket.on('clickTaskEdit', function (id, fn) {
			fn(true);
			dataBaseFindById(id, function (data) {
				socket.emit('cardEdit', data);
			});
		});
	})
}

function dataTaskInsert() {
	io.on('connection', function (socket) {
		socket.on('taskInsert', function (data, index) {
			data = dataTaskParser(data);
			taskInsert(index, data, function () {
			});
		});
	});
}

function taskDelete() {
	io.on('connection', function (socket) {
		socket.on('taskRemove', function (id) {
			taskRemove(id, function () {
			});
		})
	})
}

function sessionInfo() {
	io.sockets.on('connection', function (socket) {
		socket.emit('statusIn', socket.request.session.status);
	});
}

sessionInfo();

function sessionLogOut() {
	io.sockets.on('connection', function (socket) {
		socket.on('statusOut', function (data) {
			statusOut(socket.request.session.status);
		});
	})
}

function invitesInsert() {
	io.on('connection', function (socket) {
		socket.on('invitesAmt', function (data) {
			var inviteData = inviteParser(data)
			createInvites(inviteData);
		});
	});

}

function invitesOut() {
	io.on('connection', function (socket) {
		inviteDBOut(function (inviteData) {
			socket.emit('inviteSocket', inviteData, function () {
			});
		});
	});

}


invitesInsert();
invitesOut();
dataBaseFindbyData();
likeInsert();
likeOutTaskGet();
taskDelete();
taskEdit();
likeInsertAdmin();
dataTaskInsert();
likeOutAdmin();
likeOut();
taskGetReadByUserSocket();
completeInsert();
filteredOutData();
filteredOutDataAdmin();


var createCard = require('./routes/createCard');
app.use(createCard);

app.route('/cards')

	.get (loadAuthUser, function (req, res) {

		if (req.session.status == 'administrator') {
			res.render('cards-admin.jade');
		} else {
			res.render('cards.jade');
		}


	});

app.route('/tasksGet')
	.get (loadAdministrator, function (req, res) {


		res.render('tasksGet.jade');

	});


app.route('/invites')
	.get (loadAdministrator, function (req, res) {
		res.render('invites.jade');
	});

app.route('/logout')
	.get (loadAdministrator, function (req, res) {
		req.session.user = '0';
		req.session.status = 'guest';
		res.redirect('/auth');
	});


app.route('/likes')
	.get (loadAuthUser, function (req, res) {
		if (req.session.status == 'administrator') {
			res.render('likes-admin.jade');
		} else {
			res.render('likes.jade');
		}
	});

var auth = require('./routes/auth');
app.use(auth);

var regis = require('./routes/reg');
app.use(regis);


app.use(function (req, res) {
	res.redirect('/likes')
});


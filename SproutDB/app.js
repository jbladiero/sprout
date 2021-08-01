const express = require('express');
const server = express();
const port = 3000;

const path = require('path');
global._db = path.join(path.dirname(require.main.filename), '/db/');
console.log(global._db);


server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb'}));

const api = require('./routes/api');
server.use('/', express.static('src'));
server.use('/api',api);



server.listen(port, ()=>{
  console.log('Server Running...');
});



// APP

const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 830,
    minWidth:830,
    height: 800,
    minHeight: 800,
    titleBarStyle: 'hidden'
  })

  win.loadURL(`http://localhost:${port}`)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

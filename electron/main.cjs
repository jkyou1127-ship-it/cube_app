const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('node:path');

const isDev = !app.isPackaged;
const DEV_SERVER_URL = process.env.ELECTRON_START_URL || 'http://localhost:5173';

if (process.platform === 'win32') {
  app.setAppUserModelId('com.cubeapp.practice');
}

// only one window at a time
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}

// Electron doesn't show a native device picker for navigator.bluetooth.requestDevice()
// the way a regular browser does, so it must be resolved here. This is an APP-level
// event (not a webContents event) - without this handler, requestDevice() from the
// renderer just hangs forever and the GAN timer "connect" button silently never
// resolves. We pick the first named device that shows up (the renderer already
// filters requestDevice() by the "GAN" name prefix), and give up after a short scan
// window if nothing is found.
let pendingBluetoothCallback = null;
let pendingBluetoothTimeout = null;

app.on('select-bluetooth-device', (event, deviceList, callback) => {
  event.preventDefault();
  const match = deviceList.find((d) => d.deviceName);
  if (match) {
    if (pendingBluetoothTimeout) clearTimeout(pendingBluetoothTimeout);
    pendingBluetoothTimeout = null;
    pendingBluetoothCallback = null;
    callback(match.deviceId);
    return;
  }
  pendingBluetoothCallback = callback;
  if (!pendingBluetoothTimeout) {
    pendingBluetoothTimeout = setTimeout(() => {
      if (pendingBluetoothCallback) pendingBluetoothCallback('');
      pendingBluetoothCallback = null;
      pendingBluetoothTimeout = null;
    }, 8000);
  }
});

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 860,
    minWidth: 360,
    minHeight: 640,
    backgroundColor: '#f4f5f7',
    autoHideMenuBar: true,
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  Menu.setApplicationMenu(null);

  if (isDev) {
    mainWindow.loadURL(DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  // open external links (if any ever appear) in the OS browser instead of inside the app window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

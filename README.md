# ionic-findme-app
Demo application created with ionic in order to work with maps, geolocalization camera, shake and other plugins.

Setting up

Node is required. We need to install globally ionic framework and cordova as admin.
```
$ npm install -g cordova
$ npm install -g ionic
```

Installation
```
$ git clone https://github.com/Tabares/ionic-findme-app.git
$ cd ionic-findme-app
$ npm install
```

Run on localhost
```
$ ionic serve
```


Build for android
```
$ ionic platform add android
$ ionic build android
```

Added plugins
```
$ ionic plugin add cordova-plugin-media-capture
$ ionic plugin add cordova-plugin-camera
$ ionic plugin add https://github.com/leecrossley/cordova-plugin-shake.git
$ ionic plugin add https://github.com/alunny/ScreenDim.git
$ ionic plugin add cordova-plugin-fullscreen


```

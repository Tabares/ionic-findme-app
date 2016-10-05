cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "id": "cordova-plugin-camera.Camera",
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "cordova-plugin-camera.camera",
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "cordova-plugin-file.DirectoryEntry",
        "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "id": "cordova-plugin-file.DirectoryReader",
        "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "id": "cordova-plugin-file.Entry",
        "file": "plugins/cordova-plugin-file/www/Entry.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "id": "cordova-plugin-file.File",
        "file": "plugins/cordova-plugin-file/www/File.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "id": "cordova-plugin-file.FileEntry",
        "file": "plugins/cordova-plugin-file/www/FileEntry.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "id": "cordova-plugin-file.FileError",
        "file": "plugins/cordova-plugin-file/www/FileError.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "id": "cordova-plugin-file.FileReader",
        "file": "plugins/cordova-plugin-file/www/FileReader.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "id": "cordova-plugin-file.FileSystem",
        "file": "plugins/cordova-plugin-file/www/FileSystem.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "id": "cordova-plugin-file.FileUploadOptions",
        "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "id": "cordova-plugin-file.FileUploadResult",
        "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "id": "cordova-plugin-file.FileWriter",
        "file": "plugins/cordova-plugin-file/www/FileWriter.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "id": "cordova-plugin-file.Flags",
        "file": "plugins/cordova-plugin-file/www/Flags.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "id": "cordova-plugin-file.LocalFileSystem",
        "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "id": "cordova-plugin-file.Metadata",
        "file": "plugins/cordova-plugin-file/www/Metadata.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "id": "cordova-plugin-file.ProgressEvent",
        "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "id": "cordova-plugin-file.fileSystems",
        "file": "plugins/cordova-plugin-file/www/fileSystems.js",
        "pluginId": "cordova-plugin-file"
    },
    {
        "id": "cordova-plugin-file.requestFileSystem",
        "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "id": "cordova-plugin-file.resolveLocalFileSystemURI",
        "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "window"
        ]
    },
    {
        "id": "cordova-plugin-file.isChrome",
        "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "id": "cordova-plugin-file.androidFileSystem",
        "file": "plugins/cordova-plugin-file/www/android/FileSystem.js",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "FileSystem"
        ]
    },
    {
        "id": "cordova-plugin-file.fileSystems-roots",
        "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "id": "cordova-plugin-file.fileSystemPaths",
        "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "cordova"
        ],
        "runs": true
    },
    {
        "id": "cordova-plugin-media-capture.CaptureAudioOptions",
        "file": "plugins/cordova-plugin-media-capture/www/CaptureAudioOptions.js",
        "pluginId": "cordova-plugin-media-capture",
        "clobbers": [
            "CaptureAudioOptions"
        ]
    },
    {
        "id": "cordova-plugin-media-capture.CaptureImageOptions",
        "file": "plugins/cordova-plugin-media-capture/www/CaptureImageOptions.js",
        "pluginId": "cordova-plugin-media-capture",
        "clobbers": [
            "CaptureImageOptions"
        ]
    },
    {
        "id": "cordova-plugin-media-capture.CaptureVideoOptions",
        "file": "plugins/cordova-plugin-media-capture/www/CaptureVideoOptions.js",
        "pluginId": "cordova-plugin-media-capture",
        "clobbers": [
            "CaptureVideoOptions"
        ]
    },
    {
        "id": "cordova-plugin-media-capture.CaptureError",
        "file": "plugins/cordova-plugin-media-capture/www/CaptureError.js",
        "pluginId": "cordova-plugin-media-capture",
        "clobbers": [
            "CaptureError"
        ]
    },
    {
        "id": "cordova-plugin-media-capture.MediaFileData",
        "file": "plugins/cordova-plugin-media-capture/www/MediaFileData.js",
        "pluginId": "cordova-plugin-media-capture",
        "clobbers": [
            "MediaFileData"
        ]
    },
    {
        "id": "cordova-plugin-media-capture.MediaFile",
        "file": "plugins/cordova-plugin-media-capture/www/MediaFile.js",
        "pluginId": "cordova-plugin-media-capture",
        "clobbers": [
            "MediaFile"
        ]
    },
    {
        "id": "cordova-plugin-media-capture.helpers",
        "file": "plugins/cordova-plugin-media-capture/www/helpers.js",
        "pluginId": "cordova-plugin-media-capture",
        "runs": true
    },
    {
        "id": "cordova-plugin-media-capture.capture",
        "file": "plugins/cordova-plugin-media-capture/www/capture.js",
        "pluginId": "cordova-plugin-media-capture",
        "clobbers": [
            "navigator.device.capture"
        ]
    },
    {
        "id": "cordova-plugin-media-capture.init",
        "file": "plugins/cordova-plugin-media-capture/www/android/init.js",
        "pluginId": "cordova-plugin-media-capture",
        "runs": true
    },
    {
        "id": "cordova-plugin-device-motion.Acceleration",
        "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "id": "cordova-plugin-device-motion.accelerometer",
        "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "navigator.accelerometer"
        ]
    },
    {
        "id": "cordova-plugin-shake.Shake",
        "file": "plugins/cordova-plugin-shake/www/shake.js",
        "pluginId": "cordova-plugin-shake",
        "clobbers": [
            "shake"
        ]
    },
    {
        "id": "cordova-plugin-tts.tts",
        "file": "plugins/cordova-plugin-tts/www/tts.js",
        "pluginId": "cordova-plugin-tts",
        "clobbers": [
            "TTS"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognition",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognition.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognition"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionError",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionError.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionError"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionAlternative",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionAlternative.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionAlternative"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionResult",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionResult.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionResult"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionResultList",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionResultList.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionResultList"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionEvent",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionEvent.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionEvent"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechGrammar",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechGrammar.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechGrammar"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechGrammarList",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechGrammarList.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechGrammarList"
        ]
    },
    {
        "id": "cordova-plugin-brightness.Brightness",
        "file": "plugins/cordova-plugin-brightness/www/brightness.js",
        "pluginId": "cordova-plugin-brightness",
        "clobbers": [
            "cordova.plugins.brightness"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-console": "1.0.4",
    "cordova-plugin-device": "1.1.3",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-geolocation": "2.3.0",
    "cordova-plugin-splashscreen": "4.0.0",
    "cordova-plugin-statusbar": "2.2.0",
    "cordova-plugin-whitelist": "1.3.0",
    "ionic-plugin-keyboard": "2.2.1",
    "cordova-plugin-camera": "2.3.0",
    "cordova-plugin-file": "4.3.0",
    "cordova-plugin-media-capture": "1.4.0",
    "cordova-plugin-device-motion": "1.2.2",
    "cordova-plugin-shake": "0.5.4",
    "cordova-plugin-tts": "0.2.3",
    "org.apache.cordova.speech.speechrecognition": "0.1.1",
    "cordova-plugin-brightness": "0.1.5"
};
// BOTTOM OF METADATA
});
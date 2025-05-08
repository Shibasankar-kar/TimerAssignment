This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm react-native start

```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm react-native run-android

```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

Then, install pod: run

```sh
cd ios
pod install
```
run application :

```sh
# Using npm
npm react-native run-ios
```

now install node mocules:


```sh
# Using npm
npm install
```

## app flow and features :
- application having two tabs (home and history screens)
- home screen user can create timer
- customise timer action like (start, pause, reset)
- can perform mass operation like at a time can take action on perticular categories.

## assumptions :
- user can see timer with visual progress bar which is helpful.
- local storage is capalbe to store timer data, phone having stoage.
- timer data not required any encryption.

<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">onimagesdidload tsx version</h3>

  <p align="center">
    Notify your component when all images inside it are loaded 🏹 
    <br />
    <br />
    <a href="https://noobday.github.io/onImagesDidLoad/">View Demo</a>
    ·
    <a href="https://github.com/NoobDay/onimagesdidload-ts/issues">Report Bug</a>
    ·
    <a href="https://github.com/NoobDay/onimagesdidload-ts/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Why this Component](#why)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
  * [Props](#props)
* [Spinner while images gets loaded Demo](#demo)
* [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## Why this Component
Unfortunately  React lifecycle methods aren't enough for doing your logic after images are loaded . For example If you wanna get always the right height of images container or make an images loading spinner ... 🤔 <br />
that component will be useful for you  🎉

<!-- BUILT WITH -->
### Built With
* React
* TypeScript (TypeScript JSX)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

React.js/TypeScript project <a href="https://create-react-app.dev/docs/adding-typescript/"> Help ?</a>

### Installation
 
1.Install it using NPM 
```npm
npm i onimagesdidload-ts
```
2.Then import it in your tsx component:
```js
import OnImagesDidLoad from "onimagesdidload-ts";
```

<!-- USAGE EXAMPLES -->
## Usage

```tsx
 <OnImagesDidLoad
    onLoaded={callback} /* start your logic when images are loaded */
    doesImagesUpdated={boolean} /* boolean to inform onImagesDidLoad component that there is new images */
    classNameWhileLoading={" ... "}/* CSS Classes while loading */
    classNameOnloaded={" ... "}/* CSS Classes when images are loaded */ >
    
    /* your logic to display images , cards ... */
    <div className="myCoolImages">
       
    </div>
    
  </OnImagesDidLoad>
    
```
### Props

*   `onLoaded  [Required] : ` callback function to start your logic when images are loaded,
*  `doesImagesUpdated [Required] : ` boolean to inform OnImagesDidLoad component that there is new images ( so OnImagesDidLoad will restart his process)
*  `classNameWhileLoading [optional] : ` prefix css classes added to the container element while images are loading <br /> default `.spinning`,
*  `classNameOnloaded [optional] : `prefix css classes added to the container element when images are loading <br />default `.imagesLoaded`,

<!-- codeSandbox demo -->
## Spinner while images gets loaded Demo

<a href="https://codesandbox.io/s/images-onload-demo-lknj5?file=/src/App.tsx:2575-2615">
<strong>open codeSandbox »</strong> 
</a> 

<!-- CONTACT -->
## Contact

Taha seddik  - taha.seddik1992@gmail.com

Project Link: [https://github.com/NoobDay/onimagesdidload-ts](https://github.com/NoobDay/onimagesdidload-ts)


import React from 'react';
import './App.scss';
import * as imagesArray from './data/imagesdata';
import { IImage } from './data/IImage';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Lib
import OnImagesLoaded from "onimagesdidload-ts";

// Spinner
import ClipLoader from "react-spinners/ClipLoader";

type State = {
  imagesGallery: IImage[];
  activeTab: number;
  loadingImages: boolean;
}

type Props = {}


export default class App extends React.Component<Props, State> {

  state = {
    imagesGallery: imagesArray.natureImagesGallery,
    activeTab: 0,
    loadingImages: true
  }

  getImagesArrayAndPreventBrowserCache(imagesArray: IImage[]) {
    return imagesArray.map(img => {
      return {
        src: img.src + "?v=" + Math.floor(Math.random() * 100),
        alt: img.alt
      }
    });
  }

  handleTabChange = (e: any, newValue: number) => {
    this.setState({
      imagesGallery: (newValue === 0) ?
        this.getImagesArrayAndPreventBrowserCache(imagesArray.natureImagesGallery)
        : this.getImagesArrayAndPreventBrowserCache(imagesArray.carsImagesGallery),
      activeTab: newValue,
      loadingImages: true
    })
  }

  hangleImagesLoadFinish = () => {
    this.setState({
      loadingImages: false
    })
  }


  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Nice gallery
          </Typography>
          </Toolbar>
          <Tabs value={this.state.activeTab} onChange={this.handleTabChange} aria-label="simple tabs example">
            <Tab label="Nature gallery" />
            <Tab label="Cars gallery" />
          </Tabs>
        </AppBar>

        <main className="mainZone">

          <OnImagesLoaded
            onLoaded={this.hangleImagesLoadFinish}
            doesImagesUpdated={this.state.loadingImages === true}
            classNameWhileSpinning="spinning centerVerically"
          >

            {/* Spinner */}
            {this.state.loadingImages &&
              <div className="sweet-loading">
                <ClipLoader
                  size={150}
                  color={"#123abc"}
                  loading={this.state.loadingImages}
                />
              </div>
            }

            <div className="gallery" style={{
              padding: this.state.loadingImages ? 0 : 50
            }}>
              {
                this.state.imagesGallery.map((img, index) => (
                  <div key={index} className="gallery__img">
                    <img src={img.src} alt={img.alt} className="gallery__img"></img>
                  </div>
                ))
              }
            </div>

          </OnImagesLoaded>

        </main>

      </React.Fragment>

    )
  }

}
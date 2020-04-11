

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Spinner
import ClipLoader from "react-spinners/ClipLoader";

import './onImagesLoad.scss';

export default class OnImagesLoaded extends Component {

    // Bind functions
    preparePromiesArray = this.preparePromiesArray.bind(this);
    resolveAllPromies = this.resolveAllPromies.bind(this);

    // Variables
    imagesLoadPromisesArray = [];
    envelopRef = React.createRef();

    //state
    state = {
        loadingImages: true
    }

    componentDidMount() {
        this.preparePromiesArray();
        this.resolveAllPromies();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.loadingImages && this.props.doesImagesUpdated) {
            this.setState({
                loadingImages: true
            }, () => {
                this.preparePromiesArray();
                this.resolveAllPromies();
            })

        }
    }

    preparePromiesArray() {
        this.imgs = this.envelopRef.current.getElementsByTagName('img');
        Array.from(this.imgs).map((img, index) => {
            this.imagesLoadPromisesArray.push(
                new Promise(resolve => {
                    if (img.complete)
                        resolve(true)

                    img.onload = () => {
                        console.log("loaded")
                        resolve(true);
                    };
                    img.onerror = () => {
                        resolve(false)
                    }
                })
            )
        });

    }

    resolveAllPromies() {
        let self = this;
        Promise.all(this.imagesLoadPromisesArray)
            .then(_ => {
                self.setState({
                    loadingImages: false
                }, () => {
                    self.imagesLoadPromisesArray.length = 0;
                    self.props.onLoaded();
                })
            })
            .catch(e => {
            })

    }

    render() {
        const { classNameWhileSpinning, spinnerColor, spinnerSize } = this.props;

        if (this.state.loadingImages) {
            return (
                <div ref={this.envelopRef}
                    className={`spinningContainer ${classNameWhileSpinning}`} >
                    {/* Spinner */}
                    {
                        <div className="sweet-loading">
                            <ClipLoader
                                size={spinnerSize}
                                color={spinnerColor}
                                loading={this.state.loadingImages}
                            />
                        </div>
                    }
                    {
                        this.props.children
                    }
                </div>
            );
        } else {
            return (
                <div ref={this.envelopRef} className={`imagesDidLoadEnvelop`} >
                    {
                        this.props.children
                    }
                </div>
            );
        }

    }
}

OnImagesLoaded.propTypes = {
    onLoaded: PropTypes.func.isRequired,
    doesImagesUpdated: PropTypes.bool.isRequired,
    classNameWhileSpinning: PropTypes.string,
    spinnerColor: PropTypes.string,
    spinnerSize: PropTypes.number
}

OnImagesLoaded.defaultProps = {
    classNameWhileSpinning: "centerVerically",
    spinnerColor: "#123abc",
    spinnerSize: 150
};
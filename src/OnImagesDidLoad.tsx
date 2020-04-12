import * as React from 'react';


export default class OnImagesDidLoad extends React.Component<any, any> {

    static defaultProps = {
        classNameWhileLoading: "spinning",
        classNameOnloaded: "imagesLoaded"
    };

    // Variables
    imagesLoadPromisesArray: Promise<any>[] = [];
    imgs: HTMLCollectionOf<HTMLImageElement>;
    envelopRef: React.RefObject<HTMLDivElement> = React.createRef();

    //state
    state = {
        loadingImages: true
    }

    componentDidMount() {
        this.preparePromiesArray();
        this.resolveAllPromises();
    }

    componentDidUpdate() {
        if (!this.state.loadingImages && this.props.doesImagesUpdated) {
            this.setState({
                loadingImages: true
            }, () => {
                this.preparePromiesArray();
                this.resolveAllPromises();
            })

        }
    }

    preparePromiesArray = () => {

        const node = this.envelopRef.current;
        if (node) {
            this.imgs = node.getElementsByTagName('img');
            Array.from(this.imgs).map((img, index) => {
                this.imagesLoadPromisesArray.push(
                    new Promise(resolve => {
                        if (img.complete)
                            resolve(true)

                        img.onload = () => {
                            resolve(true);
                        };
                        img.onerror = () => {
                            resolve(false)
                        }
                    })
                )
            });
        }
    }

    resolveAllPromises = () => {
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
        const { classNameWhileLoading, classNameOnloaded } = this.props;
        const classNamePrefix = this.state.loadingImages ? classNameWhileLoading : classNameOnloaded;
        return (
            <div ref={this.envelopRef} className={`${classNamePrefix}`} >
                {this.props.children}
            </div>
        );
    }
}




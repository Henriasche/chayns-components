/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isString } from '../../utils/is';
import { isServer } from '../../utils/isServer';
import { getDataUrlFromFile } from '../utils/getDataUrl';
import './Gallery.scss';
import Image from './Image';
import ImageContainer from './ImageContainer';

/**
 * An image gallery that displays up to four images by default. Also supports
 * reordering and deletion of images and blurred image previews for images
 * loaded from `tsimg.cloud`.
 */
export default class Gallery extends Component {
    static getBigImageUrls(images) {
        return images.map((image) => {
            const img = image.url || image.file || image;
            return isString(img) ? img : getDataUrlFromFile(img);
        });
    }

    constructor(props) {
        super(props);
        this.galleryRef = React.createRef();
        this.state = {
            active: null,
            images: props.images,
            dropzone: null,
        };
    }

    componentDidUpdate(prevProps) {
        const { images } = this.props;
        if (prevProps.images !== images) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ images });
        }
    }

    onDown = (event, index, image) => {
        // deactivate refresh scroll in apps
        if (chayns.env.isApp || chayns.env.isMyChaynsApp)
            chayns.disallowRefreshScroll();

        this.index = index;
        this.image = image;
        this.pageXStart = event.changedTouches
            ? event.changedTouches[0].pageX
            : event.pageX;
        this.pageYStart = event.changedTouches
            ? event.changedTouches[0].pageY
            : event.pageY;
        this.selectedElement =
            event.target.parentElement.parentElement.parentElement;
        this.selectedElementStartPosition = this.selectedElement.getBoundingClientRect();
        this.galleryStartPosition = this.galleryRef.current.getBoundingClientRect();
        this.galleryOffsetX = this.galleryStartPosition.left;
        this.galleryOffsetY = this.galleryStartPosition.top;
        this.offsetX = this.pageXStart - this.selectedElementStartPosition.left;
        this.offsetY = this.pageYStart - this.selectedElementStartPosition.top;

        document.addEventListener('mousemove', this.onMove);
        document.addEventListener('touchmove', this.onMove, { passive: false });
        document.addEventListener('mouseup', this.onUp);
        document.addEventListener('touchend', this.onUp);
        document.addEventListener('touchcancel', this.onUp);
    };

    onMove = (event) => {
        event.preventDefault();
        const { pageX, pageY } = event.changedTouches
            ? event.changedTouches[0]
            : event;
        const { clientWidth: galleryWidth } = this.galleryRef.current;
        const {
            clientHeight: itemHeight,
            clientWidth: itemWidth,
        } = event.target.parentElement.parentElement.parentElement;

        // move item
        this.selectedElement.style.left = `${
            pageX - this.galleryOffsetX - this.offsetX
        }px`;
        this.selectedElement.style.top = `${
            pageY - this.galleryOffsetY - this.offsetY
        }px`;

        // determine new position
        const itemsPerRow = Math.round(galleryWidth / itemWidth);
        const middleX =
            pageX - this.galleryOffsetX - this.offsetX + itemWidth / 2;
        const middleY =
            pageY - this.galleryOffsetY - this.offsetY + itemHeight / 2;
        const row = Math.floor(middleY / itemHeight);
        const column = Math.floor(middleX / itemWidth);
        this.newPosition = row * itemsPerRow + column;
        const { dropzone: oldDropzone } = this.state;
        const newDropzone =
            this.newPosition + (this.newPosition > this.index ? 1 : 0);
        if (oldDropzone !== newDropzone) {
            this.setState({
                dropzone: newDropzone,
                active: this.index,
            });
        }

        // show corresponding dropzone
        let insertPosition = this.newPosition * 2; // dropzones and images are alternating
        if (this.newPosition > this.index) {
            insertPosition += 2;
        }
        const dropzone = this.galleryRef.current.children[insertPosition];
        this.lastDropzone = dropzone;
    };

    onUp = () => {
        if (chayns.env.isApp || chayns.env.isMyChaynsApp)
            chayns.allowRefreshScroll();

        document.removeEventListener('mousemove', this.onMove);
        document.removeEventListener('touchmove', this.onMove);
        document.removeEventListener('mouseup', this.onUp);
        document.removeEventListener('touchend', this.onUp);
        document.removeEventListener('touchcancel', this.onUp);

        if (this.lastDropzone) {
            // there's no lastDropzone if user hasn't moved
            const { onDragEnd, images } = this.props;
            const rect = this.lastDropzone.getBoundingClientRect();
            this.selectedElement.classList.add(
                'cc__gallery__image--transition'
            );
            this.selectedElement.style.left = `${
                rect.left - this.galleryOffsetX
            }px`;
            this.selectedElement.style.top = `${
                rect.top - this.galleryOffsetY
            }px`;
            const onTransitionEnd = () => {
                if (this.selectedElement && !this.transitionEnded) {
                    this.transitionEnded = true;
                    this.selectedElement.removeEventListener(
                        'transitionend',
                        onTransitionEnd
                    );
                    this.selectedElement.classList.remove(
                        'cc__gallery__image--transition'
                    );

                    const image = images[this.index];
                    const newArray = images.slice();
                    newArray.splice(this.index, 1);
                    newArray.splice(this.newPosition, 0, image);

                    if (onDragEnd) {
                        onDragEnd(newArray);
                    }

                    this.setState({
                        dropzone: null,
                        active: null,
                        images: newArray,
                    });
                }
            };
            this.transitionEnded = false;
            this.selectedElement.addEventListener(
                'transitionend',
                onTransitionEnd
            );
        } else {
            this.selectedElement.classList.remove('cc__gallery__image--active');
        }
        // Enable scrolling.
        document.ontouchmove = () => true;
    };

    render() {
        const {
            height,
            width,
            onDelete,
            deleteMode,
            dragMode,
            className,
            preventParams,
            stopPropagation,
            onClick,
            smallTiles
        } = this.props;
        const { style: propStyle } = this.props;
        const style = { ...propStyle };
        const defaultMode = !dragMode && !deleteMode && !smallTiles;
        const { active, dropzone: dropzoneId, images } = this.state;

        let styleHeight;
        if (defaultMode) {
            if (height) {
                styleHeight = height;
            } else {
                styleHeight = 420;
            }
            style.height = `${styleHeight}px`;
        }
        if (width) {
            style.width = width;
        }
        const numberOfImages = images.length;

        const dropzone = (key, show) => (
            <div
                key={key}
                id={key}
                className={classNames(
                    'cc__gallery__image cc__gallery__image--dropzone',
                    { 'cc__gallery__image--show_dropzone': show }
                )}
            >
                <ImageContainer>
                    <div
                        className={classNames(
                            'cc__gallery__image__dropzone chayns__background-color--101 chayns__border-color--300'
                        )}
                    />
                </ImageContainer>
            </div>
        );

        return (
            <div
                className={classNames('cc__gallery', className, {
                    'cc__gallery--default-mode': defaultMode,
                    'cc__gallery--delete-mode': deleteMode,
                    'cc__gallery--drag-mode': dragMode,
                })}
                style={style}
                ref={this.galleryRef}
                key="gallery"
            >
                {dragMode ? dropzone('dropzone', dropzoneId === 0) : null}
                {images.map((image, index) => {
                    if (index < 4 || deleteMode || dragMode) {
                        const tools = [];
                        if (dragMode && images.length > 1) {
                            // Show drag icon only if a reorder is possible
                            tools.push({
                                icon: 'ts-bars',
                                className: 'cc__gallery__image__tool--drag',
                                onDown: (event) => {
                                    event.preventDefault();
                                    this.onDown(event, index, image);
                                },
                                noScroll: true,
                            });
                        }
                        if (deleteMode) {
                            tools.push({
                                icon: 'ts-wrong',
                                onClick: () => {
                                    onDelete(image, index);
                                },
                            });
                        }

                        return [
                            <div
                                className={classNames('cc__gallery__image', {
                                    'cc__gallery__image--active':
                                        index === active,
                                })}
                                id={`image${index}`}
                                // eslint-disable-next-line react/no-array-index-key
                                key={`imageDiv${index}`}
                            >
                                <ImageContainer tools={tools}>
                                    <Image
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={`image${index}`}
                                        preventParams={preventParams}
                                        image={image.url || image.file || image}
                                        moreImages={
                                            index === 3 && defaultMode
                                                ? numberOfImages - 1 - index
                                                : 0
                                        }
                                        onClick={
                                            onClick || defaultMode
                                                ? (event) => {
                                                      if (stopPropagation)
                                                          event.stopPropagation();
                                                      if (onClick) {
                                                          onClick(
                                                              Gallery.getBigImageUrls(
                                                                  images
                                                              ),
                                                              index
                                                          );
                                                      } else if (defaultMode) {
                                                          chayns.openImage(
                                                              Gallery.getBigImageUrls(
                                                                  images
                                                              ),
                                                              index
                                                          );
                                                      }
                                                  }
                                                : null
                                        }
                                        className="cc__gallery__image--cover"
                                    />
                                </ImageContainer>
                            </div>,
                            dragMode
                                ? dropzone(
                                      `dropzone${index}`,
                                      dropzoneId === index + 1
                                  )
                                : null,
                        ];
                    }
                    return null;
                })}
            </div>
        );
    }
}

Gallery.propTypes = {
    /**
     * An array of strings or File objects that will be the image sources.
     */

    images: isServer() // eslint-disable-line react/require-default-props
        ? PropTypes.array.isRequired
        : PropTypes.arrayOf(
              PropTypes.oneOfType([
                  PropTypes.shape({
                      url: PropTypes.string.isRequired,
                  }),
                  PropTypes.shape({
                      file: PropTypes.instanceOf(File).isRequired,
                  }),
                  PropTypes.string,
                  PropTypes.instanceOf(File),
              ]).isRequired
          ).isRequired,

    /**
     * A function that is called when an Image is clicked.
     */
    onClick: PropTypes.func,

    /**
     * A function that is called when an image is deleted in deletion mode.
     */
    onDelete: PropTypes.func,

    /**
     * Wether the deletion mode is active.
     */
    deleteMode: PropTypes.bool,

    /**
     * The height of the gallery as a number of pixels or CSS string.
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * The width of the gallery as a number of pixels or CSS string.
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * A classname string that will be applied to the root container.
     */
    className: PropTypes.string,

    /**
     * A React style object that is applied to the root container.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * Wether to stop propagation of click events to parent elements.
     */
    stopPropagation: PropTypes.bool,

    /**
     * Wether drag mode is active.
     */
    dragMode: PropTypes.bool,

    /**
     * Called after the user finished reordering the array. Receives the new
     * array as its first parameter.
     */
    onDragEnd: PropTypes.func,

    /**
     * This will be forwarded to the `Image`-component. It prevents parameters
     * of the loaded image. E.g. supply `{ width: true }` to prevent the
     * `width`-parameter on the loaded image.
     */
    preventParams: PropTypes.bool,

    /**
     * This option changes the layout to the layout known from delete- and
     * drag-mode without activating this modes.
     */
    smallTiles: PropTypes.bool,
};

Gallery.defaultProps = {
    onClick: null,
    onDelete: null,
    deleteMode: false,
    height: null,
    width: null,
    className: null,
    style: {},
    stopPropagation: false,
    dragMode: false,
    onDragEnd: null,
    preventParams: false,
    smallTiles: false,
};

Gallery.displayName = 'Gallery';

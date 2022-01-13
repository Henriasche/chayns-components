import React, { Component } from 'react';

import { ContextMenu, List, ListItem } from '../../src/index';
import Button from '../../src/react-chayns-button/component/Button';
import Tooltip from '../../src/react-chayns-tooltip/component/Tooltip';
import Icon from '../../src/react-chayns-icon/component/Icon';
import Badge from '../../src/react-chayns-badge/component/Badge';

export default class ListExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open1: false,
            open2: false,
            open3: false,
        };
        this.tooltipRef = React.createRef();
    }

    render() {
        const { open1, open2, open3 } = this.state;

        const contextMenuItems = [
            {
                icon: 'ts-plus',
                onClick: () => chayns.dialog.alert('Create'),
                text: 'Create',
                name: 'Create',
            },
            {
                icon: 'ts-trash',
                onClick: () => chayns.dialog.alert('Delete'),
                text: 'Delete',
                name: 'Delete',
            },
        ];

        const onLongPress = () => {
            chayns.vibrate(50);
            chayns.dialog.select({ list: contextMenuItems });
        };

        return (
            <div>
                <List>
                    <ListItem
                        title="ListItem"
                        subtitle="Description"
                        notExpandable
                        icon="ts-chayns"
                        circle
                    />
                    <ListItem
                        title="ListItem (clickable)"
                        subtitle="Description"
                        onClick={() =>
                            chayns.dialog.alert(
                                '"ListItem (clickable)" clicked'
                            )
                        }
                        notExpandable
                    />
                    <ListItem
                        title="ListItem (with image, clickable)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/60038-22141/Images/icon-72.png"
                        onClick={() =>
                            chayns.dialog.alert(
                                '"ListItem (with image, clickable)" clicked'
                            )
                        }
                        notExpandable
                    />
                    <ListItem
                        title={<b>bold title</b>}
                        subtitle={<i>italic subtitle</i>}
                        notExpandable
                    />
                    <Tooltip
                        content={{ text: 'Tooltip' }}
                        position={Tooltip.position.TOP_CENTER}
                        ref={this.tooltipRef}
                    >
                        <ListItem
                            title="ListItem (accordion-style, with image, without indicator)"
                            subtitle="Description"
                            image="https://chayns.tobit.com/storage/59140-09519/Images/icon-72.png"
                            hideIndicator
                            noContentClass
                            onOpen={(...e) => {
                                console.log('onOpen', ...e);
                            }}
                            onClose={(...e) => {
                                console.log('onClose', ...e);
                            }}
                            headerProps={{
                                onMouseEnter: () => {
                                    this.tooltipRef.current.show();
                                },
                                onMouseLeave: () => {
                                    this.tooltipRef.current.hide();
                                },
                            }}
                        >
                            Content
                        </ListItem>
                    </Tooltip>
                    <ListItem
                        title="ListItem
                        (accordion-style, long title with break,
                        with image, without indicator)"
                        subtitle="Very,
                        very, very, very, very,
                        very, very, very, very, very, very, very, very, very, very, very, very, very, very long
                        description"
                        image="https://chayns.tobit.com/storage/59141-06162/Images/icon-72.png"
                        headMultiline
                        hideIndicator
                        noContentClass
                        onOpen={(...e) => {
                            console.log('onOpen', ...e);
                            this.setState({ open3: true });
                        }}
                        onClose={(...e) => {
                            console.log('onClose', ...e);
                            this.setState({ open3: false });
                        }}
                        headerProps={{
                            style: {
                                transition: 'max-height 300ms',
                                maxHeight: open3 ? '150px' : '40px',
                                overflow: 'hidden',
                            },
                        }}
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with image)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/59143-10608/Images/icon-72.png"
                        circle
                        onOpen={(...e) => {
                            console.log('onOpen', ...e);
                        }}
                        onClose={(...e) => {
                            console.log('onClose', ...e);
                        }}
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with Icon)"
                        subtitle="Description"
                        // image="https://chayns.tobit.com/storage/59141-06162/Images/icon-72.png"
                        icon="ts-tobit"
                        defaultOpen
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, without image or Icon)"
                        subtitle="Description"
                        style={{
                            head: {
                                backgroundColor: chayns.utils.colors.get(
                                    100,
                                    '#49516a'
                                ),
                            },
                            body: {
                                backgroundColor: chayns.utils.colors.get(
                                    70,
                                    '#5b6c7f'
                                ),
                            },
                        }}
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with Icon)"
                        subtitle="Description"
                        // image="https://chayns.tobit.com/storage/59141-06162/Images/icon-72.png"
                        icon="ts-tobit"
                        style={{
                            backgroundColor: chayns.env.site.color,
                        }}
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title={<b>bold title</b>}
                        subtitle={<i>italic subtitle</i>}
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with image, with ContextMenu)"
                        subtitle="Description"
                        open={open1}
                        onOpen={() => {
                            this.setState({ open1: true });
                        }}
                        onClose={() => {
                            this.setState({ open1: false });
                        }}
                        // image="https://chayns.tobit.com/storage/59143-10991/Images/icon-72.png"
                        icon="fa fa-rocket"
                        right={
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ContextMenu items={contextMenuItems} />
                            </div>
                        }
                    >
                        {` 
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
                                labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores 
                                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
                                labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores 
                                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                            `}
                    </ListItem>
                    <ListItem
                        onClick={() => {
                            this.setState({ open2: !open2 });
                        }}
                        open={open2}
                        title="ListItem (button controlled)"
                        subtitle="Description"
                        image="http://broken url.png"
                        right={
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ContextMenu
                                    items={[
                                        {
                                            icon: 'ts-plus',
                                            onClick: () =>
                                                chayns.dialog.alert('Create'),
                                            text: 'Create',
                                        },
                                        {
                                            icon: 'ts-trash',
                                            onClick: () =>
                                                chayns.dialog.alert('Delete'),
                                            text: 'Delete',
                                        },
                                    ]}
                                />
                            </div>
                        }
                    >
                        {` 
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
                                labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores 
                                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
                                labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores 
                                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                            `}
                    </ListItem>
                </List>
                <Button
                    onClick={() => {
                        this.setState({ open2: !open2 });
                    }}
                >
                    Open/Close
                </Button>
                <List>
                    <ListItem
                        title="Lorem ipsum dolor sit amet"
                        subtitle="Leo Benz"
                        image="https://tsimg.space/v1/images/81fb0afc-8c5b-e911-80d7-0025905a8161.jpg"
                        circle
                        right={[
                            '09:04',
                            <Icon key="icon" icon="fa fa-paperclip" />,
                        ]}
                        hoverItem={
                            chayns.env.isMobile ? null : (
                                <ContextMenu items={contextMenuItems} />
                            )
                        }
                        onLongPress={chayns.env.isMobile ? onLongPress : null}
                    />
                    <ListItem
                        title="Releasenote chayns-components"
                        subtitle="Rosie Santiago"
                        image="https://tsimg.space/v1/images/e9da66fe-8b5b-e911-80d7-0025905a8161.jpg"
                        circle
                        right={['09:02', <Badge key="badge">5</Badge>]}
                        hoverItem={
                            chayns.env.isMobile ? null : (
                                <ContextMenu items={contextMenuItems} />
                            )
                        }
                        onLongPress={chayns.env.isMobile ? onLongPress : null}
                    />
                    <ListItem
                        title="Meeting Tuesday"
                        subtitle="Fatima Chalis"
                        images={[
                            'https://tsimg.space/v1/images/dbb54058-8c5b-e911-80d7-0025905a8161.jpg',
                        ]}
                        circle
                        right={['08:41']}
                        hoverItem={
                            chayns.env.isMobile ? null : (
                                <ContextMenu items={contextMenuItems} />
                            )
                        }
                        onLongPress={chayns.env.isMobile ? onLongPress : null}
                    />
                    <ListItem
                        title="Development Team"
                        subtitle="Rosie: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore"
                        images={[
                            'https://tsimg.space/v1/images/e9da66fe-8b5b-e911-80d7-0025905a8161.jpg',
                            'https://tsimg.space/v1/images/81fb0afc-8c5b-e911-80d7-0025905a8161.jpg',
                            'https://tsimg.space/v1/images/dbb54058-8c5b-e911-80d7-0025905a8161.jpg',
                        ]}
                        circle
                        right={['08:01']}
                        hoverItem={
                            chayns.env.isMobile ? null : (
                                <ContextMenu items={contextMenuItems} />
                            )
                        }
                        onLongPress={chayns.env.isMobile ? onLongPress : null}
                    />
                    <ListItem
                        title="Design Team"
                        subtitle="Fatima: Hello! Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt"
                        images={[
                            'https://tsimg.space/v1/images/81fb0afc-8c5b-e911-80d7-0025905a8161.jpg',
                            'https://tsimg.space/v1/images/dbb54058-8c5b-e911-80d7-0025905a8161.jpg',
                        ]}
                        circle
                        right={['07:59', <Badge key="badge">2</Badge>]}
                        hoverItem={
                            chayns.env.isMobile ? null : (
                                <ContextMenu items={contextMenuItems} />
                            )
                        }
                        onLongPress={chayns.env.isMobile ? onLongPress : null}
                    />
                </List>
            </div>
        );
    }
}

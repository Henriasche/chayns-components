import React, { Component } from 'react';

import { faRocket } from '@fortawesome/free-solid-svg-icons/faRocket';
import { ContextMenu, List, ListItem } from '../../src/index';
import Button from '../../src/react-chayns-button/component/Button';

export default class ListExample extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    render() {
        const { open } = this.state;
        return (
            <div>
                <List>
                    <ListItem
                        title="ListItem"
                        subtitle="Description"
                        notExpandable
                    />
                    <ListItem
                        title="ListItem (clickable)"
                        subtitle="Description"
                        onClick={() => chayns.dialog.alert('"ListItem (clickable)" clicked')}
                        notExpandable
                    />
                    <ListItem
                        title="ListItem (with image, clickable)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/60038-22141/Images/icon-72.png"
                        onClick={() => chayns.dialog.alert('"ListItem (with image, clickable)" clicked')}
                        notExpandable
                    />
                    <ListItem
                        title="ListItem (accordion-style, with image, without indicator)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/59140-09519/Images/icon-72.png"
                        hideIndicator
                        noContentClass
                    >
                        {'Content'}
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with image)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/59143-10608/Images/icon-72.png"
                    >
                        {'Content'}
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with Icon)"
                        subtitle="Description"
                        // image="https://chayns.tobit.com/storage/59141-06162/Images/icon-72.png"
                        icon="ts-tobit"
                    >
                        {'Content'}
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, without image or Icon)"
                        subtitle="Description"
                        style={{
                            head: {
                                backgroundColor: chayns.utils.colors.get(100, '#49516a'),
                            },
                            body: {
                                backgroundColor: chayns.utils.colors.get(70, '#5b6c7f'),
                            },
                        }}
                    >
                        {'Content'}
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
                        {'Content'}
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with image, with ContextMenu)"
                        subtitle="Description"
                        // image="https://chayns.tobit.com/storage/59143-10991/Images/icon-72.png"
                        icon={faRocket}
                        right={(
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                <ContextMenu
                                    items={[{
                                        icon: 'ts-plus',
                                        onClick: () => chayns.dialog.alert('Create'),
                                        text: 'Create',
                                    }, {
                                        icon: 'ts-trash',
                                        onClick: () => chayns.dialog.alert('Delete'),
                                        text: 'Delete',
                                    }]}
                                />
                            </div>
                        )}
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
                        onClick={() => { this.setState({ open: !open }); }}
                        open={open}
                        title="ListItem (button controlled)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/70231-10288/Images/icon-72.png"
                        right={(
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                <ContextMenu
                                    items={[{
                                        icon: 'ts-plus',
                                        onClick: () => chayns.dialog.alert('Create'),
                                        text: 'Create',
                                    }, {
                                        icon: 'ts-trash',
                                        onClick: () => chayns.dialog.alert('Delete'),
                                        text: 'Delete',
                                    }]}
                                />
                            </div>
                        )}
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
                        this.setState({ open: !open });
                    }}
                >


                    Open/Close
                </Button>
            </div>
        );
    }
}

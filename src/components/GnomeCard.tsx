import React, { FunctionComponent, useState } from "react"
import { Button, Card } from "semantic-ui-react"
import { Gnome } from "../models/Gnome";
import Tooltip from 'react-tooltip-lite';

import Tags from "./Tags";
interface Props {
    gnome: Gnome
    setGnomeFriendsView: (gnomeName: string) => void
    // onChangeMode: (mode: HierachyTypes) => void
};


const GnomeCard: FunctionComponent<Props> = (props: Props) => {

    var math = require('lodash/math');

    const [showFriends, setShowFriends] = useState(false)


    const { name, age, hair_color, professions, height, weight, thumbnail, friends } = props.gnome

    const renderSingleItem = (label: String, content: any, alignRight?: boolean) => {

        const getAlignClassName = () => {
            if (alignRight) return 'text-right '
            return 'text-left '
        }

        return (
            <div className='d-flex flex-column mb-2'>
                <div className={getAlignClassName() + 'font-weight-bold text-left'} style={{ fontSize: '12px' }}>
                    {label}
                </div>
                <div className={getAlignClassName()} style={{ fontSize: '12px' }}>
                    {content}
                </div>
            </div>
        )
    }

    return (
        <Card raised style={{ minHeight: 'fit-content', maxWidth: '300px', margin: '6px', borderRadius: '21px' }}
        // onClick={() => history.push(`/article?label=${props.type}&id=${props.id}`)}
        >
            <Card.Content className='m-2' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Card.Header
                    style={{ fontSize: '15px', marginBottom: '4px' }}
                >
                    {name}
                </Card.Header>
                <Card.Meta className='text-left'>
                    <div className='text-center' style={{ backgroundColor: hair_color.toLowerCase(), color: 'white', borderRadius: '6px', opacity: 0.7 }}>
                        Hair color: {hair_color}
                    </div>
                </Card.Meta>
                <Card.Description style={{ height: '100%', display: "flex", flexDirection: 'column', justifyContent: "space-between" }}>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column justify-content-between'>
                            {/* {renderSingleItem(FieldTypes.TITLE, 'nameeee')} */}
                            {renderSingleItem('Age', age)}
                            {renderSingleItem('Height', math.round(height, 2))}
                            {renderSingleItem('Weight', math.round(weight, 2))}
                        </div>
                        <img src={thumbnail} style={{ width: '100px', height: 'stretch', borderRadius: '10px' }} />
                    </div>
                    <div>
                        <div className='mt-auto mb-3'>
                            <Tags tags={professions} />
                        </div>
                        {friends.length > 0 &&
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', cursor: 'pointer' }}>
                                {showFriends && friends.map((friend) => (
                                    <u
                                        onClick={() => { props.setGnomeFriendsView(''+friend) }}
                                    >
                                        {friend}
                                    </u>
                                ))}
                                {showFriends &&
                                    <Button
                                        className='mt-auto gnomle-hide-friends-button'
                                        basic
                                        size='tiny'
                                        onClick={() => { setShowFriends(false) }}
                                    >
                                        {'Hide friends'}
                                    </Button>
                                }
                                {!showFriends &&
                                    <Button
                                        className='mt-auto gnomle-show-friends-button'
                                        basic
                                        size='tiny'
                                        onClick={() => { setShowFriends(true) }}
                                    >
                                        {'Show ' + friends.length + ' friends'}
                                    </Button>
                                }
                            </div>
                        }
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default GnomeCard
import { FunctionComponent, useState } from "react"
import { Button, Card } from "semantic-ui-react"
import { Gnome } from "../models/Gnome";
import LazyLoad from 'react-lazyload';
import './GnomeCard.css'


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
        <Card raised className ='gnome-card-main'>
            <Card.Content className='m-2 d-flex flex-column justify-content-between'>
                <Card.Header className ='gnome-card-header'>
                    {name}
                </Card.Header>
                <Card.Meta className='text-left'>
                    <div className='text-center gnome-card-hair' style={{ backgroundColor: hair_color.toLowerCase()}}>
                        Hair color: {hair_color}
                    </div>
                </Card.Meta>
                <Card.Description className ='gnome-card-description'>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column justify-content-between'>
                            {/* {renderSingleItem(FieldTypes.TITLE, 'nameeee')} */}
                            {renderSingleItem('Age', age)}
                            {renderSingleItem('Height', math.round(height, 2))}
                            {renderSingleItem('Weight', math.round(weight, 2))}
                        </div>
                        <LazyLoad once height={300}>
                            <img src={thumbnail} alt='gnome-pic' className ='gnome-card-img' />
                        </LazyLoad>
                    </div>
                    <div>
                        <div className='mt-auto mb-3'>
                            <Tags tags={professions} />
                        </div>
                        {friends.length > 0 &&
                            <div className ='gnome-card-friends'>
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
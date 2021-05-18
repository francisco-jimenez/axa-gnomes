import { useEffect, useState } from "react"
import { Loader } from 'semantic-ui-react'
import API from "../../services/API"
import { filterByName } from "../../utils"
import GnomeCard from "../../components/GnomeCard"
import Paginator from "../../components/Paginator"
import SearchModal from "../../components/SearchModal"
//@ts-ignore
import Modal, { closeStyle } from 'simple-react-modal'


export const Home = () => {


    const [loading, setLoading] = useState(false)


    const [allGnomes, setAllGnomes] = useState([])
    const [displayedGnomes, setDisplayedGnomes] = useState([])
    const [filterredGnomes, setFilterredGnomes] = useState([])

    const [gnomeFriendName, setGnomeFriendName] = useState('')

    // const [showSearchModal, setShowSearchModal] = useState(false)


    useEffect(() => {
        const doGetFeed = async () => {
            setLoading(true)
            await API.getInitialFeed()
                .then((response: any) => {
                    let gnomesList = response.data.Brastlewark
                    console.log(gnomesList)
                    setAllGnomes(gnomesList)
                    setFilterredGnomes(gnomesList)
                })
                .catch((error) => {
                    alert('error')
                    console.log(error)
                })
                .finally(() => { setLoading(false) })
        }

        doGetFeed()
    }, [])


    return (
        <div className='m-4'>
            <>

                {loading &&
                    <Loader active size='massive' inline='centered' style={{ marginTop: '50px' }} />
                }
                {!loading &&
                    <>
                        <div className='d-flex justify-content-center align-items-center px-5 mx-5'>
                            <img
                                className='logo-gnomle'
                                src={'/Gnomle.png'}
                                style={{ height: '100px' }}
                            />
                        </div>
                        <SearchModal
                            allGnomes={allGnomes}
                            setFilterredGnomes={setFilterredGnomes}
                            loading={loading}
                        />
                        {gnomeFriendName}
                        <div className='d-flex flex-wrap justify-content-center'>
                            {filterredGnomes && filterredGnomes.length === 0 &&
                                <div>
                                    No results
                                </div>
                            }
                            {filterredGnomes && filterredGnomes.length > 0 && displayedGnomes && displayedGnomes.length > 0 && displayedGnomes.map((gnome: any) => {
                                return (
                                    <GnomeCard
                                        key={gnome.id}
                                        gnome={gnome}
                                        setGnomeFriendsView={(gnome) => {
                                            setGnomeFriendName(gnome)
                                            console.log(filterByName(allGnomes, gnome)[0])
                                        }}
                                    />
                                )
                            })}
                            {filterredGnomes && filterredGnomes.length > 0 &&
                                <Paginator
                                    filterredRecords={filterredGnomes}
                                    setDisplayedRecords={setDisplayedGnomes}
                                />
                            }
                            {gnomeFriendName &&
                                <Modal
                                    // className='friend-modal'
                                    show={!!gnomeFriendName}
                                    onClose={() => setGnomeFriendName('')}
                                >
                                    <div className='friend-modal'>

                                        <GnomeCard
                                            gnome={filterByName(allGnomes, gnomeFriendName)[0]}
                                            setGnomeFriendsView={(gnome) => {
                                                setGnomeFriendName(gnome)
                                            }}
                                        />
                                    </div>
                                </Modal>
                            }

                        </div>
                    </>
                }
            </>
        </div>
    )
}

export default Home
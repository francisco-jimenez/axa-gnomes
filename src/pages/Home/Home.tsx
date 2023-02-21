import { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import API from "../../services/API";
import { filterByName } from "../../utils";
import GnomeCard from "../../components/GnomeCard";
import Paginator from "../../components/Paginator";
import SearchModal from "../../components/SearchModal";
//@ts-ignore
import Modal from "simple-react-modal";
import "./Home.css";

export const Home = () => {
  const [loading, setLoading] = useState(false);

  const [allGnomes, setAllGnomes] = useState([]);
  const [filterredGnomes, setFilterredGnomes] = useState([]);
  const [displayedGnomes, setDisplayedGnomes] = useState([]);

  const [gnomeFriendName, setGnomeFriendName] = useState("");

  useEffect(() => {
    const doGetFeed = async () => {
      setLoading(true);
      await API.getInitialFeed()
        .then((response: any) => {
          let gnomesList = response.data.Brastlewark;
          console.log(gnomesList);
          setAllGnomes(gnomesList);
          setFilterredGnomes(gnomesList);
        })
        .catch((error) => {
          alert("error");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    doGetFeed();
  }, []);

  return (
    <div className="m-4">
      <>
        {loading && (
          <Loader
            active
            size="massive"
            inline="centered"
            className="gnomes-loader"
          />
        )}
        {!loading && (
          <>
            <div className="gnomes-img-wrapper">
              <img
                className="logo-gnomle"
                src={"/Gnomle.png"}
                alt="logo"
                style={{ height: "100px" }}
              />
            </div>
            <SearchModal
              allGnomes={allGnomes}
              setFilterredGnomes={setFilterredGnomes}
              loading={loading}
            />
            <div className="gnomes-result">
              {filterredGnomes && filterredGnomes.length === 0 && (
                <div>No results</div>
              )}
              {filterredGnomes &&
                filterredGnomes.length > 0 &&
                displayedGnomes &&
                displayedGnomes.length > 0 &&
                displayedGnomes.map((gnome: any) => {
                  return (
                    <GnomeCard
                      key={gnome.id}
                      gnome={gnome}
                      setGnomeFriendsView={(gnome) => {
                        setGnomeFriendName(gnome);
                        console.log(filterByName(allGnomes, gnome)[0]);
                      }}
                    />
                  );
                })}
              {filterredGnomes && filterredGnomes.length > 0 && (
                <Paginator
                  filterredRecords={filterredGnomes}
                  setDisplayedRecords={setDisplayedGnomes}
                />
              )}
              {gnomeFriendName && (
                <Modal
                  // className='friend-modal'
                  show={!!gnomeFriendName}
                  onClose={() => setGnomeFriendName("")}
                >
                  <div className="friend-modal">
                    <GnomeCard
                      gnome={filterByName(allGnomes, gnomeFriendName)[0]}
                      setGnomeFriendsView={(gnome) => {
                        setGnomeFriendName(gnome);
                      }}
                    />
                  </div>
                </Modal>
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Home;

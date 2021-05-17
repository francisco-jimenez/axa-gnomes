import React, {useState} from 'react';


const DisplayedGnomes = React.createContext([{} as any, () => {}]);

const DisplayedGnomesProvider = (props: any) => {
  const [displayedGnomes, setDisplayedGnomes] = useState(null);
  return (
    <DisplayedGnomes.Provider value={[displayedGnomes, setDisplayedGnomes]}>
      {props.children}
    </DisplayedGnomes.Provider>
  );
}

export { DisplayedGnomes, DisplayedGnomesProvider};
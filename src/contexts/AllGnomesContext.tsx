import React, {useState} from 'react';


const AllGnomes = React.createContext([{} as any, () => {}]);

const AllGnomesProvider = (props: any) => {
  const [allGnomes, setAllGnomes] = useState(null);
  return (
    <AllGnomes.Provider value={[allGnomes, setAllGnomes]}>
      {props.children}
    </AllGnomes.Provider>
  );
}

export { AllGnomes, AllGnomesProvider};
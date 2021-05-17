import React, {useState} from 'react';


const FeedContext = React.createContext([{} as any, () => {}]);

const FeedProvider = (props: any) => {
  const [feed, setFeed] = useState(null);
  return (
    <FeedContext.Provider value={[feed, setFeed]}>
      {props.children}
    </FeedContext.Provider>
  );
}

export { FeedContext, FeedProvider };
import React, { useContext } from 'react';

import CollectionPreview from '../collection-preview/collection-preview.component';
import CollectionContext from '../../contexts/collections/collections.context';

import './collections-overview.styles.scss';

const CollectionsOverview = () =>{ 
  const collectionsForMap = useContext(CollectionContext);
  const collections = Object.keys(collectionsForMap).map(key => collectionsForMap[key])
  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
)};

export default CollectionsOverview;

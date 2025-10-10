import { Text } from '@zigurous/forge-react';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ItemFrame from './ItemFrame';
import RegionPanelSection from './RegionPanelSection';
import WikiLink from './WikiLink';
import { formatNameFromId } from '../utils/formatting';
import type { PetData } from '../types/item';
import type { Region } from '../types/region';

interface RegionPanelPetsProps {
  region: Region;
}

export default function RegionPanelPets({ region }: RegionPanelPetsProps) {
  const data = useStaticQuery<PetsQueryData>(dataQuery);
  const pets = region.pets
    .map(id => data.pets.nodes.find(pet => pet.id === id))
    .filter(pet => !!pet);
  return (
    <RegionPanelSection title="Pets">
      <ul className="items-list">
        {pets.map(pet => (
          <li className="shadow-xs" key={pet.id} id={pet.id}>
            <div className="flex align-center">
              <ItemFrame item={pet} />
              <div className="ml-md">
                <Text as="div" size="lg" type="title">
                  {pet.name ?? formatNameFromId(pet.id)}
                </Text>
                {pet.source && (
                  <Text as="span" color="muted" size="sm">
                    Source:{' '}
                    <>
                      {Array.isArray(pet.source) ? (
                        pet.source.map((source, i) => (
                          <React.Fragment key={source}>
                            <WikiLink wikiId={source} textual />
                            {i < pet.source!.length - 1 && ' & '}
                          </React.Fragment>
                        ))
                      ) : (
                        <WikiLink wikiId={pet.source} textual />
                      )}
                    </>
                  </Text>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </RegionPanelSection>
  );
}

interface PetsQueryData {
  pets: {
    nodes: PetData[];
  };
}

const dataQuery = graphql`
  query PetsQuery {
    pets: allPetsJson {
      nodes {
        id: jsonId
        icon
        name
        source
      }
    }
  }
`;

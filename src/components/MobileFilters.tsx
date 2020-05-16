import React, { useState } from 'react';
import styled from '../styling/styled';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Choice, FilterData } from '../data/filters';

const FiltersButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  font-size: 1.2em;

  span {
    color: ${props => props.theme.colors.primary};
    margin-right: 10px;
  }
`;
const MobileFiltersModal = styled.div<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: ${props => (props.active ? '0' : '-100%')};
  width: 100%;
  height: 100%;
  background: white;
  z-index: 10;
  transition: 0.2s all;
`;
const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid black;
  position: relative;
  font-size: 1.2em;

  .material-icons {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.primary};
  }
  .title {
    display: block;
    text-align: center;
    text-transform: uppercase;
  }
`;
const List = styled.ul`
  display: block;
  padding-inline-start: 0;
  width: calc(100% - 40px);
  margin: auto;

  li {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #cfcfcf;
  }
`;
const CheckIcon = styled.span<{ active: boolean }>`
  color: green;
  transition: opacity 0.2s;
  opacity: ${props => (props.active ? 1 : 0)};
  &::after {
    content: 'check';
  }
`;

const MobileFilters = (props: any) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [activeFilterIndex, setActiveFilterIndex] = useState<number | null>(
    null,
  );

  const goBack = () => {
    if (activeFilterIndex === null) setModalOpen(false);
    else setActiveFilterIndex(null);
  };

  return (
    <>
      <FiltersButton type={'button'} onClick={(e: any) => setModalOpen(true)}>
        <span className="material-icons">settings</span> Filtry
      </FiltersButton>
      <MobileFiltersModal active={isModalOpen}>
        <ModalHeader>
          <span className="material-icons" onClick={goBack}>
            chevron_left
          </span>
          <span className="title">
            {activeFilterIndex === null
              ? 'Filtry'
              : props.filters[activeFilterIndex].title}
          </span>
        </ModalHeader>
        <PerfectScrollbar>
          {activeFilterIndex === null ? (
            <List>
              {props.filters.map((filter: FilterData, i: number) => (
                <li
                  key={filter.fieldId}
                  onClick={() => setActiveFilterIndex(i)}
                >
                  {filter.title}
                  <span className="material-icons">chevron_right</span>
                </li>
              ))}
            </List>
          ) : (
            <List>
              {props.filters[activeFilterIndex].choices.map(
                (choice: Choice) => (
                  <li
                    key={choice.id}
                    onClick={(e: any) =>
                      props.onSelect(
                        props.filters[activeFilterIndex].fieldId,
                        props.filters[activeFilterIndex].multiple,
                        choice.id,
                      )
                    }
                  >
                    {choice.label}
                    <CheckIcon
                      active={props.filtersValues[
                        props.filters[activeFilterIndex].fieldId
                      ].includes(choice.id)}
                      className={'material-icons'}
                    />
                  </li>
                ),
              )}
            </List>
          )}
        </PerfectScrollbar>
      </MobileFiltersModal>
    </>
  );
};
export default MobileFilters;
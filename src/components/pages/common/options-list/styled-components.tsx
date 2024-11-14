import styled from 'styled-components'

export const OptionsListContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const OptionsListItem = styled.li`
  margin: 0 0 24px;
  padding: 16px;
  border-radius: 8px;
  list-style: none;
  font-size: 14px;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.theme && props.theme.backgroundColor)};
  min-height: 56px;
  box-shadow: 0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16);
  user-select: none;
  box-sizing: border-box;
`

export const OptionsListItemLink = styled.a`
  margin: 0 0 24px;
  padding: 16px;
  border-radius: 8px;
  list-style: none;
  font-size: 14px;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.theme && props.theme.backgroundColor)};
  min-height: 56px;
  box-shadow: 0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16);
  user-select: none;
  text-decoration: none;
  color: ${(props) => (props.theme && props.theme.primaryTextColor)};
  box-sizing: border-box;
`

export const OptionTag = styled.div`
  border-radius: 8px;
  background-color: ${(props) =>
    (props.theme && props.theme.primaryHighlightColor)};
  padding: 4px 8px;
  line-height: 1;
  font-size: 11px;
  margin-left: auto;
  color: ${(props) => (props.theme && props.theme.secondaryTextColor)};
`

export const OptionImage = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: flex-start;

  img {
    width: 18px;
    height: 18px;
    border-radius: 18px;
    object-fit: contain;
  }
`

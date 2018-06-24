// @flow

import './styles/CharacterFeed.css';

import React from 'react';

import GameEventsList from './GameEventsList';
import FeedMessageInput from './FeedMessageInput';

type GameEventType = {|
  content: string,
|};

type CharacterPropertyStateType = {|
  chatInput: string,
  gameEvents: GameEventType[],
|};
type OnInputChangeType = (SyntheticInputEvent<HTMLInputElement>) => any;

type ComponentPropsType = {|
  label?: string,
  onSubmit: (state: CharacterPropertyStateType) => any,
|};

const Messages: GameEventType[] = [
  { content: 'First message' },
  { content: 'Second message' },
  { content: 'Third message' },
];

export default class CharacterFeed extends React.PureComponent<
  ComponentPropsType,
  CharacterPropertyStateType
> {
  state = {
    chatInput: '',
    gameEvents: [...Messages],
  };

  onInputChange: OnInputChangeType = ev =>
    this.setState({ chatInput: ev.target.value });

  onSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      chatInput: '',
      gameEvents: this.state.gameEvents.concat({
        content: this.state.chatInput,
      }),
    });
  };

  render() {
    return (
      <div className="character-feed">
        <GameEventsList feedMessages={this.state.gameEvents} />
        <form onSubmit={this.onSubmit}>
          <label>{this.props.label}</label>
          <FeedMessageInput
            value={this.state.chatInput}
            onChange={this.onInputChange}
          />
        </form>
      </div>
    );
  }
}
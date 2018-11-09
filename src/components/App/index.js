import React, {Component} from 'react';
import './App.css';

const API_KEY = "a3de201458a24af9f239635a6e1ce86b"; // здесь должен быть ВАШ ключ!
const TEMP_DIFF = 273;

async function getTemperature(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  return await fetch(url)
      .then(value => value.json())
      .then(({main: {temp}}) => Math.round(temp - TEMP_DIFF));
}

export default class App extends Component {

  static defaultProps = {
    city: 'Moscow,ru',
  };

  constructor(props) {
    super(props);
    const {city} = props;
    this.state = {temp: undefined, city};
    getTemperature(city)
        .then(temp => this.setState({temp}));
  }

  render() {
    const {state: {temp, city}} = this;
    return <div className="App">
      Температура в городе {city}: {temp}
    </div>;
  }
}
